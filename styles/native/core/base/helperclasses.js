import { background, spacing, border } from '../variables';
import { Platform } from 'react-native';

// Hide on Android
export const hideOnAndroid = {
    container: {
        display: Platform.select({ android: 'none' }),
    },
};
// Hide on iOS
export const hideOnIos = {
    container: {
        display: Platform.select({ ios: 'none' }),
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
