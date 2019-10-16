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
import { WelcomeScreenStyle } from "./ui/Styles";

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
    styles: WelcomeScreenStyle;
}

export const SwipeableContainer = (props: SwipeableContainerProps) => {
    const dimensions = Dimensions.get("window");
    const [width, setWidth] = useState(dimensions.width);
    const [activeIndex, setActiveIndex] = useState(0);
    let flatList: FlatList<any>;

    const Touchable: ComponentClass<any> = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

    const goToSlide = useCallback(
        (pageNum: number) => {
            setActiveIndex(pageNum);
            flatList &&
                flatList.scrollToOffset({
                    offset: _rtlSafeIndex(pageNum) * width
                });
        },
        [width]
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

    const _renderItem = (props: any) => {
        return <View style={[{ width, flex: 1, alignContent: "stretch" }]}>{props.item.content}</View>;
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

    const _renderNextButton = () =>
        props.showNextButton &&
        _renderButton(
            props.nextLabel,
            props.renderNextButton,
            _onNextPress,
            props.styles.rightButton,
            props.styles.buttonNext
        );

    const _renderPrevButton = () =>
        props.showPrevButton &&
        _renderButton(
            props.prevLabel,
            props.renderPrevButton,
            _onPrevPress,
            props.styles.leftButton,
            props.styles.buttonPrev
        );

    const _renderDoneButton = () =>
        props.showDoneButton &&
        _renderButton(
            props.doneLabel,
            props.renderDoneButton,
            props.onDone && props.onDone,
            props.styles.rightButton,
            props.styles.buttonDone
        );

    const _renderSkipButton = () =>
        props.showSkipButton &&
        _renderButton(
            props.skipLabel,
            props.renderSkipButton,
            () => (props.onSkip ? props.onSkip() : goToSlide(props.slides.length - 1)),
            props.styles.leftButton,
            props.styles.buttonSkip
        );

    const _renderPagination = () => {
        const isLastSlide = activeIndex === props.slides.length - 1;
        const isFirstSlide = activeIndex === 0;

        const skipBtn = (!isFirstSlide && _renderPrevButton()) || (!isLastSlide && _renderSkipButton());
        const btn = isLastSlide ? _renderDoneButton() : _renderNextButton();

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
            // Touching very very quickly and continuous brings about
            // a variation close to - but not quite - the width.
            // That's why we round the number.
            // Also, Android phones and their weird numbers
            const newIndex = _rtlSafeIndex(Math.round(offset / width));
            if (newIndex === activeIndex) {
                // No page change, don't do anything
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

    const _setRef = useCallback((ref: FlatList<any>) => (flatList = ref), []);

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
    activeDotStyle: {
        backgroundColor: "rgba(255, 255, 255, .9)"
    },
    dotStyle: {
        backgroundColor: "rgba(0, 0, 0, .2)"
    },
    skipLabel: "Skip",
    doneLabel: "Done",
    nextLabel: "Next",
    prevLabel: "Back",
    buttonStyle: null,
    buttonTextStyle: null,
    paginationStyle: null,
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
