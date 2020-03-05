import { Platform }           from "react-native";
import { background, border } from "../variables";
import { HelperClass }        from "../../types/helperclass";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

// Hide on Android
export const hideOnAndroid: HelperClass = {
    container: {
        display: Platform.select({ios: "flex", android: "none"}),
    },
};
// Hide on iOS
export const hideOnIos: HelperClass = {
    container: {
        display: Platform.select({ios: "none", android: "flex"}),
    },
};

//== Background Colors
export const backgroundPrimary: HelperClass = {
    container: {
        backgroundColor: background.primary,
    },
};
export const backgroundSecondary: HelperClass = {
    container: {
        backgroundColor: background.secondary,
    },
};
export const backgroundBrandPrimary: HelperClass = {
    container: {
        backgroundColor: background.brandPrimary,
    },
};
export const backgroundBrandSuccess: HelperClass = {
    container: {
        backgroundColor: background.brandSuccess,
    },
};
export const backgroundBrandWarning: HelperClass = {
    container: {
        backgroundColor: background.brandWarning,
    },
};
export const backgroundBrandDanger: HelperClass = {
    container: {
        backgroundColor: background.brandDanger,
    },
};
export const backgroundGray: HelperClass = {
    container: {
        backgroundColor: background.gray,
    },
};

// borders
export const borderTop: HelperClass = {
    container: {
        borderColor: border.color,
        borderTopWidth: border.width,
    },
};
export const borderBottom: HelperClass = {
    container: {
        borderColor: border.color,
        borderBottomWidth: border.width,
    },
};
