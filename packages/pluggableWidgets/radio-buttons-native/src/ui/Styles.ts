import { Style } from "@mendix/piw-native-utils-internal";
import { TextStyle, ViewStyle } from "react-native";

export interface RadioButtonsStyle extends Style {
    container: ViewStyle;
    containerHorizontal: ViewStyle;
    radioItemContainerStyle: ViewStyle;
    radioItemContainerDisabledStyle: ViewStyle;
    circularBtnStyle: ViewStyle;
    activeBtnStyle: ViewStyle;
    radioItemTitleStyle: TextStyle;
    validationMessage: TextStyle;
}

export const defaultRadioButtonsStyle: RadioButtonsStyle = {
    container: {},
    containerHorizontal: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    radioItemContainerStyle: {
        flexDirection: "row",
        alignItems: "center"
    },
    circularBtnStyle: {
        justifyContent: "center",
        alignItems: "center"
    },
    activeBtnStyle: {},
    radioItemTitleStyle: {},
    radioItemTitleDisabledStyle: {},
    circularBtnDisabledStyle: {},
    radioItemContainerDisabledStyle: { opacity: 0.3 },
    validationMessage: {}
};
