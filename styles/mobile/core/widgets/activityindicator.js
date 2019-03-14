import { brand } from '../variables';
import { merge } from '../variables-helpers';

export const ActivityIndicatorDefault = {
    container: {
        // All ViewStyle properties are allowed
    },
    indicator: {
        // Just this property
        color: '#444',
    },
};

// com.mendix.widget.native.ActivityIndicator
export const ActivityIndicator = merge(ActivityIndicatorDefault, {
    indicator: {
        // Just this property
        color: brand.primary,
    },
    container: {
        // All ViewStyle properties are allowed
    },
});
