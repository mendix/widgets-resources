import { gray, brand, background } from '../variables';
import { merge } from '../variables-helpers';
import { Platform } from 'react-native';

const blue = 'rgb(0,122,255)';
const blueLighter = 'rgba(0,122,255,0.3)';
const blueLightest = 'rgba(0, 122, 255, 0.1)';

const purple = 'rgb(98,0,238)';
const purpleLighter = 'rgba(98,0,238, 0.3)';
const purpleLightest = 'rgba(98,0,238, 0.1)';
export const RangeSliderDefault = {
    // All these properties allow ViewStyle properties
    container: {},
    track: {
        backgroundColor: Platform.select({ ios: blueLighter, android: purpleLighter }),
    },
    trackDisabled: {
        ...Platform.select({
            ios: {
                opacity: 0.4,
                backgroundColor: blueLighter,
            },
            android: {
                backgroundColor: '#EEE',
            },
        }),
    },
    highlight: {
        backgroundColor: Platform.select({ ios: blue, android: purple }),
    },
    highlightDisabled: {
        backgroundColor: Platform.select({
            ios: blue,
            android: '#AAA',
        }),
    },
    marker: {
        ...Platform.select({
            ios: {},
            android: {
                borderColor: purple,
                backgroundColor: purple,
            },
        }),
    },
    markerDisabled: {
        ...Platform.select({
            ios: {
                backgroundColor: '#FFF',
                shadowOpacity: 0.1,
                borderColor: 'rgba(221,221,221,0.6)',
            },
            android: {
                elevation: 0,
                backgroundColor: '#AAA',
            },
        }),
    },
    markerOnPress: {
        ...Platform.select({
            android: {
                borderWidth: 5,
                borderColor: purpleLightest,
                transform: [{ scale: 2 }],
            },
        }),
    },
};

// com_mendix_widget_native_RangeSlider
export const RangeSlider = merge(RangeSliderDefault, {
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
                transform: [{ scale: 1.75 }],
                backgroundColor: background.secondary,
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
    markerOnPress: {
        ...Platform.select({
            android: {
                //TODO: Check for merge => platform bug
                transform: [{ scale: 2 }],
            },
        }),
    },
});

export const rangeSliderSuccess = merge(RangeSlider, {
    highlight: {
        backgroundColor: brand.success,
    },
});

export const rangeSliderWarning = merge(RangeSlider, {
    highlight: {
        backgroundColor: brand.warning,
    },
});
export const rangeSliderDanger = merge(RangeSlider, {
    highlight: {
        backgroundColor: brand.danger,
    },
});
