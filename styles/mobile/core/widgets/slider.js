import { gray, brand, background } from '../variables';
import { merge } from '../variables-helpers';
import { Platform } from 'react-native';

const blue = 'rgb(0,122,255)';
const blueLighter = 'rgba(0,122,255,0.3)';
const blueLightest = 'rgba(0, 122, 255, 0.1)';

export const SliderDefault = {
    // All these properties allow ViewStyle properties
    container: {},
    track: {
        height: Platform.select({ ios: 2, android: 3 }),
        backgroundColor: blueLighter,
    },
    trackDisabled: {
        ...Platform.select({
            ios: {
                opacity: 0.4,
                backgroundColor: blueLighter,
            },
            android: {
                height: 3,
                backgroundColor: gray.lightest,
            },
        }),
    },
    highlight: {
        backgroundColor: blue,
    },
    highlightDisabled: {
        backgroundColor: Platform.select({
            ios: blue,
            android: gray.lightest,
        }),
    },
    marker: {
        ...Platform.select({
            ios: {
                marginTop: 1,
            },
            android: {
                marginTop: 2,
                borderColor: blue,
                backgroundColor: blue,
                transform: [{ scale: 1.75 }],
            },
        }),
    },
    markerDisabled: {
        ...Platform.select({
            ios: {
                marginTop: 1,
                backgroundColor: '#FFF',
                shadowOpacity: 0.1,
                borderColor: 'rgba(221,221,221,0.6)',
            },
            android: {
                elevation: 0,
                marginTop: 2,
                backgroundColor: gray.light,
                transform: [{ scale: 1.25 }],
            },
        }),
    },
    markerOnPress: {
        ...Platform.select({
            //TODO: Check for merge => platform bug
            android: {
                borderWidth: 5,
                borderColor: blueLightest,
                transform: [{ scale: 2 }],
            },
        }),
    },
};

// com_mendix_widget_native_Slider
export const Slider = merge(SliderDefault, {
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
                shadowColor: '#666',
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 1 },
                backgroundColor: background.primary,
            },
            android: {
                elevation: 3,
                backgroundColor: background.secondary,
            },
        }),
    },
    markerDisabled: {
        ...Platform.select({
            ios: {
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 1 },
            },
            android: {
                borderWidth: 3,
                borderColor: '#FFF',
                backgroundColor: gray.light,
                transform: [{ scale: 1.5 }],
            },
        }),
    },
    markerOnPress: {},
});

export const SliderSuccess = merge(Slider, {
    highlight: {
        backgroundColor: brand.success,
    },
});
export const SliderWarning = merge(Slider, {
    highlight: {
        backgroundColor: brand.warning,
    },
});
export const SliderDanger = merge(Slider, {
    highlight: {
        backgroundColor: brand.danger,
    },
});
