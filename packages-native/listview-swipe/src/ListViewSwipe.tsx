import { createElement, ReactNode, useCallback, useState } from "react";
import { ListViewSwipeProps } from "../typings/ListViewSwipeProps";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { Animated, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { defaultListViewSwipeStyle, ListViewSwipeStyle, PanelStyle } from "./ui/styles";

export function ListViewSwipe(props: ListViewSwipeProps<ListViewSwipeStyle>) {
    let row: any;
    const styles = flattenStyles(defaultListViewSwipeStyle, props.style);
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [animate, setAnimate] = useState(false);

    const isLeftSideAction = props.leftRenderMode !== "buttons";
    const isRightSideAction = props.rightRenderMode !== "buttons";
    const isLeftDisabled = props.leftRenderMode === "disabled";
    const isRightDisabled = props.rightRenderMode === "disabled";

    const setAnimationDefinitions = useCallback((event: any) => {
        setAnimation(new Animated.Value(event.nativeEvent.layout.height));
    }, []);

    // const animationEffect = new Animated.Value(0);
    // const interpolateEffect = animationEffect.interpolate({ inputRange: [0, 1], outputRange: ['100%', '0%'] });
    // const animation = Animated.timing(animationEffect, { toValue: 1, duration: 500 });
    // const [animationStyle, setAnimationStyle] = useState({});

    const renderLeftActions = (): ReactNode => {
        if (isLeftDisabled) {
            return undefined;
        } else if (isLeftSideAction) {
            return renderAction(styles.leftAction, props.left);
        } else {
            return renderButtons(styles.leftAction, props.left);
        }
    };

    const renderRightActions = (): ReactNode => {
        if (isRightDisabled) {
            return undefined;
        } else if (isRightSideAction) {
            return renderAction(styles.rightAction, props.right);
        } else {
            return renderButtons(styles.rightAction, props.right);
        }
    };

    const updateRef = (ref: any) => {
        row = ref;
    };

    const close = () => {
        row.close();
    };

    const renderAction = (style: PanelStyle, content: ReactNode) => (
        <RectButton style={style} onPress={close}>
            {content}
        </RectButton>
    );

    const renderButtons = (style: PanelStyle, content: ReactNode) => {
        const actionStyle = { ...style };
        delete actionStyle.panelSize; // Deleting this property to avoid warnings
        return (
            <View style={{ width: style.panelSize, flexDirection: "row" }}>
                <View style={actionStyle}>{content}</View>
            </View>
        );
    };

    // const triggerShrinkAnimation = () => {
    //     const animationEffect = new Animated.Value(0);
    //     const interpolateEffect = animationEffect.interpolate({inputRange:[0,1],outputRange:['100%','0%']});
    //     // setAnimation({ height: interpolateEffect })
    //
    // };

    const onSwipeLeft = () => {
        if (isLeftSideAction && props.onSwipeLeft && props.onSwipeLeft.canExecute) {
            if (props.leftRenderMode === "swipeOutReset") {
                row.close();
            }
            if (props.leftRenderMode === "archive") {
                setAnimate(true);
                Animated.timing(
                    //Step 4
                    animation,
                    {
                        toValue: 0,
                        duration: 200
                    }
                ).start(() => {
                    // @ts-ignore
                    props.onSwipeLeft.execute();
                });
            } else {
                props.onSwipeLeft.execute();
            }
        }
    };

    const onSwipeRight = () => {
        if (isRightSideAction && props.onSwipeRight && props.onSwipeRight.canExecute) {
            if (props.rightRenderMode === "swipeOutReset") {
                row.close();
            }
            if (props.rightRenderMode === "archive") {
                setAnimate(true);
                Animated.timing(
                    //Step 4
                    animation,
                    {
                        toValue: 0,
                        duration: 200
                    }
                ).start(() => {
                    // @ts-ignore
                    props.onSwipeRight.execute();
                });
            } else {
                props.onSwipeRight.execute();
            }
        }
    };

    return (
        <Animated.View style={animate ? { height: animation } : {}}>
            <Swipeable
                ref={updateRef}
                friction={1}
                leftThreshold={isLeftSideAction ? 100 : 40}
                rightThreshold={isRightSideAction ? 100 : 40}
                renderLeftActions={renderLeftActions}
                renderRightActions={renderRightActions}
                onSwipeableLeftOpen={onSwipeLeft}
                onSwipeableRightOpen={onSwipeRight}
                overshootLeft={false}
                overshootRight={false}
                useNativeAnimations
            >
                <View style={styles.container} onLayout={setAnimationDefinitions}>
                    {props.content}
                </View>
            </Swipeable>
        </Animated.View>
    );
}
