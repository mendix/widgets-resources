import { useState, createElement, ReactNode, useCallback, ComponentClass, Fragment } from "react";
import {
    StyleSheet,
    FlatList,
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    Platform,
    I18nManager,
    ViewStyle,
    NativeSyntheticEvent,
    LayoutChangeEvent,
    TouchableNativeFeedback
} from "react-native";
import DeviceInfo from "react-native-device-info";
import { IntroScreensStyle } from "./ui/Styles";

const isIphoneWithNotch = Platform.OS === "ios" && DeviceInfo.hasNotch();

const isAndroidRTL = I18nManager.isRTL && Platform.OS === "android";

interface SwipeableContainerProps {
    skipLabel: string;
    doneLabel: string;
    nextLabel: string;
    prevLabel: string;
    showDoneButton: boolean;
    showSkipButton: boolean;
    showNextButton: boolean;
    showPrevButton: boolean;
    onSlideChange: (next: number, previous: number) => void;
    bottomButton: boolean;
    numberOfButtons: number;
    renderDoneButton: () => ReactNode;
    renderSkipButton: () => ReactNode;
    renderPrevButton: () => ReactNode;
    renderNextButton: () => ReactNode;
    onDone: () => void;
    onSkip: () => void;
    slides: [];
    hidePagination: boolean;
    styles: IntroScreensStyle;
}

const Touchable: ComponentClass<any> = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

