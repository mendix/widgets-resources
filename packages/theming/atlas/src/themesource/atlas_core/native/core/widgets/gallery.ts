import { GalleryType } from "../../types/widgets";
import { brand, border, spacing } from "../../variables";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Gallery

    Default Class For Mendix Gallery Widget
========================================================================== */
export const com_mendix_widget_native_gallery_Gallery: GalleryType = {
    container: {
        // All ViewStyle properties are allowed
    },
    emptyPlaceholder: {
        // All ViewStyle properties are allowed
    },
    firstItem: {
        // All ViewStyle properties are allowed
    },
    lastItem: {
        // All ViewStyle properties are allowed
    },
    list: {
        // All ViewStyle properties are allowed
    },
    listItem: {
        // All ViewStyle properties are allowed
    },
    loadMoreButtonContainer: {
        // All ViewStyle properties are allowed
        alignSelf: "stretch"
    },
    loadMoreButtonPressableContainer: {
        // All ViewStyle properties are allowed
        alignItems: "center",
        backgroundColor: brand.primary,
        borderRadius: border.radiusSmall
    },
    loadMoreButtonCaption: {
        // All TextStyle properties are allowed
        padding: spacing.small,
        color: "#FFFFFF"
    }
};
