import { brand, contrast } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Progress Circle

//== Design Properties
//## Helper classes to change the look and feel of the widget
========================================================================== */
// Progress Circle Color
export const progressCircleSuccess = {
    fill: {
        backgroundColor: brand.success,
    },
    text: {
        color: contrast.regular,
    },
};

export const progressCircleWarning = {
    fill: {
        backgroundColor: brand.warning,
    },
    text: {
        color: contrast.regular,
    },
};

export const progressCircleDanger = {
    fill: {
        backgroundColor: brand.danger,
    },
    text: {
        color: contrast.regular,
    },
};
