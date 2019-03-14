import { brand, button, gray } from '../variables';
import { merge } from '../variables-helpers';

// com_mendix_widget_native_Badge
export const BadgeDefault = {
    container: {
        // All ViewStyle properties are allowed
        backgroundColor: gray.lighter,
    },
    text: {
        // All TextStyle properties are allowed
        fontSize: button.fontSize,
        color: gray.darker,
    },
};
export const badgePrimary = merge(BadgeDefault, {
    container: {
        // All ViewStyle properties are allowed
        backgroundColor: button.primary.background,
    },
    text: {
        // All TextStyle properties are allowed
        color: button.primary.color,
    },
});
export const badgeSuccess = merge(BadgeDefault, {
    container: {
        backgroundColor: button.success.background,
    },
    text: {
        color: button.success.color,
    },
});
export const badgeWarning = merge(BadgeDefault, {
    container: {
        backgroundColor: button.warning.background,
    },
    text: {
        color: button.warning.color,
    },
});
export const badgeDanger = merge(BadgeDefault, {
    container: {
        backgroundColor: button.danger.background,
    },
    text: {
        color: button.danger.color,
    },
});
