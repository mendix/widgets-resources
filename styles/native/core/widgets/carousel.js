import { shadeBlendConvert }                          from "../helpers/_functions/shadeblendconvert.js";
import { background, brand, contrast, font, spacing } from "../variables.js";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Button

    Default Class For Mendix Carousel Widget
========================================================================== */

// Card
const carouselFullWidthLayout = {
    slideItem: {
        // All ViewStyle properties are allowed
        height: 250,
    },
    inactiveSlideItem: {
        // Only opacity and scale are allowed
    },
    pagination: {
        container: {
            // All ViewStyle properties are allowed
            position: "absolute",
            bottom: 0,
            width: "100%",
            justifyContent: "center",
            paddingHorizontal: spacing.regular,
            paddingBottom: spacing.regular,
        },
        text: {
            // All TextStyle properties are allowed
            color: "#FFF",
            fontSize: font.size,
            fontFamily: font.family,
            textAlign: "center",
            textShadowColor: "#888",
            textShadowRadius: 3,
            textShadowOffset: {
                width: 0,
                height: 1,
            },
        },
        dotContainerStyle: {
            // All ViewStyle properties are allowed
            marginHorizontal: 3,
        },
        dotStyle: {
            // Color and all ViewStyle properties are allowed
            color: "#FFF",
        },
        inactiveDotStyle: {
            // Only opacity, scale and color are allowed
            color: "rgba(255, 255, 255, 0.45)",
            scale: 1,
        },
    },
};

const carouselCardLayout = {
    slideItem: {
        // All ViewStyle properties are allowed
        width: "70%",
        height: 250,
        padding: 8,
        paddingBottom: spacing.regular,
        elevation: 1.5,
        shadowColor: shadeBlendConvert(-0.5, background.primary),
        shadowOpacity: 0.6,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    inactiveSlideItem: {
        // Only opacity and scale are allowed
        opacity: .8,
    },
    pagination: {
        container: {
            // All ViewStyle properties are allowed
            paddingHorizontal: spacing.regular,
            paddingBottom: spacing.smaller,
        },
        text: {
            // All TextStyle properties are allowed
            color: font.color,
            fontSize: font.size,
            fontFamily: font.family,
            textAlign: "center",
        },
        dotContainerStyle: {
            // All ViewStyle properties are allowed
            marginHorizontal: 3,
        },
        dotStyle: {
            // Color and all ViewStyle properties are allowed
            color: brand.primary,
        },
        inactiveDotStyle: {
            // Only opacity, scale and color are allowed
            color: contrast.lower,
            scale: 1,
        },
    },
};


export const com_mendix_widget_native_carousel_Carousel = {
    container: {
        // All ViewStyle properties are allowed
    },
    fullWidthLayout: carouselFullWidthLayout,
    cardLayout: carouselCardLayout,
    activityIndicator: {
        // Only color is allowed
        color: font.color,
    },
};
