import { gray, brand, background } from '../variables';
import { merge } from '../variables-helpers';
import { Platform } from 'react-native';

export const Slider = {
    // All these properties allow ViewStyle properties
    container: {},
    track: {
        backgroundColor: gray.lighter,
    },
    trackDisabled: {
        backgroundColor: gray.lighter,
        opacity: Platform.select({ ios: 0.4 }), //TODO: Check for merge => platform bug
    },
    highlight: {
        backgroundColor: brand.primary,
    },
    highlightDisabled: {
        backgroundColor: Platform.select({ ios: brand.primary, android: gray.light }),
    },
    marker: {
        ...Platform.select({
            ios: {
                marginTop: 1,
                shadowColor: '#666',
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 1 },
                backgroundColor: background.primary,
            },
            android: {
                marginTop: 2,
                elevation: 3,
                backgroundColor: background.secondary,
                transform: [{ scale: 1.75 }],
            },
        }),
    },
    markerDisabled: {
        ...Platform.select({
            ios: {
                marginTop: 1,
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 1 },
            },
            android: {
                marginTop: 2,
                borderWidth: 3,
                borderColor: '#FFF',
                backgroundColor: gray.light,
                transform: [{ scale: 1.5 }],
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
};

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
