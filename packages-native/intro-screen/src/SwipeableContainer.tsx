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
    View
} from "react-native";
import { ButtonStyle, IntroScreenStyle } from "./ui/Styles";
import { Icon } from "mendix/components/native/Icon";
import { SlidesType } from "../typings/IntroScreenProps";
import { EditableValue, ValueStatus, DynamicValue, NativeIcon } from "mendix";
import { Big } from "big.js";

interface SwipeableContainerProps {
    testID?: string;
    skipLabel?: string;
    skipIcon?: DynamicValue<NativeIcon>;
    doneLabel?: string;
    doneIcon?: DynamicValue<NativeIcon>;
    nextLabel?: string;
    nextIcon?: DynamicValue<NativeIcon>;
    previousLabel?: string;
    previousIcon?: DynamicValue<NativeIcon>;
    showDoneButton: boolean;
    showSkipButton: boolean;
    showNextButton: boolean;
    showPreviousButton: boolean;
    onSlideChange: (next: number, previous: number) => void;
    bottomButton: boolean;
    numberOfButtons: number;
    onDone: () => void;
    onSkip: () => void;
    slides: SlidesType[];
    hidePagination: boolean;
    hideIndicatorLastSlide: boolean;
    styles: IntroScreenStyle;
    activeSlide?: EditableValue<BigJs.Big>;
}

declare type Option<T> = T | undefined;

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
        return <View style={[{ width, flex: 1 }]}>{item.content}</View>;
    };

    const renderButton = (
        caption: Option<string>,
        icon: Option<DynamicValue<NativeIcon>>,
        defaultIcon: string,
        style: ButtonStyle,
        onPress: () => void,
        testID: string
    ): ReactElement => {
        const iconSource = { type: "glyph", iconClass: `glyphicon-${defaultIcon}` } as const;
        let iconContent =
            !icon && !caption ? (
                <View style={{ alignSelf: "center" }}>
                    <Icon
                        icon={iconSource}
                        color={style.icon.color ? style.icon.color : "black"}
                        size={style.icon.size ? style.icon.size : undefined}
                    />
                </View>
            ) : null;
        if (icon && icon.status === ValueStatus.Available && icon.value) {
            iconContent = (
                <View style={{ alignSelf: "center" }}>
                    <Icon
                        icon={icon!.value}
                        color={style.icon.color ? style.icon.color : "black"}
                        size={style.icon.size ? style.icon.size : undefined}
                    />
                </View>
            );
        }
        const Container = props.bottomButton ? View : Fragment;
        const containerProps = props.bottomButton
            ? {
                  style: styles.flexOne
              }
            : {};
        return (
            <Container {...containerProps}>
                <Touchable onPress={onPress} testID={`${props.testID}$${testID}`}>
                    <View style={[style.container, !props.bottomButton ? { width: width / 3 } : {}]}>
                        {iconContent}
                        {caption && <Text style={style.caption}>{caption}</Text>}
                    </View>
                </Touchable>
            </Container>
        );
    };

    const onSlideChange = (newIndex: number, lastIndex: number): void => {
        if (props.activeSlide && !props.activeSlide.readOnly) {
            props.activeSlide.setValue(new Big(newIndex + 1));
        }
        if (props.onSlideChange) {
            props.onSlideChange(newIndex, lastIndex);
        }
    };

    const renderNextButton = ({ showNextButton, nextLabel, nextIcon, styles }: SwipeableContainerProps): ReactNode =>
        showNextButton &&
        renderButton(
            nextLabel,
            nextIcon,
            "chevron-right",
            props.bottomButton ? styles.paginationAbove.buttonNext : styles.paginationBetween.buttonNext,
            onNextPress,
            "buttonNext"
        );

    const renderPrevButton = ({
        showPreviousButton,
        previousLabel,
        previousIcon,
        styles
    }: SwipeableContainerProps): ReactNode =>
        showPreviousButton &&
        renderButton(
            previousLabel,
            previousIcon,
            "chevron-left",
            props.bottomButton ? styles.paginationAbove.buttonPrevious : styles.paginationBetween.buttonPrevious,
            onPrevPress,
            "buttonPrevious"
        );

    const renderDoneButton = ({
        showDoneButton,
        doneLabel,
        doneIcon,
        onDone,
        styles
    }: SwipeableContainerProps): ReactNode =>
        showDoneButton &&
        renderButton(
            doneLabel,
            doneIcon,
            "ok",
            props.bottomButton ? styles.paginationAbove.buttonDone : styles.paginationBetween.buttonDone,
            onDone,
            "buttonDone"
        );

    const renderSkipButton = ({
        showSkipButton,
        skipLabel,
        skipIcon,
        onSkip,
        slides,
        styles
    }: SwipeableContainerProps): ReactNode =>
        showSkipButton &&
        renderButton(
            skipLabel,
            skipIcon,
            "remove",
            props.bottomButton ? styles.paginationAbove.buttonSkip : styles.paginationBetween.buttonSkip,
            () => (onSkip ? onSkip() : goToSlide(slides.length - 1)),
            "buttonSkip"
        );

    const renderPagination = (): ReactElement => {
        const isLastSlide = activeIndex === props.slides.length - 1;
        const isFirstSlide = activeIndex === 0;

        const leftButton = (!isFirstSlide && renderPrevButton(props)) || (!isLastSlide && renderSkipButton(props));
        const rightButton = isLastSlide ? renderDoneButton(props) : renderNextButton(props);
        const paginationOverflow = props.slides.length > 5;
        const hidePagination = props.hidePagination || (isLastSlide && props.hideIndicatorLastSlide);

        return (
            <View style={[props.styles.paginationContainer, !props.bottomButton ? { flexDirection: "row" } : {}]}>
                {!props.bottomButton && leftButton}
                <View style={[styles.paginationDots, props.bottomButton ? { width: "100%" } : { width: width / 3 }]}>
                    {!hidePagination &&
                        !paginationOverflow &&
                        props.slides.length > 1 &&
                        props.slides.map((_, i) => (
                            <TouchableOpacity
                                testID={`${props.testID}$dot${i}`}
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
                    {!hidePagination && paginationOverflow && (
                        <Text style={props.styles.paginationText} testID={`${props.testID}$paginationText`}>
                            {activeIndex + 1}/{props.slides.length}
                        </Text>
                    )}
                </View>
                {!props.bottomButton && rightButton}
                {props.bottomButton && (
                    <View style={props.styles.paginationAbove.buttonsContainer}>
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
                testID={props.testID}
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
    paginationDots: {
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
    bottomButtonDefault: {
        flex: 1,
        justifyContent: "center"
    }
});
