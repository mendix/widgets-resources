/*
==========================================================================
    Split view

==========================================================================
*/
import { listView } from "../../../atlas_core/native/variables";

export const splitViewLeft = {
    container: {
        height: "100%",
        width: "50%",
        maxWidth: "50%"
    }
};

export const splitViewSmallLeft = {
    container: {
        height: "100%",
        width: "30%",
        maxWidth: "30%"
    }
};

export const splitViewSmallLeftWithRightBorder = {
    container: {
        ...splitViewSmallLeft.container,
        borderRightColor: listView.border.color,
        borderRightWidth: listView.border.width
    }
};
//
// == Elements
// -------------------------------------------------------------------------------------------------------------------//
