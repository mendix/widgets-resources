import { Platform, Dimensions } from 'react-native';
import { setColorBasedOnBackground, setContrastScale } from './_helperfunctions/calculatecontrast';
import normalizeFont from './_helperfunctions/normalizefont';

//== Global variables
//## Variables to be used during styling
//-------------------------------------------------------------------------------------------------------------------//
// System defined read-only values
export const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

const darkMode = false;
const backgroundColor = darkMode ? '#222' : '#FFF';

// Brand Style
export const brand = {
    primary: '#0595DB',
    success: '#76CA02',
    warning: '#f99b1d',
    danger: '#ed1c24',
};

// Background Colors
export const background = {
    primary: backgroundColor,
    secondary: setContrastScale(backgroundColor, 0.03),
};

// Gray colors
export const contrast = {
    highest: setContrastScale(background.primary, 0.95),
    higher: setContrastScale(background.primary, 0.8),
    high: setContrastScale(background.primary, 0.65),
    regular: setContrastScale(background.primary, 0.5),
    low: setContrastScale(background.primary, 0.35),
    lower: setContrastScale(background.primary, 0.2),
    lowest: setContrastScale(background.primary, 0.05),
};

// Border Style
export const border = {
    color: setContrastScale(background.primary, 0.17),
    width: 1,
    radius: 5,
};

// Font Styles
export const font = {
    size: normalizeFont(14),
    sizeSmall: normalizeFont(12),
    sizeLarge: normalizeFont(18),
    sizeH1: normalizeFont(31),
    sizeH2: normalizeFont(26),
    sizeH3: normalizeFont(24),
    sizeH4: normalizeFont(18),
    sizeH5: normalizeFont(14),
    sizeH6: normalizeFont(12),
    color: setColorBasedOnBackground(background.primary),
    weightLight: '100',
    weightNormal: 'normal',
    weightSemiBold: '600',
    weightBold: 'bold',
    family: Platform.select({ ios: 'System', android: 'normal' }),
};

// Spacing
export const spacing = {
    smallest: 5,
    smaller: 10,
    small: 15,
    regular: 20,
    large: 25,
    larger: 30,
    largest: 40,
};

// Button Styles
export const button = {
    fontSize: font.size,
    borderRadius: border.radius,

    header: {
        color: brand.primary,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
    },
    primary: {
        color: setColorBasedOnBackground(brand.primary),
        borderColor: brand.primary,
        backgroundColor: brand.primary,
    },
    secondary: {
        color: brand.primary,
        borderColor: brand.primary,
        backgroundColor: 'transparent',
    },
    success: {
        color: setColorBasedOnBackground(brand.success),
        borderColor: brand.success,
        backgroundColor: brand.success,
    },
    warning: {
        color: setColorBasedOnBackground(brand.warning),
        borderColor: brand.warning,
        backgroundColor: brand.warning,
    },
    danger: {
        color: setColorBasedOnBackground(brand.danger),
        borderColor: brand.danger,
        backgroundColor: brand.danger,
    },
};

//Input Styles
export const input = {
    // Colors
    color: contrast.higher,
    errorColor: brand.danger,
    borderColor: contrast.lower,
    backgroundColor: background.primary,
    selectionColor: contrast.lower,
    placeholderTextColor: contrast.low,
    underlineColorAndroid: Platform.select({ android: 'transparent' }),

    // Sizes
    fontSize: font.size,
    fontFamily: font.family,
    borderWidth: border.width,
    borderRadius: border.radius,

    // Alignment
    textAlign: 'left',
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.smaller,
};
