import { layoutGrid }     from "../variables";
import { HelperClass }    from "../../types/helperclass";
import { LayoutGridType } from "../../types/widgets";


//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Intro Screen

    Default Class For Mendix Layoutgrid Widget
========================================================================== */

export const LayoutGrid: LayoutGridType = {
    container: {},
};

export const row: HelperClass = {
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: -layoutGrid.gutterSize,
    },
};
export const col: HelperClass = {
    container: {
        flex: 1,
        paddingHorizontal: layoutGrid.gutterSize,
    },
};
export const colFitToContent: HelperClass = {
    container: {
        flex: -1,
        paddingHorizontal: layoutGrid.gutterSize,
    },
};
export const col1: HelperClass = {
    container: {
        flexBasis: "8.333%",
        paddingHorizontal: layoutGrid.gutterSize,
    },
};
export const col2: HelperClass = {
    container: {
        flexBasis: "16.666%",
        paddingHorizontal: layoutGrid.gutterSize,
    },
};
export const col3: HelperClass = {
    container: {
        flexBasis: "25%",
        paddingHorizontal: layoutGrid.gutterSize,
    },
};
export const col4: HelperClass = {
    container: {
        flexBasis: "33.333%",
        paddingHorizontal: layoutGrid.gutterSize,
    },
};
export const col5: HelperClass = {
    container: {
        flexBasis: "41.666%",
        paddingHorizontal: layoutGrid.gutterSize,
    },
};
export const col6: HelperClass = {
    container: {
        flexBasis: "50%",
        paddingHorizontal: layoutGrid.gutterSize,
    },
};
export const col7: HelperClass = {
    container: {
        flexBasis: "58.333%",
        paddingHorizontal: layoutGrid.gutterSize,
    },
};
export const col8: HelperClass = {
    container: {
        flexBasis: "66.666%",
        paddingHorizontal: layoutGrid.gutterSize,
    },
};
export const col9: HelperClass = {
    container: {
        flexBasis: "75%",
        paddingHorizontal: layoutGrid.gutterSize,
    },
};
export const col10: HelperClass = {
    container: {
        flexBasis: "83.333%",
        paddingHorizontal: layoutGrid.gutterSize,
    },
};
export const col11: HelperClass = {
    container: {
        flexBasis: "91.666%",
        paddingHorizontal: layoutGrid.gutterSize,
    },
};
export const col12: HelperClass = {
    container: {
        flexBasis: "100%",
        paddingHorizontal: layoutGrid.gutterSize,
    },
};
export const noGutters: HelperClass = {
    container: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingHorizontal: 0,
    },
};
export const noGuttersRow: HelperClass = {
    container: {
        marginLeft: 0,
        marginRight: 0,
        marginHorizontal: 0,
    },
};
