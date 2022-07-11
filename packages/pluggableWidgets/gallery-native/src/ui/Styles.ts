import { ViewStyle } from "react-native";

export interface GalleryStyle {
    container?: ViewStyle;
    listStyle?: ViewStyle;
    listItem?: ViewStyle;
    pagination?: ViewStyle;
}

export const defaultGalleryStyle: GalleryStyle = {
    container: {},
    listStyle: {},
    listItem: { flex: 1 },
    pagination: { flexDirection: "row", justifyContent: "center" }
};
