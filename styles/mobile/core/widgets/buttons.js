import { Platform } from 'react-native';
import { button, spacing, font, gray } from '../variables';
import { merge } from '../variables-helpers';

/* ==========================================================================
    Buttons

    Default Class For Mendix Button Widget
========================================================================== */
export const ActionButton = {
    button: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: button.primary.borderColor,
        backgroundColor: button.primary.background,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: button.borderRadius,
        ...Platform.select({
            ios: {
                paddingVertical: spacing.smaller,
                paddingHorizontal: spacing.regular,
            },
            android: {
                paddingVertical: spacing.smaller,
                paddingHorizontal: spacing.small,
            },
        }),
    },
    icon: {
        color: button.primary.color,
    },
    caption: {
        textAlign: 'center',
        color: button.primary.color,
    },
};

//== Design Properties
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Button Colors

export const btnSecondary = {
    button: {
        borderColor: button.secondary.borderColor,
        backgroundColor: button.secondary.background,
    },
    icon: {
        color: button.secondary.color,
    },
    caption: {
        color: button.secondary.color,
    },
};
export const btnSuccess = {
    button: {
        borderColor: button.success.borderColor,
        backgroundColor: button.success.background,
    },
    icon: {
        color: button.success.color,
    },
    caption: {
        color: button.success.color,
    },
};
export const btnWarning = {
    button: {
        borderColor: button.warning.borderColor,
        backgroundColor: button.warning.background,
    },
    icon: {
        color: button.warning.color,
    },
    caption: {
        color: button.warning.color,
    },
};
export const btnDanger = {
    button: {
        borderColor: button.danger.borderColor,
        backgroundColor: button.danger.background,
    },
    icon: {
        color: button.danger.color,
    },
    caption: {
        color: button.danger.color,
    },
};

// Button Icon Only
export const btnIconPrimary = {
    button: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        padding: 0,
        paddingVertical: 0, // FIXME: Should not be needed
        paddingHorizontal: 0, // FIXME: Should not be needed
        paddingTop: 0, // FIXME: Should not be needed
        paddingLeft: 0, // FIXME: Should not be needed
        paddingRight: 0, // FIXME: Should not be needed
        paddingBottom: 0, // FIXME: Should not be needed
    },
    icon: {
        color: button.primary.background,
    },
    caption: {
        fontSize: 0,
    },
};
export const btnIconSecondary = merge(btnIconPrimary, {
    icon: {
        color: gray.light,
    },
});
export const btnIconSuccess = merge(btnIconPrimary, {
    icon: {
        color: button.success.background,
    },
});
export const btnIconWarning = merge(btnIconPrimary, {
    icon: {
        color: button.warning.background,
    },
});
export const btnIconDanger = merge(btnIconPrimary, {
    icon: {
        color: button.danger.background,
    },
});

// Button sizes
export const btnSmall = {
    icon: {
        size: font.sizeSmall,
    },
    caption: {
        fontSize: font.sizeSmall,
    },
};
export const btnLarge = {
    icon: {
        size: font.sizeLarge,
    },
    caption: {
        fontSize: font.sizeLarge,
    },
};

export const btnBlock = {
    button: {
        width: '100%',
    },
};
