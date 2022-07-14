import { ViewStyle } from "react-native";

export interface GalleryStyle {
    container?: ViewStyle;
    listStyle?: ViewStyle;
    listItem?: ViewStyle;
    pagination?: ViewStyle;
    customClasses?: {
        [key: string]: Pick<GalleryStyle, "listItem">;
    };
}

export const defaultGalleryStyle: GalleryStyle = {
    listItem: { flex: 1 },
    pagination: { flexDirection: "row", justifyContent: "center" }
};
