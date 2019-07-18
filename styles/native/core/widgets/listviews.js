import { border } from '../variables';

/* ==========================================================================
    List View

    Default Class For Mendix List View Widget
========================================================================== */

export const ListView = {
    container: {
        // numColumns and all ViewStyle properties are allowed
    },
    listItem: {
        // All ViewStyle properties are allowed
    },
};

//== Design Properties
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// List item dividers

export const listItemBorderBottom = {
    listItem: {
        borderColor: border.color,
        borderBottomWidth: border.width,
    },
};
export const listItemBorderRight = {
    listItem: {
        borderColor: border.color,
        borderRightWidth: border.width,
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
