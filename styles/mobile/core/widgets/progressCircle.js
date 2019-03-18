import { brand, gray, font } from '../variables';
import { merge } from '../variables-helpers';
import { Platform } from 'react-native';

export const ProgressCircleDefault = {
    container: {
        // All ViewStyle properties are allowed
    },
    circle: {
        width: 100,
        borderColor: Platform.select({ android: 'rgb(98,0,238)' }),
    },
    fill: {
        //Just allow these 2 properties
        width: 3, // (Thickness),
        backgroundColor: Platform.select({ android: 'rgb(98,0,238)' }),
    },
    text: {
        // All TextStyle properties are allowed
        fontSize: 18,
        ...Platform.select({
            android: {
                color: 'rgb(98,0,238)',
            },
        }),
    },
};

// com_mendix_widget_native_ProgressCircle
export const ProgressCircle = merge(ProgressCircleDefault, {
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
