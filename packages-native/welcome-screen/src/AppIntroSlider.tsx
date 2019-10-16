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
    TextStyle,
    NativeSyntheticEvent,
    LayoutChangeEvent,
    TouchableNativeFeedback
} from "react-native";
import DeviceInfo from "react-native-device-info";

const isIphoneX = Platform.OS === "ios" && DeviceInfo.hasNotch();

const isAndroidRTL = I18nManager.isRTL && Platform.OS === "android";

interface SwipeableContainerProps {
    activeDotStyle: ViewStyle;
    dotStyle: ViewStyle;
    skipLabel: string;
    doneLabel: string;
    nextLabel: string;
    prevLabel: string;
    // buttonStyle: ViewStyle;
    buttonTextStyle: TextStyle;
    paginationStyle: ViewStyle;
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

    const _renderButton = (name: string, onPress: () => void) => {
        // @ts-ignore
        const show: boolean = props[`show${name}Button`];
        // @ts-ignore
        const content: ReactNode = props[`render${name}Button`]
            ? props[`render${name}Button`]()
            : _renderDefaultButton(name);
        return show && _renderOuterButton(content, name, onPress);
    };

    const _renderDefaultButton = (name: string): ReactNode => {
        // @ts-ignore
        let content = (
            <Text style={[styles.buttonText, props.buttonTextStyle]}>{props[`${name.toLowerCase()}Label`]}</Text>
        );
        if (props.bottomButton) {
            // @ts-ignore
            content = <View style={[styles.bottomButtonDefault, styles[`button${name}`]]}>{content}</View>;
        }
        return content;
    };

    const _renderOuterButton = (content: ReactNode, name: string, onPress: () => void) => {
        const style = name === "Skip" || name === "Prev" ? styles.leftButtonContainer : styles.rightButtonContainer;
        return (
            <View style={!props.bottomButton ? style : styles.flexOne}>
                <Touchable onPress={onPress}>{content}</Touchable>
            </View>
        );
    };

    const _renderNextButton = () => _renderButton("Next", _onNextPress);

    const _renderPrevButton = () => _renderButton("Prev", _onPrevPress);

    const _renderDoneButton = () => _renderButton("Done", props.onDone && props.onDone);

    const _renderSkipButton = () =>
        // scrollToEnd does not work in RTL so use goToSlide instead
        _renderButton("Skip", () => (props.onSkip ? props.onSkip() : goToSlide(props.slides.length - 1)));

    const _renderPagination = () => {
        const isLastSlide = activeIndex === props.slides.length - 1;
        const isFirstSlide = activeIndex === 0;

        const skipBtn = (!isFirstSlide && _renderPrevButton()) || (!isLastSlide && _renderSkipButton());
        const btn = isLastSlide ? _renderDoneButton() : _renderNextButton();

        return (
            <View style={[styles.paginationContainer, props.paginationStyle]}>
                <View style={styles.paginationDots}>
                    {!props.hidePagination &&
                        props.slides.length > 1 &&
                        props.slides.map((_, i) => (
                            <Touchable
                                key={i}
                                style={[
                                    styles.dot,
                                    _rtlSafeIndex(i) === activeIndex ? props.activeDotStyle : props.dotStyle
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

    const {
        hidePagination,
        activeDotStyle,
        dotStyle,
        skipLabel,
        doneLabel,
        nextLabel,
        prevLabel,
        buttonTextStyle,
        ...otherProps
    } = props;

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
        bottom: 16 + (isIphoneX ? 34 : 0),
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
    leftButtonContainer: {
        position: "absolute",
        left: 0
    },
    rightButtonContainer: {
        position: "absolute",
        right: 0
    },
    // bottomButton: {
    //     flex: 1,
    //     backgroundColor: "rgba(0, 0, 0, .3)",
    //     alignItems: "center",
    //     justifyContent: "center"
    // },
    buttonText: {
        backgroundColor: "transparent",
        color: "white",
        fontSize: 18,
        padding: 12,
        alignSelf: "center"
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
    },
    buttonSkip: {
        backgroundColor: "red"
    },
    buttonDone: {
        backgroundColor: "blue"
    },
    buttonPrev: {
        backgroundColor: "brown"
    },
    buttonNext: {
        backgroundColor: "brown"
    }
});
