import { GalleryType } from "../../types/widgets";
import { gallery } from "../../variables";
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
        ...gallery.container
    },
    dynamicItemClasses: {
        // All custom style properties are allowed
    },
    emptyPlaceholder: {
        // All ViewStyle properties are allowed
        ...gallery.emptyPlaceholder
    },
    firstItem: {
        // All ViewStyle properties are allowed
        ...gallery.firstItem
    },
    lastItem: {
        // All ViewStyle properties are allowed
        ...gallery.lastItem
    },
    list: {
        // All ViewStyle properties are allowed
        ...gallery.list
    },
    listItem: {
        // All ViewStyle properties are allowed
        ...gallery.listItem
    },
    loadMoreButtonContainer: {
        // All ViewStyle properties are allowed
        ...gallery.loadMoreButtonContainer
    },
    loadMoreButtonPressableContainer: {
        // All ViewStyle properties are allowed
        ...gallery.loadMoreButtonPressableContainer
    },
    loadMoreButtonCaption: {
        // All TextStyle properties are allowed
        ...gallery.loadMoreButtonCaption
    }
};
