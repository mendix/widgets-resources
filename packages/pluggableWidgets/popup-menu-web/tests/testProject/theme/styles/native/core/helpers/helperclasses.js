import { Platform } from "react-native";
import { background, border } from "../variables";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

*/
// Hide on Android
export const hideOnAndroid = {
    container: {
        display: Platform.select({ ios: "flex", android: "none" }),
    },
};
// Hide on iOS
export const hideOnIos = {
    container: {
        display: Platform.select({ ios: "none", android: "flex" }),
    },
};
//
//== Background Colors
export const backgroundPrimary = {
    container: {
        backgroundColor: background.primary,
    },
};
export const backgroundSecondary = {
    container: {
        backgroundColor: background.secondary,
    },
};
export const backgroundBrandPrimary = {
    container: {
        backgroundColor: background.brandPrimary,
    },
};
export const backgroundBrandSuccess = {
    container: {
        backgroundColor: background.brandSuccess,
    },
};
export const backgroundBrandWarning = {
    container: {
        backgroundColor: background.brandWarning,
    },
};
export const backgroundBrandDanger = {
    container: {
        backgroundColor: background.brandDanger,
    },
};
export const backgroundGray = {
    container: {
        backgroundColor: background.gray,
    },
};
//
// borders
export const borderTop = {
    container: {
        borderColor: border.color,
        borderTopWidth: border.width,
    },
};
export const borderBottom = {
    container: {
        borderColor: border.color,
        borderBottomWidth: border.width,
    },
};
