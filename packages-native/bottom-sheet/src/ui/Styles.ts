import { Style } from "@native-mobile-resources/util-widgets";
import { TextStyle, ViewStyle } from "react-native";
import DeviceInfo from "react-native-device-info";

export interface ModalItemsStyle {
    defaultStyle?: TextStyle;
    primaryStyle?: TextStyle;
    dangerStyle?: TextStyle;
    customStyle?: TextStyle;
}

export interface BottomSheetStyle extends Style {
    container: ViewStyle;
    modal: ViewStyle;
    modalItems: ModalItemsStyle;
}

const isiPhoneModelWithNotch = (): boolean => {
    const model = DeviceInfo.getDeviceId();
    if (model.indexOf("iPhone") !== -1) {
        switch (model) {
            case "iPhone10,6": // iPhone X GSM
            case "iPhone11,2": // iPhone XS
            case "iPhone11,4": // iPhone XS Max
            case "iPhone11,6": // iPhone XS Max Global
            case "iPhone11,8": // Iphone XR
            case "iPhone12,1": // Iphone 11
            case "iPhone12,3": // Iphone 11 Pro
            case "iPhone12,5": // Iphone 11 Pro Max
                return true;
            default:
                return false;
        }
    }
    return false;
};

export const defaultPaddings = { paddingBottom: isiPhoneModelWithNotch() ? 24 : 0 };

export const defaultBottomDrawerStyle: BottomSheetStyle = {
    container: {},
    modal: {
        margin: 0,
        justifyContent: "flex-end"
    },
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
