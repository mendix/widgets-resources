import { TextStyle, ViewStyle } from "react-native";

export interface GalleryStyle {
    container?: ViewStyle;
    customClasses?: {
        [key: string]: Pick<GalleryStyle, "listItem">;
    };
    emptyPlaceholder?: ViewStyle;
    firstItem?: ViewStyle;
    lastItem?: ViewStyle;
    list?: ViewStyle;
    listItem?: ViewStyle;
    pagination?: ViewStyle;
    paginationText?: TextStyle;
}

export const defaultGalleryStyle: GalleryStyle = {
    listItem: { flexGrow: 1 },
    pagination: { flexDirection: "row", justifyContent: "center", marginVertical: 8 }
};
