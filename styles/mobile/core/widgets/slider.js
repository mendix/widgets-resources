import { contrast, brand, background, border } from '../variables';
import merge from '../_helperfunctions/mergeobjects';
import { Platform } from 'react-native';

export const com_mendix_widget_native_slider_Slider = (Slider = {
    // All these properties allow ViewStyle properties
    container: {},
    track: {
        backgroundColor: contrast.lower,
    },
    trackDisabled: {
        backgroundColor: contrast.lower,
        opacity: Platform.select({ ios: 0.4 }), //TODO: Check for merge => platform bug
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
            //TODO: Check for merge => platform bug
            android: {
                borderWidth: 0,
                transform: [{ scale: 2 }],
            },
        }),
    },
});

export const sliderSuccess = merge(Slider, {
    highlight: {
        backgroundColor: brand.success,
    },
});
export const sliderWarning = merge(Slider, {
    highlight: {
        backgroundColor: brand.warning,
    },
});
export const sliderDanger = merge(Slider, {
    highlight: {
        backgroundColor: brand.danger,
    },
});
