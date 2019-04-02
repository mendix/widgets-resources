/**
 * This file was generated from Rating.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ImageURISource } from "react-native";

interface CommonProps<Style> {
    style: Style[];
}

export type AnimationEnum =
    | "pulse"
    | "bounce"
    | "flash"
    | "jello"
    | "rotate"
    | "rubberBand"
    | "shake"
    | "swing"
    | "tada"
    | "wobble"
    | "none";

export type EditableEnum = "default" | "never";

export interface RatingProps<Style> extends CommonProps<Style> {
    ratingAttribute: EditableValue<BigJs.Big>;
    emptyIcon?: DynamicValue<ImageURISource>;
    icon?: DynamicValue<ImageURISource>;
    maximumValue: number;
    animation: AnimationEnum;
    editable: EditableEnum;
    onChange?: ActionValue;
}