export const SwipeableContainer = (props: SwipeableContainerProps) => {
    const dimensions = Dimensions.get("window");
    const [width, setWidth] = useState(dimensions.width);
    const [activeIndex, setActiveIndex] = useState(0);
    const [flatList, setFlatList] = useState();

    const goToSlide = useCallback(
        (pageNum: number) => {
            setActiveIndex(pageNum);
            flatList &&
                flatList.scrollToOffset({
                    offset: _rtlSafeIndex(pageNum) * width
                });
        },
        [width, flatList]
    );

    const _onNextPress = () => {
        goToSlide(activeIndex + 1);
        props.onSlideChange && props.onSlideChange(activeIndex + 1, activeIndex);
    };
    const _onPrevPress = () => {
        goToSlide(activeIndex - 1);
        props.onSlideChange && props.onSlideChange(activeIndex - 1, activeIndex);
    };

    const _onPaginationPress = (index: number) => {
        const activeIndexBeforeChange = activeIndex;
        goToSlide(index);
        props.onSlideChange && props.onSlideChange(index, activeIndexBeforeChange);
    };

    const _renderItem = ({ item }: any) => {
        return <View style={[{ width, flex: 1, alignContent: "stretch" }]}>{item.content}</View>;
    };

    const _renderDefaultButton = (label: string, bottomStyle: ViewStyle): ReactNode => {
        let content = <Text style={props.styles.buttonText}>{label}</Text>;
        if (props.bottomButton) {
            content = <View style={[styles.bottomButtonDefault, bottomStyle]}>{content}</View>;
        }
        return content;
    };

    const _renderButton = (
        label: string,
        content: () => ReactNode,
        onPress: () => void,
        normalButtonStyle: ViewStyle,
        bottomButtonStyle: ViewStyle
    ) => {
        return (
            <View style={!props.bottomButton ? normalButtonStyle : styles.flexOne}>
                <Touchable onPress={onPress}>
                    {content ? content() : _renderDefaultButton(label, bottomButtonStyle)}
                </Touchable>
            </View>
        );
    };

    const _renderNextButton = ({ showNextButton, nextLabel, renderNextButton, styles }: SwipeableContainerProps) =>
        showNextButton &&
        _renderButton(nextLabel, renderNextButton, _onNextPress, styles.rightButton, styles.buttonNext);

    const _renderPrevButton = ({ showPrevButton, prevLabel, renderPrevButton, styles }: SwipeableContainerProps) =>
        showPrevButton &&
        _renderButton(prevLabel, renderPrevButton, _onPrevPress, styles.leftButton, styles.buttonPrev);

    const _renderDoneButton = ({
        showDoneButton,
        doneLabel,
        renderDoneButton,
        onDone,
        styles
    }: SwipeableContainerProps) =>
        showDoneButton &&
        _renderButton(doneLabel, renderDoneButton, onDone && onDone, styles.rightButton, styles.buttonDone);

    const _renderSkipButton = ({
        showSkipButton,
        skipLabel,
        renderSkipButton,
        onSkip,
        slides,
        styles
    }: SwipeableContainerProps) =>
        showSkipButton &&
        _renderButton(
            skipLabel,
            renderSkipButton,
            () => (onSkip ? onSkip() : goToSlide(slides.length - 1)),
            styles.leftButton,
            styles.buttonSkip
        );

    const _renderPagination = () => {
        const isLastSlide = activeIndex === props.slides.length - 1;
        const isFirstSlide = activeIndex === 0;

        const skipBtn = (!isFirstSlide && _renderPrevButton(props)) || (!isLastSlide && _renderSkipButton(props));
        const btn = isLastSlide ? _renderDoneButton(props) : _renderNextButton(props);

        return (
            <View style={[styles.paginationContainer, props.styles.paginationContainer]}>
                <View style={[styles.paginationDots, props.styles.paginationDots]}>
                    {!props.hidePagination &&
                        props.slides.length > 1 &&
                        props.slides.map((_, i) => (
                            <Touchable
                                key={i}
                                style={[
                                    styles.dot,
                                    _rtlSafeIndex(i) === activeIndex
                                        ? props.styles.activeDotStyle
                                        : props.styles.dotStyle
                                ]}
                                onPress={() => _onPaginationPress(i)}
                            />
                        ))}
                </View>
                {!props.bottomButton && (
                    <Fragment>
                        {btn}
                        {skipBtn}
                    </Fragment>
                )}
                {props.bottomButton && (
                    <View style={styles.bottomButtonsContainer}>
                        {props.numberOfButtons === 2 && skipBtn}
                        {btn}
                    </View>
                )}
            </View>
        );
    };

    const _rtlSafeIndex = (i: number) => (isAndroidRTL ? props.slides.length - 1 - i : i);

    const _onMomentumScrollEnd = useCallback(
        (e: NativeSyntheticEvent<any>) => {
            const offset = e.nativeEvent.contentOffset.x;
            const newIndex = _rtlSafeIndex(Math.round(offset / width));
            if (newIndex === activeIndex) {
                return;
            }
            const lastIndex = activeIndex;
            setActiveIndex(newIndex);
            props.onSlideChange && props.onSlideChange(newIndex, lastIndex);
        },
        [activeIndex, width]
    );

    /**
     * Readjust the size of the slides if the size is different than the device dimensions
     */
    const _onLayout = useCallback(
        (e: LayoutChangeEvent) => {
            const newWidth = e.nativeEvent.layout.width;
            if (newWidth !== width) {
                setWidth(newWidth);
            }
        },
        [width]
    );

    const { hidePagination, skipLabel, doneLabel, nextLabel, prevLabel, ...otherProps } = props;

    const _setRef = useCallback((ref: any) => {
        if (ref) {
            setFlatList(ref);
        }
    }, []);

    return (
        <View style={styles.flexOne}>
            <FlatList
                ref={_setRef}
                data={props.slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                style={styles.flatList}
                renderItem={_renderItem}
                onMomentumScrollEnd={_onMomentumScrollEnd}
                extraData={width}
                onLayout={_onLayout}
                {...otherProps}
            />
            {_renderPagination()}
        </View>
    );
};

SwipeableContainer.defaultProps = {
    skipLabel: "Skip",
    doneLabel: "Done",
    nextLabel: "Next",
    prevLabel: "Back",
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
