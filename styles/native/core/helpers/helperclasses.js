import { Platform }           from "react-native";
import { background, border } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

// Hide on Android
export const hideOnAndroid = {
    container: {
        display: Platform.select({ android: "none" }),
    },
};
// Hide on iOS
export const hideOnIos = {
    container: {
        display: Platform.select({ ios: "none" }),
    },
};

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

export const borderBottom = {
    container: {
        borderColor: border.color,
        borderBottomWidth: border.width,
    },
};
