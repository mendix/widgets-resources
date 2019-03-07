import { gray, brand, font, background } from '../variables';
import { Platform } from 'react-native';

/* ==========================================================================
    TopBar / BottomBar

    Default Class For Mendix TopBar / BottomBar
========================================================================== */

export const navigationStyle = {
    topBar: {
        backgroundColor: background.primary,
        backButtonColor: gray.darkest,
        backButtonFontSize: font.size,
        titleColor: gray.darkest,
        titleFontSize: font.sizeH4,
        fontWeight: Platform.select({ ios: font.weightBold, android: font.weightNormal }),
    },
    bottomBar: {
        fontSize: font.size,
        backgroundColor: background.primary,
        textColor: gray.dark,
        iconColor: gray.dark,
        selectedIconColor: brand.primary,
        selectedTextColor: brand.primary,
    },
};
