import { border, brand, contrast, image } from "../../variables";
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
// Image Shapes
export const imageSquare = {
    image: {
        width: "100%",
        height: "auto",
        aspectRatio: 1,
        borderRadius: border.radiusSmall
    }
};
export const imageCircle = {
    image: {
        width: "100%",
        height: "auto",
        aspectRatio: 1,
        borderRadius: 50000
    }
};
// Image Sizes
export const imageIcon = {
    image: {
        maxWidth: image.icon,
        maxHeight: image.icon
    },
    container: {
        maxWidth: image.icon,
        maxHeight: image.icon
    }
};
export const imageSmall = {
    image: {
        maxWidth: image.image.small,
        maxHeight: image.image.small
    },
    container: {
        maxWidth: image.image.small,
        maxHeight: image.image.small
    }
};
export const imageMedium = {
    image: {
        maxWidth: image.image.medium,
        maxHeight: image.image.medium
    },
    container: {
        maxWidth: image.image.medium,
        maxHeight: image.image.medium
    }
};
export const imageLarge = {
    image: {
        maxWidth: image.image.large,
        maxHeight: image.image.large
    },
    container: {
        maxWidth: image.image.large,
        maxHeight: image.image.large
    }
};
export const imageLarger = {
    image: {
        maxWidth: image.image.larger,
        maxHeight: image.image.larger
    },
    container: {
        maxWidth: image.image.larger,
        maxHeight: image.image.larger
    }
};
export const imageFullSize = {
    image: {
        maxWidth: "100%",
        maxHeight: "auto"
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
