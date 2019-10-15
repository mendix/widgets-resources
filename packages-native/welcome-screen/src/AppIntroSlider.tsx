import { useState, createElement, ReactNode, useCallback } from "react";
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
    NativeSyntheticEvent
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
    buttonStyle: ViewStyle;
    buttonTextStyle: TextStyle;
    paginationStyle: ViewStyle;
    showDoneButton: boolean;
    showSkipButton: boolean;
    showNextButton: boolean;
    showPrevButton: boolean;
    onSlideChange: (next: number, previous: number) => void;
    // renderItem: (props: {item: any}) => ReactNode;
    bottomButton: any;
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
    const [height, setHeight] = useState(dimensions.height);
    const [activeIndex, setActiveIndex] = useState(0);
    let flatList: FlatList<any>;

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
            content = (
                <View
                    style={[
                        styles.bottomButton,
                        (name === "Skip" || name === "Prev") && {
                            backgroundColor: "transparent"
                        },
                        props.buttonStyle
                    ]}
                >
                    {content}
                </View>
            );
        }
        return content;
    };

    const _renderOuterButton = (content: ReactNode, name: string, onPress: () => void) => {
        const style = name === "Skip" || name === "Prev" ? styles.leftButtonContainer : styles.rightButtonContainer;
        return (
            <View style={!props.bottomButton && style}>
                <TouchableOpacity onPress={onPress} style={props.bottomButton ? styles.flexOne : props.buttonStyle}>
                    {content}
                </TouchableOpacity>
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
                    {props.slides.length > 1 &&
                        props.slides.map((_, i) => (
                            <TouchableOpacity
                                key={i}
                                style={[
                                    styles.dot,
                                    _rtlSafeIndex(i) === activeIndex ? props.activeDotStyle : props.dotStyle
                                ]}
                                onPress={() => _onPaginationPress(i)}
                            />
                        ))}
                </View>
                {btn}
                {skipBtn}
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

    const _onLayout = useCallback(() => {
        const dimensions = Dimensions.get("window");
        if (dimensions.width !== width || dimensions.height !== height) {
            // Set new width to update rendering of pages
            setWidth(dimensions.width);
            setHeight(dimensions.height);
            // Set new scroll position
            const func = () => {
                flatList &&
                    flatList.scrollToOffset({
                        offset: _rtlSafeIndex(activeIndex) * dimensions.width,
                        animated: false
                    });
            };
            Platform.OS === "android" ? setTimeout(func, 0) : func();
        }
    }, []);

    const {
        hidePagination,
        activeDotStyle,
        dotStyle,
        skipLabel,
        doneLabel,
        nextLabel,
        prevLabel,
        buttonStyle,
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
            {!hidePagination && _renderPagination()}
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
    bottomButton: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, .3)",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        backgroundColor: "transparent",
        color: "white",
        fontSize: 18,
        padding: 12
    }
});
