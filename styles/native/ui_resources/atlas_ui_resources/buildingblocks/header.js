import { Platform }                              from "react-native";
import { background, border, contrast, spacing } from "../../../core/variables";

/* ==========================================================================
    Cards

========================================================================== */

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

//== Elements
//-------------------------------------------------------------------------------------------------------------------//

export const headerImageFull = {
    container: {
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },
};

export const headerBody = {
    container: {
        position: "absolute",
        end: 0,
        start: 0,
        bottom: 0,
        backgroundColor: "transparent",
    },
};

//== Variations
//-------------------------------------------------------------------------------------------------------------------//

