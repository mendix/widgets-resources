import { ViewStyle } from "react-native";
import { ColorListType } from "../../typings/BackgroundGradientProps";

export interface CustomStyle {
    container: ViewStyle;
    angle?: number;
    colorList?: ColorListType[];
    opacity?: number;
}

const defaultStyle: Required<CustomStyle> = {
    container: {},
    opacity: 100,
    angle: 0,
    colorList: []
};

export default defaultStyle;
