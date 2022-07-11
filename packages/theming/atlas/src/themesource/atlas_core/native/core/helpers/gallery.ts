import { border, spacing } from "../../variables";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
==========================================================================
*/

export const justifyPaginationLeft = {
    pagination: {
        justifyContent: "flex-start"
    }
};

export const justifyPaginationCenter = {
    pagination: {
        justifyContent: "center"
    }
};

export const justifyPaginationRight = {
    pagination: {
        justifyContent: "flex-end"
    }
};

export const listItemBorderHorizontal = {
    listItem: {
        borderBottomWidth: border.width,
        borderTopWidth: border.width,
        borderBottomColor: border.color,
        borderTopColor: border.color
    }
};

export const listItemBorderVertical = {
    listItem: {
        borderStartWidth: border.width,
        borderEndWidth: border.width,
        borderStartColor: border.color,
        borderEndColor: border.color
    }
};

export const listItemBorder = {
    listItem: {
        ...listItemBorderVertical.listItem,
        ...listItemBorderHorizontal.listItem
    }
};

export const gridGapInnerSmall = {
    listItem: {
        padding: spacing.smaller
    }
};

export const gridGapInnerMedium = {
    listItem: {
        padding: spacing.regular
    }
};

export const gridGapInnerLarge = {
    listItem: {
        padding: spacing.larger
    }
};

export const gridGapOuterSmall = {
    listItem: {
        margin: spacing.smaller
    }
};

export const gridGapOuterMedium = {
    listItem: {
        margin: spacing.regular
    }
};

export const gridGapOuterLarge = {
    listItem: {
        margin: spacing.larger
    }
};
