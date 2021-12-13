import { Style } from "@mendix/piw-native-utils-internal";
import { ViewStyle } from "react-native";

export interface RadiButtonsStyle extends Style {
    circularBtnStyle: ViewStyle;
    activeBtnStyle: ViewStyle;
}

export const styles: RadiButtonsStyle = {
    circularBtnStyle: {
        width: 10,
        height: 10,
        borderRadius: 5
    },
    activeBtnStyle: {}
};
