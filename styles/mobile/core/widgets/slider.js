import { contrast, brand, background, border } from '../variables';
import { Platform } from 'react-native';

/* ==========================================================================
    Slider

    Default Class For Mendix Slider Widget
========================================================================== */

export const com_mendix_widget_native_slider_Slider = (Slider = {
    // All these properties allow ViewStyle properties
    container: {},
    track: {
        backgroundColor: contrast.lower,
    },
    trackDisabled: {
        backgroundColor: contrast.lower,
        opacity: Platform.select({ ios: 0.4 }),
    },
    highlight: {
        backgroundColor: brand.primary,
    },
    highlightDisabled: {
        backgroundColor: Platform.select({ ios: brand.primary, android: contrast.low }),
    },
    marker: {
        backgroundColor: background.secondary,
        ...Platform.select({
            ios: {
                marginTop: 1,
                shadowColor: '#666',
                shadowOpacity: 0.2,
                borderColor: contrast.lowest,
                shadowOffset: { width: 0, height: 1 },
            },
            android: {
                marginTop: 2,
                elevation: 3,
                borderColor: border.color,
                transform: [{ scale: 1.75 }],
            },
        }),
    },
    markerDisabled: {
        ...Platform.select({
            ios: {
                marginTop: 1,
                shadowOpacity: 0.2,
                borderColor: contrast.lowest,
                shadowOffset: { width: 0, height: 1 },
                backgroundColor: background.secondary,
            },
            android: {
                marginTop: 2,
                borderWidth: 3,
                transform: [{ scale: 1.5 }],
                borderColor: background.primary,
                backgroundColor: contrast.low,
            },
        }),
    },
    markerActive: {
        ...Platform.select({
            android: {
                borderWidth: 0,
                transform: [{ scale: 2 }],
            },
        }),
    },
});

//== Design Properties
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Slider Color

export const sliderSuccess = {
    highlight: {
        backgroundColor: brand.success,
    },
    highlightDisabled: {
        backgroundColor: Platform.select({ ios: brand.success, android: contrast.low }),
    },
};
export const sliderWarning = {
    highlight: {
        backgroundColor: brand.warning,
    },
    highlightDisabled: {
        backgroundColor: Platform.select({ ios: brand.warning, android: contrast.low }),
    },
};
export const sliderDanger = {
    highlight: {
        backgroundColor: brand.danger,
    },
    highlightDisabled: {
        backgroundColor: Platform.select({ ios: brand.danger, android: contrast.low }),
    },
};
