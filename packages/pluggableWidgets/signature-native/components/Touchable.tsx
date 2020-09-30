import { createElement, FunctionComponent } from "react";
import {
    TouchableNativeFeedback,
    TouchableHighlight,
    Platform,
    ViewStyle,
    LayoutChangeEvent,
    TouchableOpacity,
    TouchableNativeFeedbackProps,
    TouchableHighlightProps,
    View
} from "react-native";
import { extractStyles } from "@mendix/pluggable-widgets-tools";

const DEFAULT_RIPPLE_COLOR = "rgba(0, 0, 0, 0.2)";
const isAndroid = Platform.OS === "android";

export interface TouchableProps extends TouchableNativeFeedbackProps, TouchableHighlightProps {
    onLayout?: (event: LayoutChangeEvent) => void;
    onPress: () => void;
    testID?: string;
    disabled?: boolean;
    accessible?: boolean;
    rippleColor?: string;
    borderless?: boolean;
    style?: ViewStyle;
}

const Touchable: FunctionComponent<TouchableProps> = props => {
    if (isAndroid) {
        return (
            <TouchableNativeFeedback
                {...props}
                useForeground={TouchableNativeFeedback.canUseNativeForeground()}
                background={TouchableNativeFeedback.Ripple(
                    props.rippleColor ?? DEFAULT_RIPPLE_COLOR,
                    !!props.borderless
                )}
            >
                <View style={{ ...props.style, overflow: "hidden" }}>{props.children}</View>
            </TouchableNativeFeedback>
        );
    } else {
        const [childStyle, style] = extractStyles(props.style, [
            "alignContent",
            "alignItems",
            "direction",
            "flexDirection",
            "flexWrap",
            "justifyContent",
            "padding",
            "paddingVertical",
            "paddingHorizontal",
            "paddingTop",
            "paddingBottom",
            "paddingLeft",
            "paddingRight",
            "paddingStart",
            "paddingEnd"
        ]);

        if (props.underlayColor) {
            return (
                <TouchableHighlight
                    {...props}
                    style={style}
                    underlayColor={props.underlayColor}
                    activeOpacity={props.activeOpacity}
                >
                    <View style={{ flexGrow: 0, flexShrink: 0, ...childStyle }}>{props.children}</View>
                </TouchableHighlight>
            );
        }
        return (
            <TouchableOpacity {...props} style={style}>
                <View style={{ flexGrow: 0, flexShrink: 0, ...childStyle }}>{props.children}</View>
            </TouchableOpacity>
        );
    }
};

export { Touchable };
