import { createElement, ReactElement, ReactNode, useCallback, useRef, useState } from "react";
import { ListViewSwipeProps } from "../typings/ListViewSwipeProps";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { Animated, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { defaultListViewSwipeStyle, ListViewSwipeStyle, PanelStyle } from "./ui/styles";
import { ActionValue } from "mendix";
import { executeAction } from "@widgets-resources/piw-utils";

export const ListViewSwipe = (props: ListViewSwipeProps<ListViewSwipeStyle>): ReactElement => {
    const row = useRef<Swipeable>(null);
    const styles = flattenStyles(defaultListViewSwipeStyle, props.style);
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [animate, setAnimate] = useState(false);

    const isLeftSideAction = props.leftRenderMode !== "buttons";
    const isRightSideAction = props.rightRenderMode !== "buttons";
    const isLeftDisabled = props.leftRenderMode === "disabled";
    const isRightDisabled = props.rightRenderMode === "disabled";
    const isLeftToggle = props.leftRenderMode === "toggle";
    const isRightToggle = props.rightRenderMode === "toggle";

    const setAnimationDefinitions = useCallback((event: any) => {
        setAnimation(new Animated.Value(event.nativeEvent.layout.height));
    }, []);

    const renderLeftActions = (): ReactNode => {
        if (isLeftDisabled) {
            return undefined;
        } else if (isLeftSideAction) {
            return renderAction(styles.leftAction, props.left, isLeftToggle, "leftAction");
        }
        return renderButtons(styles.leftAction, props.left, "leftButtons");
    };

    const renderRightActions = (): ReactNode => {
        if (isRightDisabled) {
            return undefined;
        } else if (isRightSideAction) {
            return renderAction(styles.rightAction, props.right, isRightToggle, "rightAction");
        }
        return renderButtons(styles.rightAction, props.right, "rightButtons");
    };

    const close = useCallback((): void => {
        if (row && row.current) {
            row.current.close();
        }
    }, [row]);

    const renderAction = (style: PanelStyle, content: ReactNode, isToggle: boolean, testID: string): ReactElement => {
        const { panelSize, ...normalStyle } = style;
        delete normalStyle.threshold;
        return (
            <RectButton
                style={[normalStyle, isToggle && { flex: 0, width: panelSize }]}
                onPress={close}
                testID={`${props.name}$${testID}`}
            >
                {content}
            </RectButton>
        );
    };

    const renderButtons = (style: PanelStyle, content: ReactNode, testID: string): ReactElement => {
        const { panelSize, ...normalStyle } = style;
        delete normalStyle.threshold;
        return (
            <View style={{ width: panelSize, flexDirection: "row" }} testID={`${props.name}$${testID}`}>
                <View style={normalStyle}>{content}</View>
            </View>
        );
    };

    const onSwipeLeft = useCallback((): void => {
        performAnimation(props.leftRenderMode, props.onSwipeLeft);
    }, [animation]);

    const onSwipeRight = useCallback((): void => {
        performAnimation(props.rightRenderMode, props.onSwipeRight);
    }, [animation]);

    const performAnimation = useCallback(
        (renderMode: string, action?: ActionValue): void => {
            if (renderMode === "swipeOutReset" || renderMode === "toggle") {
                close();
                executeAction(action);
            } else if (renderMode === "archive") {
                setAnimate(true);
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false
                }).start(() => {
                    executeAction(action);
                });
            } else {
                executeAction(action);
            }
        },
        [animation]
    );

    return (
        <Animated.View style={animate ? { height: animation } : {}}>
            <Swipeable
                ref={row}
                friction={1}
                leftThreshold={styles.leftAction.threshold ? styles.leftAction.threshold : isLeftSideAction ? 100 : 40}
                rightThreshold={
                    styles.rightAction.threshold ? styles.rightAction.threshold : isRightSideAction ? 100 : 40
                }
                renderLeftActions={renderLeftActions}
                renderRightActions={renderRightActions}
                onSwipeableLeftOpen={onSwipeLeft}
                onSwipeableRightOpen={onSwipeRight}
                overshootLeft={false}
                overshootRight={false}
                useNativeAnimations
            >
                <View style={styles.container} onLayout={setAnimationDefinitions} testID={props.name}>
                    {props.content}
                </View>
            </Swipeable>
        </Animated.View>
    );
};
