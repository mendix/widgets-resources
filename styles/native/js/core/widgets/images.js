import { contrast } from "../variables";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Image

    Default Class For Mendix Image Widgets
========================================================================== */
export const Image = {
    container: {
        // RippleColor & All ViewStyle properties are allowed
        rippleColor: contrast.lowest,
    },
    image: {
        // All ImageStyle properties are allowed
        maxWidth: "100%",
        maxHeight: "100%",
        resizeMode: "cover",
    },
};
export const ImageViewer = {
    container: {
        // RippleColor & All ViewStyle properties are allowed
        rippleColor: contrast.lowest,
    },
    image: {
        // All ImageStyle properties are allowed
        maxWidth: "100%",
        maxHeight: "100%",
        resizeMode: "cover",
    },
};
