import { Platform } from "react-native";
import { background, border, contrast, spacing } from "../../../core/variables";
/*
==========================================================================
    Cards

==========================================================================
*/
export const header = {
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
    },
};
//
//== Elements
//-------------------------------------------------------------------------------------------------------------------//
export const headerImageFull = {
    container: {
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
    },
};
export const headerImageOverlay = {
    container: {
        zIndex: 10,
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
};
export const headerBody = {
    container: {
        bottom: 0,
        zIndex: 11,
        width: "100%",
        position: "absolute",
        backgroundColor: "transparent",
    },
};
//
//== Variations
//-------------------------------------------------------------------------------------------------------------------//
