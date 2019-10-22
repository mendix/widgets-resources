import {
    ComponentClass,
    createElement,
    Fragment,
    ReactElement,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";
import {
    FlatList,
    I18nManager,
    LayoutChangeEvent,
    NativeSyntheticEvent,
    Platform,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
    ViewStyle
} from "react-native";
import DeviceInfo from "react-native-device-info";
import { IntroScreenStyle } from "./ui/Styles";
import { Icon } from "mendix/components/native/Icon";
import { SlidesType } from "../typings/IntroScreenProps";
import { EditableValue, ValueStatus } from "mendix";
import { Big } from "big.js";

interface SwipeableContainerProps {
    skipLabel?: string;
    doneLabel?: string;
    nextLabel?: string;
    previousLabel?: string;
    showDoneButton: boolean;
    showSkipButton: boolean;
    showNextButton: boolean;
    showPreviousButton: boolean;
    onSlideChange: (next: number, previous: number) => void;
    bottomButton: boolean;
    numberOfButtons: number;
    renderDoneButton?: () => ReactNode;
    renderSkipButton?: () => ReactNode;
    renderPreviousButton?: () => ReactNode;
    renderNextButton?: () => ReactNode;
    onDone: () => void;
    onSkip: () => void;
    slides: SlidesType[];
    hidePagination: boolean;
    styles: IntroScreenStyle;
    activeSlide?: EditableValue<BigJs.Big>;
}

declare type Option<T> = T | undefined;

const isIphoneWithNotch = Platform.OS === "ios" && DeviceInfo.hasNotch();
const isAndroidRTL = I18nManager.isRTL && Platform.OS === "android";
const Touchable: ComponentClass<any> = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

const refreshActiveSlideAttribute = (slides: SlidesType[], activeSlide?: EditableValue<BigJs.Big>): number => {
    if (activeSlide && activeSlide.status === ValueStatus.Available && slides && slides.length > 0) {
        const slide = Number(activeSlide.value) - 1;
        if (slide < 0) {
            return 0;
        } else if (slide > slides.length - 1) {
            return slides.length - 1;
        }
        return slide;
    }
    return 0;
};

export const SwipeableContainer = (props: SwipeableContainerProps): ReactElement => {
    const [width, setWidth] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const flatList = useRef<FlatList<any>>(null);

    useEffect(() => {
        const slide = refreshActiveSlideAttribute(props.slides, props.activeSlide);
        if (width && props.activeSlide && props.activeSlide.status === ValueStatus.Available && slide !== activeIndex) {
            goToSlide(slide);
        }
    }, [props.activeSlide, activeIndex, width]);

    const goToSlide = useCallback(
        (pageNum: number) => {
            setActiveIndex(pageNum);
            if (flatList && flatList.current) {
                flatList.current.scrollToOffset({
                    offset: rtlSafeIndex(pageNum) * width
                });
            }
        },
        [width, flatList]
    );

    const onNextPress = (): void => {
        goToSlide(activeIndex + 1);
        onSlideChange(activeIndex + 1, activeIndex);
    };

    const onPrevPress = (): void => {
        goToSlide(activeIndex - 1);
        onSlideChange(activeIndex - 1, activeIndex);
    };

    const onPaginationPress = (index: number): void => {
        const activeIndexBeforeChange = activeIndex;
        goToSlide(index);
        onSlideChange(index, activeIndexBeforeChange);
    };

    const renderItem = ({ item }: any): ReactElement => {
        return <View style={[{ width, flex: 1, alignContent: "stretch" }]}>{item.content}</View>;
    };

    const renderDefaultButton = (label: Option<string>, bottomStyle: ViewStyle, icon: string): ReactElement => {
        const iconSource = { type: "glyph", iconClass: `glyphicon-${icon}` } as const;
        let content = label ? (
            <Text style={props.styles.buttonText}>{label}</Text>
        ) : (
            <View style={{ alignSelf: "center" }}>
                <Icon
                    icon={iconSource}
                    color={props.styles.buttonText.color ? props.styles.buttonText.color : "black"}
                />
            </View>
        );
        if (props.bottomButton) {
            content = <View style={[styles.bottomButtonDefault, bottomStyle]}>{content}</View>;
        }
        return content;
    };

    const onSlideChange = (newIndex: number, lastIndex: number): void => {
        if (props.activeSlide && !props.activeSlide.readOnly) {
            props.activeSlide.setValue(new Big(newIndex + 1));
        }
        if (props.onSlideChange) {
            props.onSlideChange(newIndex, lastIndex);
        }
    };

    const renderButton = (
        label: Option<string>,
        content: Option<() => ReactNode>,
        onPress: () => void,
        normalButtonStyle: ViewStyle,
        bottomButtonStyle: ViewStyle,
        defaultIcon: string
    ): ReactElement => {
        return (
            <View style={!props.bottomButton ? normalButtonStyle : styles.flexOne}>
                <Touchable onPress={onPress}>
                    {content ? content() : renderDefaultButton(label, bottomButtonStyle, defaultIcon)}
                </Touchable>
            </View>
        );
    };

    const renderNextButton = ({
        showNextButton,
        nextLabel,
        renderNextButton,
        styles
    }: SwipeableContainerProps): ReactNode =>
        showNextButton &&
        renderButton(nextLabel, renderNextButton, onNextPress, styles.rightButton, styles.buttonNext, "chevron-right");

    const renderPrevButton = ({
        showPreviousButton,
        previousLabel,
        renderPreviousButton,
        styles
    }: SwipeableContainerProps): ReactNode =>
        showPreviousButton &&
        renderButton(
            previousLabel,
            renderPreviousButton,
            onPrevPress,
            styles.leftButton,
            styles.buttonPrevious,
            "chevron-left"
        );

    const renderDoneButton = ({
        showDoneButton,
        doneLabel,
        renderDoneButton,
        onDone,
        styles
    }: SwipeableContainerProps): ReactNode =>
        showDoneButton &&
        renderButton(doneLabel, renderDoneButton, onDone && onDone, styles.rightButton, styles.buttonDone, "ok");

    const renderSkipButton = ({
        showSkipButton,
        skipLabel,
        renderSkipButton,
        onSkip,
        slides,
        styles
    }: SwipeableContainerProps): ReactNode =>
        showSkipButton &&
        renderButton(
            skipLabel,
            renderSkipButton,
            () => (onSkip ? onSkip() : goToSlide(slides.length - 1)),
            styles.leftButton,
            styles.buttonSkip,
            "remove"
        );

    const renderPagination = (): ReactElement => {
        const isLastSlide = activeIndex === props.slides.length - 1;
        const isFirstSlide = activeIndex === 0;

        const leftButton = (!isFirstSlide && renderPrevButton(props)) || (!isLastSlide && renderSkipButton(props));
        const rightButton = isLastSlide ? renderDoneButton(props) : renderNextButton(props);
        const paginationOverflow = props.slides.length > 5;

        return (
            <View style={[styles.paginationContainer, props.styles.paginationContainer]}>
                <View style={[styles.paginationDots, props.styles.paginationDots]}>
                    {!props.hidePagination &&
                        !paginationOverflow &&
                        props.slides.length > 1 &&
                        props.slides.map((_, i) => (
                            <TouchableOpacity
                                key={i}
                                style={[
                                    styles.dot,
                                    rtlSafeIndex(i) === activeIndex
                                        ? props.styles.activeDotStyle
                                        : props.styles.dotStyle
                                ]}
                                onPress={() => onPaginationPress(i)}
                            />
                        ))}
                    {paginationOverflow && (
                        <Text style={props.styles.paginationText}>
                            {activeIndex + 1}/{props.slides.length}
                        </Text>
                    )}
                </View>
                {!props.bottomButton && (
                    <Fragment>
                        {leftButton}
                        {rightButton}
                    </Fragment>
                )}
                {props.bottomButton && (
                    <View style={styles.bottomButtonsContainer}>
                        {props.numberOfButtons === 2 && leftButton}
                        {rightButton}
                    </View>
                )}
            </View>
        );
    };

    const rtlSafeIndex = (i: number): number => (isAndroidRTL ? props.slides.length - 1 - i : i);

    const onMomentumScrollEnd = useCallback(
        (event: NativeSyntheticEvent<any>) => {
            const offset = event.nativeEvent.contentOffset.x;
            const newIndex = rtlSafeIndex(Math.round(offset / width));
            if (newIndex === activeIndex) {
                return;
            }
            const lastIndex = activeIndex;
            setActiveIndex(newIndex);
            onSlideChange(newIndex, lastIndex);
        },
        [activeIndex, width]
    );

    /**
     * Readjust the size of the slides if the size is different than the device dimensions
     */
    const onLayout = useCallback(
        (event: LayoutChangeEvent) => {
            const newWidth = event.nativeEvent.layout.width;
            if (newWidth !== width) {
                setWidth(newWidth);
            }
        },
        [width]
    );

    return (
        <View style={styles.flexOne}>
            <FlatList
                ref={flatList}
                data={props.slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                style={styles.flatList}
                renderItem={renderItem}
                onMomentumScrollEnd={onMomentumScrollEnd}
                extraData={width}
                onLayout={onLayout}
                keyExtractor={(_: any, index: number) => "screen_key_" + index}
            />
            {renderPagination()}
        </View>
    );
};

SwipeableContainer.defaultProps = {
    showDoneButton: true,
    showNextButton: true
};

const styles = StyleSheet.create({
    flexOne: {
        flex: 1
    },
    flatList: {
        flex: 1,
        flexDirection: isAndroidRTL ? "row-reverse" : "row"
    },
    paginationContainer: {
        position: "absolute",
        bottom: 16 + (isIphoneWithNotch ? 34 : 0),
        left: 16,
        right: 16
    },
    paginationDots: {
        height: 16,
        margin: 16,
        flexDirection: isAndroidRTL ? "row-reverse" : "row",
        justifyContent: "center",
        alignItems: "center"
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4
    },
    bottomButtonsContainer: {
        flex: 1,
        flexDirection: isAndroidRTL ? "row-reverse" : "row",
        alignItems: "stretch",
        justifyContent: "center"
    },
    bottomButtonDefault: {
        flex: 1,
        justifyContent: "center"
    }
});
