import { border, brand, contrast, image } from "../variables";
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
// == Extra Classes
// ## Helper classes to change the look and feel of the widget
// -------------------------------------------------------------------------------------------------------------------//
// Image Overlay
export const imageOverlay = {
    container: {
        zIndex: 10,
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.4)"
    }
};
//
// Image Sizes
export const imageSquare = {
    image: {
        width: "100%",
        height: "auto",
        aspectRatio: 1,
        borderRadius: border.radiusSmall
    }
};
export const imageSquareSmall = {
    image: {
        aspectRatio: 1,
        width: image.image.small,
        height: image.image.small,
        borderRadius: border.radiusSmall
    }
};
export const imageSquareMedium = {
    image: {
        aspectRatio: 1,
        width: image.image.medium,
        height: image.image.medium,
        borderRadius: border.radiusSmall
    }
};
export const imageSquareLarge = {
    image: {
        aspectRatio: 1,
        width: image.image.large,
        height: image.image.large,
        borderRadius: border.radiusSmall
    }
};
export const imageSquareLarger = {
    image: {
        aspectRatio: 1,
        width: image.image.larger,
        height: image.image.larger,
        borderRadius: border.radiusSmall
    }
};
export const imageCircleSmall = {
    image: {
        width: image.image.small,
        height: image.image.small,
        borderRadius: image.image.small / 2
    }
};
export const imageCircleMedium = {
    image: {
        width: image.image.medium,
        height: image.image.medium,
        borderRadius: image.image.medium / 2
    }
};
export const imageCircleLarge = {
    image: {
        width: image.image.large,
        height: image.image.large,
        borderRadius: image.image.large / 2
    }
};
export const imageCircleLarger = {
    image: {
        width: image.image.larger,
        height: image.image.larger,
        borderRadius: image.image.larger / 2
    }
};
export const imageIcon = {
    image: {
        width: image.icon,
        height: image.icon,
        tintColor: "blue"
    }
};
//
// Image / SVG Styles
export const imageIconPrimary = {
    image: {
        fill: brand.primary,
        color: brand.primary
    }
};
export const imageIconSecondary = {
    image: {
        fill: contrast.low,
        color: contrast.low
    }
};
export const imageIconSuccess = {
    image: {
        fill: brand.success,
        color: brand.success
    }
};
export const imageIconWarning = {
    image: {
        fill: brand.warning,
        color: brand.warning
    }
};
export const imageIconDanger = {
    image: {
        fill: brand.danger,
        color: brand.danger
    }
};
export const imageIconInfo = {
    image: {
        fill: brand.info,
        color: brand.info
    }
};
