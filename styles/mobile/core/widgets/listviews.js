import {contrast, background } from '../variables';

/* ==========================================================================
    ListView

    Default Class For Mendix ListView Widget
========================================================================== */

export const ListView = {
    list: {
        // numColumns: 1,
    },
    listItem: {},
};

export const listItemBorderBottom = {
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: contrast.lowest,
        backgroundColor: background.primary,
    },
};
