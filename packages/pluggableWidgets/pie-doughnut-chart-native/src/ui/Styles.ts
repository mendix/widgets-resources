import { ViewStyle } from "react-native";

interface LabelStyle {
    // color is the same as slice color
    color?: string;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: "normal" | "italic";
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
}

interface SliceStyle {
    color?: string;
}

export interface SlicesStyle {
    customStyles?: {
        [key: string]: {
            slice?: SliceStyle;
            label?: LabelStyle;
        };
    };
    colorPalette?: string;
    innerRadius?: number;
    padding?: number;
    paddingBottom?: number;
    paddingHorizontal?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingVertical?: number;
}

export interface ChartStyle {
    container?: ViewStyle;
    slices?: SlicesStyle;
}

export const defaultStyle: ChartStyle = {
    container: {
        flex: 1
    },
    slices: {
        padding: 40
    }
};
