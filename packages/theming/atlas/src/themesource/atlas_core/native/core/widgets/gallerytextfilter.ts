import { GalleryTextFilterType } from "../../types/widgets";
import { galleryTextFilter } from "../../variables";
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
        ...galleryTextFilter.container
    },
    caption: {
        // All TextStyle properties are allowed
        ...galleryTextFilter.caption
    },
    textInputContainer: {
        // All ViewStyle properties are allowed
        ...galleryTextFilter.textInputContainer
    },
    textInputOnFocusContainer: {
        // All ViewStyle properties are allowed
        ...galleryTextFilter.textInputOnFocusContainer
    },
    textInput: {
        // All TextStyle properties are allowed
        ...galleryTextFilter.textInput
    },
    textInputClearIcon: {
        // All ViewStyle properties are allowed
        ...galleryTextFilter.textInputClearIcon
    }
};
