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
    listStyle: {
        // All ViewStyle properties are allowed
        ...gallery.listStyle
    },
    listItem: {
        // All ViewStyle properties are allowed
        ...gallery.listItem
    },
    pagination: {
        // All ViewStyle properties are allowed
        ...gallery.pagination
    },
    customClasses: {
        // All custom style properties are allowed
    }
};
