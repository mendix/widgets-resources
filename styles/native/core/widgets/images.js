import { contrast } from '../variables';

/* ==========================================================================
    Image

    Default Class For Mendix Image Widgets
========================================================================== */

export const Image = {
    container: {
        // All ViewStyle properties are allowed
    },
    image: {
        // All ImageStyle properties are allowed
        resizeMode: 'cover',
    },
};

export const NativeDynamicImage = {
    container: {
        // All ViewStyle properties are allowed
    },
    image: {
        // All ImageStyle properties are allowed
        resizeMode: 'cover',
    },
};

//== Design Properties
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Image Sizes
export const avatarSmall = {
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
};
export const avatarLarge = {
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
};

//== Extra Classes
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
