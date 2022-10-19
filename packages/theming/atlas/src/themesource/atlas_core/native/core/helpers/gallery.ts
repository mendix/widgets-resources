import { button, border, spacing } from "../../variables";
import { VariablesGallery } from "../../types/variables";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
==========================================================================
*/

export const justifyPaginationLeft: VariablesGallery = {
    loadMoreButtonPressableContainer: {
        alignSelf: "flex-start"
    }
};

export const justifyPaginationCenter: VariablesGallery = {
    loadMoreButtonPressableContainer: {
        alignSelf: "center"
    }
};

export const justifyPaginationRight: VariablesGallery = {
    loadMoreButtonPressableContainer: {
        alignSelf: "flex-end"
    }
};

export const listItemBorderHorizontal: VariablesGallery = {
    listItem: {
        borderBottomWidth: border.width,
        borderTopWidth: border.width,
        borderBottomColor: border.color,
        borderTopColor: border.color
    }
};

export const listItemBorderVertical: VariablesGallery = {
    listItem: {
        borderStartWidth: border.width,
        borderEndWidth: border.width,
        borderStartColor: border.color,
        borderEndColor: border.color
    }
};

export const listItemBorder: VariablesGallery = {
    listItem: {
        ...listItemBorderVertical.listItem,
        ...listItemBorderHorizontal.listItem
    }
};

export const gridGapInnerSmall: VariablesGallery = {
    listItem: {
        padding: spacing.smaller
    }
};

export const gridGapInnerMedium: VariablesGallery = {
    listItem: {
        padding: spacing.regular
    }
};

export const gridGapInnerLarge: VariablesGallery = {
    listItem: {
        padding: spacing.larger
    }
};

export const gridGapOuterSmall: VariablesGallery = {
    listItem: {
        margin: spacing.smaller
    }
};

export const gridGapOuterMedium: VariablesGallery = {
    listItem: {
        margin: spacing.regular
    }
};

export const gridGapOuterLarge: VariablesGallery = {
    listItem: {
        margin: spacing.larger
    }
};

export const galleryGridAlignSelfStart: VariablesGallery = {
    listItem: {
        alignSelf: "flex-start"
    }
};

export const galleryGridAlignSelfCenter: VariablesGallery = {
    listItem: {
        alignSelf: "center"
    }
};

export const galleryGridAlignSelfEnd: VariablesGallery = {
    listItem: {
        alignSelf: "flex-end"
    }
};

export const galleryGridAlignSelfStretch: VariablesGallery = {
    listItem: {
        alignSelf: "stretch"
    }
};

export const galleryGridAlignSelfBaseline: VariablesGallery = {
    listItem: {
        alignSelf: "baseline"
    }
};

export const galleryGridFlexRow: VariablesGallery = {
    listItem: {
        flexDirection: "row"
    }
};

export const galleryGridFlexWrap: VariablesGallery = {
    listItem: {
        flexWrap: "wrap"
    }
};

export const galleryGridJustifyContentStart: VariablesGallery = {
    listItem: {
        justifyContent: "flex-start"
    }
};

export const galleryGridJustifyContentCenter: VariablesGallery = {
    listItem: {
        justifyContent: "center"
    }
};

export const galleryGridJustifyContentEnd: VariablesGallery = {
    listItem: {
        justifyContent: "flex-end"
    }
};

export const galleryGridJustifyContentSpaceBetween: VariablesGallery = {
    listItem: {
        justifyContent: "space-between"
    }
};

export const galleryGridJustifyContentSpaceAround: VariablesGallery = {
    listItem: {
        justifyContent: "space-around"
    }
};

export const galleryGridJustifyContentSpaceEvenly: VariablesGallery = {
    listItem: {
        justifyContent: "space-evenly"
    }
};

export const loadMoreButtonBackgroundSecondary: VariablesGallery = {
    loadMoreButtonPressableContainer: {
        backgroundColor: button.secondary.backgroundColor
    }
};

export const loadMoreButtonBackgroundSuccess: VariablesGallery = {
    loadMoreButtonPressableContainer: {
        backgroundColor: button.success.backgroundColor
    }
};

export const loadMoreButtonBackgroundWarning: VariablesGallery = {
    loadMoreButtonPressableContainer: {
        backgroundColor: button.warning.backgroundColor
    }
};

export const loadMoreButtonBackgroundDanger: VariablesGallery = {
    loadMoreButtonPressableContainer: {
        backgroundColor: button.danger.backgroundColor
    }
};

export const loadMoreButtonFixedSize: VariablesGallery = {
    loadMoreButtonPressableContainer: {
        alignSelf: "baseline"
    }
};
