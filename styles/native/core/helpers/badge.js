import { button } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Badge

//== Design Properties
//## Helper classes to change the look and feel of the widget
========================================================================== */
// Badge Colors
export const badgePrimary = {
    container: {
        backgroundColor: button.primary.backgroundColor,
    },
    caption: {
        color: button.primary.color,
    },
};
export const badgeSuccess = {
    container: {
        backgroundColor: button.success.backgroundColor,
    },
    caption: {
        color: button.success.color,
    },
};
export const badgeWarning = {
    container: {
        backgroundColor: button.warning.backgroundColor,
    },
    caption: {
        color: button.warning.color,
    },
};
export const badgeDanger = {
    container: {
        backgroundColor: button.danger.backgroundColor,
    },
    caption: {
        color: button.danger.color,
    },
};
