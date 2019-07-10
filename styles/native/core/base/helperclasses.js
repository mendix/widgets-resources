import { background, spacing } from '../variables';
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
