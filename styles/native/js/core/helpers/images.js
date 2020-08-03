import { border, image } from "../variables";
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
export const thumbnailSquare = {
    image: {
        width: "100%",
        height: "auto",
        aspectRatio: 1,
        borderRadius: border.radiusSmall,
    },
};
export const thumbnailCircleSmall = {
    image: {
        width: image.avatar.small,
        height: image.avatar.small,
        borderRadius: image.avatar.small / 2,
    },
};
export const thumbnailCircleMedium = {
    image: {
        width: image.avatar.medium,
        height: image.avatar.medium,
        borderRadius: image.avatar.medium / 2,
    },
};
export const thumbnailCircleLarge = {
    image: {
        width: image.avatar.large,
        height: image.avatar.large,
        borderRadius: image.avatar.large / 2,
    },
};
export const thumbnailCircleLarger = {
    image: {
        width: image.avatar.larger,
        height: image.avatar.larger,
        borderRadius: image.avatar.larger / 2,
    },
};
export const inputIcon = {
    image: {
        width: image.icon,
        height: image.icon,
    },
};
