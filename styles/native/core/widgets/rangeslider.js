import { contrast, brand, background, border } from '../variables';
import { Platform } from 'react-native';

/* ==========================================================================
    Range Slider

    Default Class For Mendix Range Slider Widget
========================================================================== */

export const com_mendix_widget_native_rangeslider_RangeSlider = (RangeSlider = {
    container: {
        // All ViewStyle properties are allowed
        alignSelf: 'stretch',
    },
    track: {
        // All ViewStyle properties are allowed
        backgroundColor: contrast.lower,
    },
    trackDisabled: {
        // All ViewStyle properties are allowed
        backgroundColor: contrast.lower,
        opacity: Platform.select({ ios: 0.4 }),
    },
    highlight: {
        // All ViewStyle properties are allowed
        backgroundColor: brand.primary,
    },
    highlightDisabled: {
        // All ViewStyle properties are allowed
        backgroundColor: Platform.select({ ios: brand.primary, android: contrast.low }),
    },
    marker: {
        // All ViewStyle properties are allowed
        backgroundColor: background.secondary,
        ...Platform.select({
            ios: {
                width: 30,
                height: 30,
                shadowColor: contrast.higher,
                shadowOpacity: 0.2,
                borderColor: contrast.lowest,
                shadowOffset: { width: 0, height: 1 },
            },
            android: {
                width: 20,
                height: 20,
                borderRadius: 10,
                elevation: 3,
                borderColor: border.color,
            },
        }),
    },
    markerDisabled: {
        // All ViewStyle properties are allowed
        ...Platform.select({
            ios: {
                borderColor: contrast.lowest,
                backgroundColor: background.secondary,
                shadowColor: contrast.higher,
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 1 },
            },
            android: {
                marginTop: 1,
                borderColor: background.primary,
                backgroundColor: contrast.low,
                borderWidth: 3,
                width: 14,
                height: 14,
                borderRadius: 7,
            },
        }),
    },
    markerActive: {
        // All ViewStyle properties are allowed
        ...Platform.select({
            android: {
                borderWidth: 0,
                width: 34,
                height: 34,
                borderRadius: 17,
            },
        }),
    },
});

//== Design Properties
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Range Slider Color

export const rangeSliderSuccess = {
    highlight: {
        backgroundColor: brand.success,
    },
    highlightDisabled: {
        backgroundColor: Platform.select({ ios: brand.success, android: contrast.low }),
    },
};
export const rangeSliderWarning = {
    highlight: {
        backgroundColor: brand.warning,
    },
    highlightDisabled: {
        backgroundColor: Platform.select({ ios: brand.warning, android: contrast.low }),
    },
};
export const rangeSliderDanger = {
    highlight: {
        backgroundColor: brand.danger,
    },
    highlightDisabled: {
        backgroundColor: Platform.select({ ios: brand.danger, android: contrast.low }),
    },
};
