import { button } from '../variables';
import { merge } from '../variables-helpers';

export const badgePrimary = {
    container: {
        // All ViewStyle properties are allowed
        backgroundColor: button.primary.backgroundColor,
    },
    text: {
        // All TextStyle properties are allowed
        color: button.primary.color,
    },
};
export const badgeSuccess = merge(badgePrimary, {
    container: {
        backgroundColor: button.success.backgroundColor,
    },
    text: {
        color: button.success.color,
    },
});
export const badgeWarning = merge(badgePrimary, {
    container: {
        backgroundColor: button.warning.backgroundColor,
    },
    text: {
        color: button.warning.color,
    },
});
export const badgeDanger = merge(badgePrimary, {
    container: {
        backgroundColor: button.danger.backgroundColor,
    },
    text: {
        color: button.danger.color,
    },
});
