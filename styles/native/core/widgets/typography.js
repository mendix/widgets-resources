import { font, spacing } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Text

    Default Class For Mendix Text Widget
========================================================================== */

export const Text = {
    container: {
        // All ViewStyle properties are allowed
    },
    text: {
        // All TextStyle properties are allowed
        color: font.color,
        fontSize: font.size,
        lineHeight: font.size + 2,
    },
};

export const TextHeading1 = {
    container: {
        marginBottom: spacing.small,
    },
    text: {
        fontWeight: font.weightSemiBold,
        fontSize: font.sizeH1,
        lineHeight: font.sizeH1,
    },
};
export const TextHeading2 = {
    container: {
        marginBottom: spacing.smaller,
    },
    text: {
        fontWeight: font.weightSemiBold,
        fontSize: font.sizeH2,
        lineHeight: font.sizeH2,
    },
};
export const TextHeading3 = {
    container: {
        marginBottom: spacing.smaller,
    },
    text: {
        fontWeight: font.weightSemiBold,
        fontSize: font.sizeH3,
        lineHeight: font.sizeH3,
    },
};
export const TextHeading4 = {
    container: {
        marginBottom: spacing.smallest,
    },
    text: {
        fontWeight: font.weightSemiBold,
        fontSize: font.sizeH4,
        lineHeight: font.sizeH4,
    },
};
export const TextHeading5 = {
    container: {
        marginBottom: spacing.smallest,
    },
    text: {
        fontWeight: font.weightSemiBold,
        fontSize: font.sizeH5,
        lineHeight: font.sizeH5,
    },
};
export const TextHeading6 = {
    container: {
        marginBottom: spacing.smallest,
    },
    text: {
        fontWeight: font.weightSemiBold,
        fontSize: font.sizeH6,
        lineHeight: font.sizeH6,
    },
};