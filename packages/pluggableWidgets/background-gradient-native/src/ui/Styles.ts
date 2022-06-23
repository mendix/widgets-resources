import { ViewStyle } from "react-native";
import { ColorListType } from "../../typings/BackgroundGradientProps";

export interface CustomStyle {
    container: ViewStyle;
    angle?: number;
    colorList?: ColorListType[];
    opacity?: number;
}

const defaultStyle: CustomStyle = {
    container: {},
    opacity: 1,
    angle: 0
};

export default defaultStyle;
