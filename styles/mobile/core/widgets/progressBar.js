import { brand } from '../variables';
import { hexToRGBString } from '../_helperfunctions/calculatecontrast';
import merge from '../_helperfunctions/mergeobjects';
import { Platform } from 'react-native';

/* ==========================================================================
    Progress Bar

    Default Class For Mendix Progress Bar Widget
========================================================================== */

export const com_mendix_widget_native_progressbar_ProgressBar = (ProgressBar = {
    container: {},
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
});

//== Design Properties
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Progress Bar Color

export const progressBarSuccess = merge(ProgressBar, {
    bar: {
        borderColor: Platform.select({ ios: brand.success }), //TODO: Check for merge => platform bug
        backgroundColor: Platform.select({ android: `rgba(${hexToRGBString(brand.success)},0.2)` }),
    },
    fill: {
        backgroundColor: brand.success,
    },
});

export const progressBarWarning = merge(ProgressBar, {
    bar: {
        borderColor: Platform.select({ ios: brand.warning }), //TODO: Check for merge => platform bug
        backgroundColor: Platform.select({ android: `rgba(${hexToRGBString(brand.warning)},0.2)` }),
    },
    fill: {
        backgroundColor: brand.warning,
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

// Progress Bar Size
export const progressBarSmall = merge(ProgressBar, {
    bar: {
        height: 3,
        borderRadius: 2,
    },
});
export const progressBarLarge = merge(ProgressBar, {
    bar: {
        height: 10,
        borderRadius: 8,
    },
});
