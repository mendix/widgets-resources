/**
 * This file was generated from Rating.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, DynamicValue, EditableValue, NativeImage } from "mendix";
import { Big } from "big.js";

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

export interface RatingProps<Style> {
    name: string;
    style: Style[];
    ratingAttribute: EditableValue<Big>;
    emptyIcon?: DynamicValue<NativeImage>;
    icon?: DynamicValue<NativeImage>;
    maximumValue: number;
    animation: AnimationEnum;
    editable: EditableEnum;
    onChange?: ActionValue;
}

export interface RatingPreviewProps {
    class: string;
    style: string;
    ratingAttribute: string;
    emptyIcon: string;
    icon: string;
    maximumValue: number | null;
    animation: AnimationEnum;
    editable: EditableEnum;
    onChange: {} | null;
}
