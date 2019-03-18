import { brand, button, gray } from '../variables';
import { merge } from '../variables-helpers';

// com_mendix_widget_native_Badge
export const BadgeDefault = {
    container: {
        // All ViewStyle properties are allowed
        backgroundColor: '#ccc',
    },
    text: {
        // All TextStyle properties are allowed
        fontSize: 14,
        color: '#444',
    },
};

export const badgePrimary = merge(BadgeDefault, {
    container: {
        // All ViewStyle properties are allowed
        backgroundColor: button.primary.backgroundColor,
    },
    text: {
        // All TextStyle properties are allowed
        color: button.primary.color,
    },
});
export const badgeSuccess = merge(BadgeDefault, {
    container: {
        backgroundColor: button.success.backgroundColor,
    },
    text: {
        color: button.success.color,
    },
});
export const badgeWarning = merge(BadgeDefault, {
    container: {
        backgroundColor: button.warning.backgroundColor,
    },
    text: {
        color: button.warning.color,
    },
});
export const badgeDanger = merge(BadgeDefault, {
    container: {
        backgroundColor: button.danger.backgroundColor,
    },
    text: {
        color: button.danger.color,
    },
});
