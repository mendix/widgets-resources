import { shadeBlendConvert }                 from "../helpers/_functions/shadeblendconvert.js";
import { background, brand, contrast, font } from "../variables.js";

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
    container: {
        // All ViewStyle properties are allowed
    },
    carousel: {
        // All ViewStyle properties are allowed, with the exception that width and height should be a number
    },
    slideItem: {
        // Only opacity and scale are allowed
        opacity: .8,
    },
    activeSlideItem: {
        // All ViewStyle properties are allowed
    },
    paginationContainer: {
        // All ViewStyle properties are allowed
        position: "absolute",
        bottom: 0,
        width: "100%",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingVertical: undefined,
    },
    paginationText: {
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
    dotStyle: {
        // Only opacity, scale and color are allowed
        color: "rgba(255, 255, 255, 0.45)",
        scale: 1,
    },
    activeDotStyle: {
        // Opacity, scale, color and all ViewStyle properties are allowed
        color: "#FFF",
    },
};

const carouselCardLayout = {
    container: {
        // All ViewStyle properties are allowed
    },
    carousel: {
        // All ViewStyle properties are allowed, with the exception that width and height should be a number
    },
    slideItem: {
        // Only opacity and scale are allowed
        opacity: .8,
    },
    activeSlideItem: {
        // All ViewStyle properties are allowed
        paddingBottom: 20,
        elevation: 1.5,
        shadowColor: shadeBlendConvert(-0.5, background.primary),
        shadowOpacity: 0.7,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    paginationContainer: {
        // All ViewStyle properties are allowed
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingVertical: undefined,

    },
    paginationText: {
        // All TextStyle properties are allowed
        color: font.color,
        fontSize: font.size,
        fontFamily: font.family,
        textAlign: "center",
    },
    dotStyle: {
        // Only opacity, scale and color are allowed
        color: contrast.low,
        scale: 1,
    },
    activeDotStyle: {
        // Opacity, scale, color and all ViewStyle properties are allowed
        color: brand.primary,
    },
};

export const com_mendix_widget_native_nativecarousel_NativeCarousel = {
    fullWidthLayout: carouselFullWidthLayout,
    cardLayout: carouselCardLayout,
};
