import { ViewStyle, TextStyle } from "react-native";
import { Style } from "@mendix/piw-native-utils-internal";

const RADIO_BUTTON_SIZE: number = 20;

export interface RadioButtonStyle extends Style {
    container: ViewStyle;
    radioButtonContainer: ViewStyle;

    caption: TextStyle;
    disabledCaption: TextStyle;

    activeCircleRadioButton: ViewStyle;
    defaultCircleRadioButton: ViewStyle;
    disabledCircleRadioButton: ViewStyle;

    horizontalContainer: ViewStyle;
}

export const defaultRadioButtonStyle: RadioButtonStyle = {
    container: {
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    horizontalContainer: {
        flexDirection: "row"
    },
    radioButtonContainer: {
        flexDirection: "row",
        paddingVertical: 5,
        alignItems: "center"
    },
    caption: {
        marginStart: 5,
        fontSize: 20,
        color: "#000"
    },
    disabledCaption: {
        color: "#CCC"
    },
    defaultCircleRadioButton: {
        backgroundColor: "#000",
        borderColor: "#fff",
        borderWidth: 1,
        height: RADIO_BUTTON_SIZE,
        width: RADIO_BUTTON_SIZE,
        borderRadius: RADIO_BUTTON_SIZE / 2,
        alignItems: "center",
        justifyContent: "center"
    },
    activeCircleRadioButton: {
        backgroundColor: "#fff",
        height: RADIO_BUTTON_SIZE / 2,
        width: RADIO_BUTTON_SIZE / 2,
        borderRadius: RADIO_BUTTON_SIZE / 4
    },
    disabledCircleRadioButton: {
        opacity: 0.7
    }
};
