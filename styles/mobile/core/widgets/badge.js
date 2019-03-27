import { button, contrast } from '../variables';
import merge from '../_helperfunctions/mergeobjects';

export const com_mendix_widget_native_badge_Badge = (Badge = {
    container: {
        // All ViewStyle properties are allowed
        backgroundColor: contrast.lower,
    },
    text: {
        // All TextStyle properties are allowed
        color: contrast.higher,
    },
});

//== Design Properties
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Badge Colors

export const badgePrimary = merge(Badge, {
    container: {
        backgroundColor: button.primary.backgroundColor,
    },
    text: {
        color: button.primary.color,
    },
});
export const badgeSuccess = merge(Badge, {
    container: {
        backgroundColor: button.success.backgroundColor,
    },
    text: {
        color: button.success.color,
    },
});
export const badgeWarning = merge(Badge, {
    container: {
        backgroundColor: button.warning.backgroundColor,
    },
    text: {
        color: button.warning.color,
    },
});
export const badgeDanger = merge(Badge, {
    container: {
        backgroundColor: button.danger.backgroundColor,
    },
    text: {
        color: button.danger.color,
    },
});
