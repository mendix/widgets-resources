import { Style } from "@native-mobile-resources/util-widgets";
import { TextStyle, ViewStyle } from "react-native";

export interface ModalItemsStyle {
    defaultStyle?: TextStyle;
    primaryStyle?: TextStyle;
    dangerStyle?: TextStyle;
    customStyle?: TextStyle;
}

export interface BottomSheetStyle extends Style {
    container: ViewStyle;
    modalItems: ModalItemsStyle;
}

export const defaultBottomDrawerStyle: BottomSheetStyle = {
    container: {},
    modalItems: {
        defaultStyle: {
            fontSize: 16,
            color: "black"
        },
        primaryStyle: {
            fontSize: 16,
            color: "#0595DB"
        },
        dangerStyle: {
            fontSize: 16,
            color: "#ed1c24"
        },
        customStyle: {
            fontSize: 16,
            color: "#76CA02"
        }
    }
};
