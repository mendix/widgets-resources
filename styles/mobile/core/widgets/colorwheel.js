import { background } from '../variables';
import { merge } from '../variables-helpers';

// com_mendix_widget_native_ColorWheel
export const ColorWheelDefault = {
    container: {
        // All ViewStyle properties are allowed
        width: 300,
        height: 300,
    },
    thumbnail: {
        // All ViewStyle properties are allowed
        borderColor: '#FFF',
        borderWidth: 5,
    },
};
export const ColorWheel = merge(ColorWheelDefault, {
    container: {
        // All ViewStyle properties are allowed
    },
    thumbnail: {
        // All ViewStyle properties are allowed
    },
});
