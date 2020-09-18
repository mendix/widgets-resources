import { listView } from "../variables";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    List View

//== Design Properties
//## Helper classes to change the look and feel of the widget
========================================================================== */
// List item dividers
export const listItemBorderBottom = {
    listItem: {
        borderColor: listView.border.color,
        borderBottomWidth: listView.border.width,
    },
};
export const listItemBorderRight = {
    listItem: {
        borderColor: listView.border.color,
        borderRightWidth: listView.border.width,
    },
};
//
//== Extra Classes
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
export const listItemIconSmall = {
    icon: {
        size: 16,
    },
};
export const listItemIconLarge = {
    icon: {
        size: 24,
    },
};
