import { Style } from "@mendix/piw-native-utils-internal";
import { TextStyle, ViewStyle } from "react-native";

export interface RadioButtonsStyle extends Style {
    containerHorizontal: ViewStyle;
    labelTextStyle: TextStyle;
    radioButtonItemContainerStyle: ViewStyle;
    radioButtonItemContainerDisabledStyle: ViewStyle;
    radioButtonItemContainerHorizontalStyle: ViewStyle;
    circularButtonStyle: ViewStyle;
    activeButtonStyle: ViewStyle;
    radioButtonItemTitleStyle: TextStyle;
    validationMessage: TextStyle;
}

export const defaultRadioButtonsStyle: RadioButtonsStyle = {
    containerHorizontal: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    radioButtonItemContainerStyle: {
        flexDirection: "row",
        alignItems: "center"
    },
    radioButtonItemContainerHorizontalStyle: {
        marginBottom: 0
    },
    radioButtonItemContainerDisabledStyle: {
        opacity: 0.5
    },
    circularButtonStyle: {
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    labelTextStyle: {},
    activeButtonStyle: {},
    radioButtonItemTitleStyle: {},
    validationMessage: {}
};
