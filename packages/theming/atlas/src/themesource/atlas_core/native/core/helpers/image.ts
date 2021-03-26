import { ImageType } from "../../types/widgets";
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
export const imageOverlay: ImageType = {
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
export const imageSquare: ImageType = {
    image: {
        width: "100%",
        height: "auto",
        aspectRatio: 1,
        borderRadius: border.radiusSmall
    }
};
export const imageCircle: ImageType = {
    image: {
        width: "100%",
        height: "auto",
        aspectRatio: 1,
        borderRadius: 50000
    }
};
// Image Sizes
export const imageIcon: ImageType = {
    image: {
        maxWidth: image.icon,
        maxHeight: image.icon
    },
    container: {
        maxWidth: image.icon,
        maxHeight: image.icon
    }
};
export const imageSmall: ImageType = {
    image: {
        maxWidth: image.image.small,
        maxHeight: image.image.small
    },
    container: {
        maxWidth: image.image.small,
        maxHeight: image.image.small
    }
};
export const imageMedium: ImageType = {
    image: {
        maxWidth: image.image.medium,
        maxHeight: image.image.medium
    },
    container: {
        maxWidth: image.image.medium,
        maxHeight: image.image.medium
    }
};
export const imageLarge: ImageType = {
    image: {
        maxWidth: image.image.large,
        maxHeight: image.image.large
    },
    container: {
        maxWidth: image.image.large,
        maxHeight: image.image.large
    }
};
export const imageLarger: ImageType = {
    image: {
        maxWidth: image.image.larger,
        maxHeight: image.image.larger
    },
    container: {
        maxWidth: image.image.larger,
        maxHeight: image.image.larger
    }
};
export const imageFullSize: ImageType = {
    image: {
        maxWidth: "100%",
        maxHeight: "auto"
    }
};
//
// Image / SVG Styles
export const imageIconPrimary: ImageType = {
    image: {
        fill: brand.primary,
        color: brand.primary
    }
};
export const imageIconSecondary: ImageType = {
    image: {
        fill: contrast.low,
        color: contrast.low
    }
};
export const imageIconSuccess: ImageType = {
    image: {
        fill: brand.success,
        color: brand.success
    }
};
export const imageIconWarning: ImageType = {
    image: {
        fill: brand.warning,
        color: brand.warning
    }
};
export const imageIconDanger: ImageType = {
    image: {
        fill: brand.danger,
        color: brand.danger
    }
};
export const imageIconInfo: ImageType = {
    image: {
        fill: brand.info,
        color: brand.info
    }
};

// Image resize modes
export const imageResizeModeContain: ImageType = {
    image: {
        resizeMode: "contain"
    }
};
export const imageResizeModeStretch: ImageType = {
    image: {
        resizeMode: "stretch"
    }
};
export const imageResizeModeRepeat: ImageType = {
    image: {
        resizeMode: "repeat"
    }
};
export const imageResizeModeCenter: ImageType = {
    image: {
        resizeMode: "center"
    }
};
