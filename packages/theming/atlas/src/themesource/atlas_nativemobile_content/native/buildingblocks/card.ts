import { Platform } from "react-native";
import { background, border, contrast, spacing } from "../../../atlas_core/native/variables";
/*
==========================================================================
    Cards

==========================================================================
*/
export const cardShadow = {
    elevation: 1.5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
        width: 0,
        height: 2
    }
};
export const card = {
    container: {
        borderRadius: border.radiusLarge,
        backgroundColor: background.primary,
        ...Platform.select({
            android: {
                borderWidth: 1,
                borderColor: contrast.lowest
            }
        }),
        ...cardShadow
    }
};
//
// == Elements
// -------------------------------------------------------------------------------------------------------------------//
export const cardImage = {
    container: {
        overflow: "hidden",
        borderTopLeftRadius: border.radiusLarge,
        borderTopRightRadius: border.radiusLarge
    },
    image: {
        width: "100%",
        height: 128,
        resizeMode: "cover"
    }
};
export const cardImageBackground = {
    container: {
        ...cardImage.container,
        borderBottomLeftRadius: border.radiusLarge,
        borderBottomRightRadius: border.radiusLarge,
        height: 224
    },
    image: {
        width: "100%",
        resizeMode: "cover"
    }
};
//
// == Variations
// -------------------------------------------------------------------------------------------------------------------//
// Card Action
export const cardAction = {
    container: {
        maxWidth: "100%",
        height: 104,
        borderWidth: border.width,
        borderColor: border.color,
        borderRadius: border.radiusLarge,
        padding: spacing.regular,
        ...cardShadow
    }
};

export const cardActionImage = {
    image: {
        maxHeight: 70,
        resizeMode: "contain"
    }
};
//
// -------------------------------------------------------------------------------------------------------------------//
// Card Payment
export const cardPaymentImage = {
    container: {
        flex: -1,
        maxHeight: 250
    },
    image: {
        width: "100%",
        maxHeight: 250,
        resizeMode: "contain"
    }
};
