import { brand, font } from '../variables';
import merge from '../_helperfunctions/mergeobjects';

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

export const progressCircleSuccess = merge(ProgressCircle, {
    fill: {
        backgroundColor: brand.success,
    },
    text: {
        color: brand.success,
    },
});

export const progressCircleDanger = merge(ProgressCircle, {
    fill: {
        backgroundColor: brand.danger,
    },
    text: {
        color: brand.danger,
    },
});
