import { createElement, ReactElement, ReactNode, useCallback, useRef, useState } from "react";
import { ListViewSwipeProps } from "../typings/ListViewSwipeProps";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { Animated, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { defaultListViewSwipeStyle, ListViewSwipeStyle, PanelStyle } from "./ui/styles";
import { ActionValue, EditableValue } from "mendix";

export const ListViewSwipe = (props: ListViewSwipeProps<ListViewSwipeStyle>): ReactElement => {
    const row = useRef<Swipeable>(null);
    const [side, setSide] = useState("");
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
            return renderAction(styles.leftAction, props.left, isLeftToggle);
        } else {
            return renderButtons(styles.leftAction, props.left);
        }
    };

    const renderRightActions = (): ReactNode => {
        if (isRightDisabled) {
            return undefined;
        } else if (isRightSideAction) {
            return renderAction(styles.rightAction, props.right, isRightToggle);
        } else {
            return renderButtons(styles.rightAction, props.right);
        }
    };

    const close = useCallback((): void => {
        if (row && row.current) {
            row.current.close();
        }
    }, [row]);

    const renderAction = (style: PanelStyle, content: ReactNode, isToggle: boolean): ReactElement => {
        const { panelSize, ...normalStyle } = style;
        return (
            <RectButton style={[normalStyle, isToggle && { flex: 0, width: panelSize }]} onPress={close}>
                {content}
            </RectButton>
        );
    };

    const renderButtons = (style: PanelStyle, content: ReactNode): ReactElement => {
        const { panelSize, ...normalStyle } = style;
        return (
            <View style={{ width: panelSize, flexDirection: "row" }}>
                <View style={normalStyle}>{content}</View>
            </View>
        );
    };

    const onSwipeLeft = useCallback((): void => {
        changeAttributeValue(props.leftThresholdAttribute, true);
        if (isLeftSideAction && props.onSwipeLeft && props.onSwipeLeft.canExecute) {
            triggerAction(props.leftRenderMode, props.onSwipeLeft);
        }
    }, [animation]);

    const onSwipeRight = useCallback((): void => {
        changeAttributeValue(props.rightThresholdAttribute, true);
        if (isRightSideAction && props.onSwipeRight && props.onSwipeRight.canExecute) {
            triggerAction(props.rightRenderMode, props.onSwipeRight);
        }
    }, [animation]);

    const triggerAction = useCallback(
        (renderMode: string, action: ActionValue): void => {
            if (renderMode === "swipeOutReset" || renderMode === "toggle") {
                close();
            }
            if (renderMode === "archive") {
                setAnimate(true);
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 200
                }).start(() => {
                    action.execute();
                });
            } else {
                action.execute();
            }
        },
        [animation]
    );

    const changeAttributeValue = (attribute?: EditableValue<boolean>, value?: boolean): void => {
        if (attribute && !attribute.readOnly) {
            attribute.setValue(value);
        }
    };

    const onClose = useCallback(() => {
        if (side === "left") {
            changeAttributeValue(props.leftThresholdAttribute, false);
        } else if (side === "right") {
            changeAttributeValue(props.rightThresholdAttribute, false);
        }
    }, [side]);

    const onLeftWillOpen = useCallback(() => {
        setSide("left");
        changeAttributeValue(props.leftThresholdAttribute, false);
    }, []);

    const onRightWillOpen = useCallback(() => {
        setSide("right");
        changeAttributeValue(props.rightThresholdAttribute, false);
    }, []);

    return (
        <Animated.View style={animate ? { height: animation } : {}}>
            <Swipeable
                ref={row}
                friction={1}
                leftThreshold={isLeftSideAction ? 100 : 40}
                rightThreshold={isRightSideAction ? 100 : 40}
                renderLeftActions={renderLeftActions}
                renderRightActions={renderRightActions}
                onSwipeableLeftOpen={onSwipeLeft}
                onSwipeableRightOpen={onSwipeRight}
                overshootLeft={isLeftToggle}
                overshootRight={isRightToggle}
                onSwipeableLeftWillOpen={onLeftWillOpen}
                onSwipeableRightWillOpen={onRightWillOpen}
                onSwipeableClose={onClose}
                useNativeAnimations
            >
                <View style={styles.container} onLayout={setAnimationDefinitions}>
                    {props.content}
                </View>
            </Swipeable>
        </Animated.View>
    );
};
