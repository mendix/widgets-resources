import { layoutgrid } from "../variables.js";


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

export const LayoutGrid = {
    container: {},
};

export const row = {
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: -layoutgrid.gutterSize,
    },
};
export const col = {
    container: {
        flex: 1,
        paddingHorizontal: layoutgrid.gutterSize,
    },
};
export const colFitToContent = {
    container: {
        flex: -1,
        paddingHorizontal: layoutgrid.gutterSize,
    },
};
export const col1 = {
    container: {
        flexBasis: "8.333%",
        paddingHorizontal: layoutgrid.gutterSize,
    },
};
export const col2 = {
    container: {
        flexBasis: "16.666%",
        paddingHorizontal: layoutgrid.gutterSize,
    },
};
export const col3 = {
    container: {
        flexBasis: "25%",
        paddingHorizontal: layoutgrid.gutterSize,
    },
};
export const col4 = {
    container: {
        flexBasis: "33.333%",
        paddingHorizontal: layoutgrid.gutterSize,
    },
};
export const col5 = {
    container: {
        flexBasis: "41.666%",
        paddingHorizontal: layoutgrid.gutterSize,
    },
};
export const col6 = {
    container: {
        flexBasis: "50%",
        paddingHorizontal: layoutgrid.gutterSize,
    },
};
export const col7 = {
    container: {
        flexBasis: "58.333%",
        paddingHorizontal: layoutgrid.gutterSize,
    },
};
export const col8 = {
    container: {
        flexBasis: "66.666%",
        paddingHorizontal: layoutgrid.gutterSize,
    },
};
export const col9 = {
    container: {
        flexBasis: "75%",
        paddingHorizontal: layoutgrid.gutterSize,
    },
};
export const col10 = {
    container: {
        flexBasis: "83.333%",
        paddingHorizontal: layoutgrid.gutterSize,
    },
};
export const col11 = {
    container: {
        flexBasis: "91.666%",
        paddingHorizontal: layoutgrid.gutterSize,
    },
};
export const col12 = {
    container: {
        flexBasis: "100%",
        paddingHorizontal: layoutgrid.gutterSize,
    },
};
export const noGutters = {
    container: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingHorizontal: 0,
    },
};
export const noGuttersRow = {
    container: {
        marginLeft: 0,
        marginRight: 0,
        marginHorizontal: 0,
    },
};
