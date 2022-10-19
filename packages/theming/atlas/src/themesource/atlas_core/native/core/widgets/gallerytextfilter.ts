import { GalleryTextFilterType } from "../../types/widgets";
import { brand, input, spacing } from "../../variables";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Gallery text filter

    Default Class For Mendix Gallery Text Filter Widget
========================================================================== */
export const com_mendix_widget_native_gallerytextfilter_GalleryTextFilter: Required<GalleryTextFilterType> = {
    container: {
        // All ViewStyle properties are allowed
    },
    textInputContainer: {
        // All ViewStyle properties are allowed
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: input.input.borderWidth,
        borderColor: input.input.borderColor,
        borderRadius: input.input.borderRadius,
        paddingEnd: spacing.small
    },
    textInputContainerFocused: {
        // All ViewStyle properties are allowed
        borderColor: brand.primary
    },
    textInput: {
        // All TextStyle properties are allowed
        height: 40,
        marginStart: spacing.regular,
        width: "90%",
        color: input.input.color,
        backgroundColor: input.input.backgroundColor,
        selectionColor: input.input.selectionColor,
        placeholderTextColor: input.input.placeholderTextColor
    },
    textInputClearIcon: {
        // All ViewStyle properties are allowed
        justifyContent: "center",
        alignContent: "center"
    }
};
