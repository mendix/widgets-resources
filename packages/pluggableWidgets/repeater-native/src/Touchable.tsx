import { createElement, FunctionComponent, Fragment } from "react";
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
        if (props.underlayColor) {
            return (
                <TouchableHighlight {...props} underlayColor={props.underlayColor} activeOpacity={props.activeOpacity}>
                    <Fragment>{props.children}</Fragment>
                </TouchableHighlight>
            );
        }
        return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
    }
};

export { Touchable };
