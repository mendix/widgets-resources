/**
 * This file was generated from Rating.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ImageURISource } from "react-native";

interface CommonProps<Style> {
    style: Style[];
}

export type EditableEnum = "default" | "never";

export type AnimationEnum =
    | "none"
    | "bounce"
    | "flash"
    | "jello"
    | "pulse"
    | "rotate"
    | "rubberBand"
    | "shake"
    | "swing"
    | "tada"
    | "wobble";

export interface RatingProps<Style> extends CommonProps<Style> {
    rating: EditableValue<BigJs.Big>;
    maximumValue: number;
    editable: EditableEnum;
    onChange?: ActionValue;
    animation: AnimationEnum;
    emptyImage?: DynamicValue<ImageURISource>;
    image?: DynamicValue<ImageURISource>;
}
