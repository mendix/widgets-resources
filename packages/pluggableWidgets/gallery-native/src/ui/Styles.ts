import { TextStyle, ViewStyle } from "react-native";

export interface GalleryStyle {
    container?: ViewStyle;
    dynamicItemClasses?: {
        [key: string]: Pick<GalleryStyle, "listItem">;
    };
    emptyPlaceholder?: ViewStyle;
    firstItem?: ViewStyle;
    lastItem?: ViewStyle;
    list?: ViewStyle;
    listItem?: ViewStyle;
    loadMoreButtonContainer?: ViewStyle;
    loadMoreButtonPressableContainer?: ViewStyle;
    loadMoreButtonCaption?: TextStyle;
}

export const defaultGalleryStyle: GalleryStyle = {
    listItem: { flexGrow: 1 },
    loadMoreButtonContainer: {
        alignSelf: "stretch"
    },
    loadMoreButtonPressableContainer: {
        alignItems: "center",
        backgroundColor: "#264AE5",
        borderRadius: 4
    },
    loadMoreButtonCaption: {
        padding: 8,
        color: "#FFFFFF"
    }
};
