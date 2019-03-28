import { brand, font } from '../variables';

/* ==========================================================================
    Progress Circle

    Default Class For Mendix Progress Circle Widget
========================================================================== */

export const com_mendix_widget_native_progresscircle_ProgressCircle = (ProgressCircle = {
    container: {
        // All ViewStyle properties are allowed
    },
    circle: {
        //Just allow these 3 properties
        borderWidth: 0,
    },
    fill: {
        //Just allow these 2 properties
        backgroundColor: brand.primary,
        width: 5, // (Thickness),
        roundedBorder: true,
    },
    text: {
        //FIXME: Text is not centered in circle when container is bigger than circle
        // All TextStyle properties are allowed
        color: brand.primary,
        fontSize: font.sizeLarge,
    },
});

//== Design Properties
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Progress Circle Color

export const progressCircleSuccess = {
    fill: {
        backgroundColor: brand.success,
    },
    text: {
        color: brand.success,
    },
};

export const progressCircleWarning = {
    fill: {
        backgroundColor: brand.warning,
    },
    text: {
        color: brand.warning,
    },
};

export const progressCircleDanger = {
    fill: {
        backgroundColor: brand.danger,
    },
    text: {
        color: brand.danger,
    },
};
