import { ViewStyle } from "react-native";
import { Style } from "@native-mobile-resources/util-widgets";

export interface PanelStyle extends ViewStyle {
    panelSize: number;
}

export interface ListViewSwipeStyle extends Style {
    container: ViewStyle;
    leftAction: PanelStyle;
    rightAction: PanelStyle;
}

export const defaultListViewSwipeStyle: ListViewSwipeStyle = {
    container: {
        flex: 1,
        height: 80,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        flexDirection: "column",
        backgroundColor: "white"
    },
    leftAction: {
        flexDirection: "row",
        alignItems: "stretch",
        flex: 1,
        justifyContent: "center",
        panelSize: 192
    },
    rightAction: {
        flexDirection: "row",
        alignItems: "stretch",
        flex: 1,
        justifyContent: "center",
        panelSize: 192
    }
};
