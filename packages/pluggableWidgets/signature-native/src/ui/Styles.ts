import { Style } from "@native-mobile-resources/util-widgets";
import { ViewStyle } from "react-native";

export interface SignatureStyle extends Style {
    container: ViewStyle;
}

export const defaultSignatureStyle: SignatureStyle = {
    container: {
        backgroundColor: "transparent"
    }
};
