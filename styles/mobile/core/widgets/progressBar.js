import { brand } from '../variables';
import { merge, hexToRGBString } from '../variables-helpers';
import { Platform } from 'react-native';

export const ProgressBar = {
    bar: {
        // All ViewStyle properties are allowed
        ...Platform.select({
            ios: {
                borderColor: brand.primary,
            },
            android: {
                borderRadius: 0,
                borderWidth: 0,
                backgroundColor: `rgba(${hexToRGBString(brand.primary)},0.2)`,
            },
        }),
    },
    fill: {
        //Just allow this property
        backgroundColor: brand.primary,
    },
};

export const progressBarSuccess = merge(ProgressBar, {
    bar: {
        borderColor: Platform.select({ ios: brand.success }), //TODO: Check for merge => platform bug
        backgroundColor: Platform.select({ android: `rgba(${hexToRGBString(brand.success)},0.2)` }),
    },
    fill: {
        backgroundColor: brand.success,
    },
});

export const progressBarDanger = merge(ProgressBar, {
    bar: {
        borderColor: Platform.select({ ios: brand.danger }), //TODO: Check for merge => platform bug
        backgroundColor: Platform.select({ android: `rgba(${hexToRGBString(brand.danger)},0.2)` }),
    },
    fill: {
        backgroundColor: brand.danger,
    },
});
