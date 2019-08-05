/**
 * This file was generated from Rating.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, DynamicValue, EditableValue, NativeImage } from "mendix";

interface CommonProps<Style> {
    style: Style[];
}

export type AnimationEnum = "pulse" | "bounce" | "flash" | "jello" | "rotate" | "rubberBand" | "shake" | "swing" | "tada" | "wobble" | "none";

export type EditableEnum = "default" | "never";

export interface RatingProps<Style> extends CommonProps<Style> {
    ratingAttribute: EditableValue<BigJs.Big>;
    emptyIcon?: DynamicValue<NativeImage>;
    icon?: DynamicValue<NativeImage>;
    maximumValue: number;
    animation: AnimationEnum;
    editable: EditableEnum;
    onChange?: ActionValue;
}
