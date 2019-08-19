import { Platform }                              from "react-native";
import { background, border, contrast, spacing } from "../../../core/variables";

/* ==========================================================================
    Cards

========================================================================== */

export const cardShadow = {
    container: {
        elevation: 1.5,
        shadowColor: contrast.lower,
        shadowOpacity: 0.7,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
};

export const card = {
    container: {
        borderRadius: border.radius,
        backgroundColor: background.primary,
        marginBottom: spacing.regular,

        ...Platform.select({
            android: {
                borderWidth: 1,
                borderColor: contrast.lowest,
            },
        }),
        ...cardShadow.container,
    },
};

//== Elements
//-------------------------------------------------------------------------------------------------------------------//

//== Variations
//-------------------------------------------------------------------------------------------------------------------//
// Card Action
export const cardAction = {
    container: {
        flex: 1,
        flexBasis: "40%",
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: border.color,
        borderRadius: border.radius,
        padding: spacing.regular,
    },
};

export const cardActionImage = {
    image: {
        maxHeight: 70,
        resizeMode: "contain",
    },
};

//-------------------------------------------------------------------------------------------------------------------//
// Card Product
export const cardProductImage = {
    container: {
        overflow: "hidden",
        borderTopLeftRadius: border.radius,
        borderTopRightRadius: border.radius,
    },
    image: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
    },
};
export const cardProductImageFull = {
    container: {
        ...cardProductImage.container,
        borderBottomLeftRadius: border.radius,
        borderBottomRightRadius: border.radius,
    },
    image: cardProductImage.image,
};

export const cardProductBody = {
    container: {
        position: "absolute",
        end: 0,
        start: 0,
        bottom: 0,
        backgroundColor: "transparent",
    },
};

export const cardRating = {
    container: {
        flexShrink: 1,
        justifyContent: "flex-start",
    },
    icon: {
        size: 18,
    },
};

//-------------------------------------------------------------------------------------------------------------------//
// Card Payment
export const cardPaymentImage = {
    container: {
        flex: -1,
        maxHeight: 250,
    },
    image: {
        width: "100%",
        maxHeight: 250,
        resizeMode: "contain",
    },
};
