import { border } from "../variables";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Image

//== Design Properties
//## Helper classes to change the look and feel of the widget
========================================================================== */
//
//
//== Extra Classes
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Image Sizes
export const thumbnail = {
    image: {
        width: "100%",
        height: "auto",
        aspectRatio: 1,
        borderRadius: border.radius,
    },
};
export const avatarSmall = {
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
};
export const avatarMedium = {
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
};
export const avatarLarge = {
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
};
export const inputIcon = {
    image: {
        width: 30,
        height: 30,
    },
};
