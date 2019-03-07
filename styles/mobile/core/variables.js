import { Platform, Dimensions } from 'react-native';
import { setContrast, normalizeFont } from './variables-helpers';

//== Global variables
//## Variables to be used during styling
//-------------------------------------------------------------------------------------------------------------------//
// System defined read-only values
export const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

// Brand Style
export const brand = {
    primary: '#0595DB',
    success: '#76CA02',
    warning: '#f99b1d',
    danger: '#ed1c24',
};

// Gray Colors
export const gray = {
    darkest: '#222',
    darker: '#444',
    dark: '#666',
    regular: '#888',
    light: '#aaa',
    lighter: '#ccc',
    lightest: '#eee',
};

// Background Colors
export const background = {
    primary: '#FFF',
    secondary: '#fafafa',
};

// Border Style
export const border = {
    color: '#ddd',
    radius: Platform.select({ ios: 10, android: 5 }),
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
    color: setContrast('#FFF'),
    weightLight: '100',
    weightNormal: 'normal',
    weightSemiBold: '600',
    weightBold: 'bold',
    family: Platform.select({ ios: 'system', android: 'normal' }),
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
    borderRadius: Platform.select({ ios: border.radius + 16, android: border.radius }),

    primary: {
        color: setContrast(brand.primary),
        borderColor: brand.primary,
        background: brand.primary,
    },
    secondary: {
        color: brand.primary,
        borderColor: brand.primary,
        background: 'transparent',
    },
    success: {
        color: setContrast(brand.success),
        borderColor: brand.success,
        background: brand.success,
    },
    warning: {
        color: setContrast(brand.warning),
        borderColor: brand.warning,
        background: brand.warning,
    },
    danger: {
        color: setContrast(brand.danger),
        borderColor: brand.danger,
        background: brand.danger,
    },
};
