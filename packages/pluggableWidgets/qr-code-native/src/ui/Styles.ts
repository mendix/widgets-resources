import { Style } from "@native-mobile-resources/util-widgets";
import { ViewStyle } from "react-native";

interface QRCodeStyle extends Style {
    container: ViewStyle;
    qrcode: {
        size: number;
        color: string;
        backgroundColor: string;
    };
}

export const defaultQRCodeStyle: QRCodeStyle = {
    container: {},
    qrcode: {
        size: 100,
        color: "black",
        backgroundColor: "white"
    }
};
