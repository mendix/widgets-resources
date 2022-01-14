import { Style } from "@mendix/piw-native-utils-internal";
import { TextStyle, ViewStyle } from "react-native";

export interface RadioButtonsStyle extends Style {
    container: ViewStyle;
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
    container: {},
    containerHorizontal: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    radioButtonItemContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8
    },
    radioButtonItemContainerHorizontalStyle: {
        marginBottom: 0,
        marginEnd: 8
    },
    radioButtonItemContainerDisabledStyle: {
        opacity: 0.5
    },
    circularButtonStyle: {
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 16,
        height: 16,
        borderRadius: 8,
        borderColor: "#CED0D3",
        marginEnd: 4
    },
    labelTextStyle: {
        color: "#0A1326",
        fontSize: 12,
        lineHeight: 18,
        marginBottom: 8
    },

    activeButtonStyle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#264AE5"
    },
    radioButtonItemTitleStyle: {
        color: "#0A1326",
        fontSize: 12,
        lineHeight: 18
    },
    validationMessage: {
        color: "#E33F4E",
        fontSize: 12
    }
};
