import { Platform } from "react-native";
import { background, border, contrast, spacing } from "../../../core/variables";
/*
==========================================================================
    Cards

==========================================================================
*/
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
        elevation: 1.5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
};
//
//== Elements
//-------------------------------------------------------------------------------------------------------------------//
export const cardImage = {
    container: {
        overflow: "hidden",
        borderTopLeftRadius: border.radius,
        borderTopRightRadius: border.radius,
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },
};
export const cardImageFull = {
    container: {
        ...cardImage.container,
        borderBottomLeftRadius: border.radius,
        borderBottomRightRadius: border.radius,
    },
    image: {
        width: "100%",
        height: 300,
        resizeMode: "cover",
    },
};
export const cardBody = {
    container: {
        position: "absolute",
        end: 0,
        start: 0,
        bottom: 0,
        backgroundColor: "transparent",
    },
};
//
//== Variations
//-------------------------------------------------------------------------------------------------------------------//
// Card Action
export const cardAction = {
    container: {
        maxWidth: "100%",
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: border.color,
        borderRadius: border.radius,
        padding: spacing.regular,
        alignItems: "center",
    },
};
export const cardActionImage = {
    image: {
        maxHeight: 70,
        resizeMode: "contain",
    },
};
//
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
