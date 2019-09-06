import { listview } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    List View

//== Design Properties
//## Helper classes to change the look and feel of the widget
========================================================================== */
// List item dividers
export const listItemBorderBottom = {
    listItem: {
        borderColor: listview.border.color,
        borderBottomWidth: listview.border.width,
    },
};
export const listItemBorderRight = {
    listItem: {
        borderColor: listview.border.color,
        borderRightWidth: listview.border.width,
    },
};

//== Extra Classes
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//

export const listItemIconSmall = {
    icon: {
        size: 20,
    },
};
export const listItemIconBig = {
    icon: {
        size: 24,
    },
};
