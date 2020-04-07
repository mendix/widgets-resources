/**
 * This file was generated from RangeSlider.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type EditableEnum = "default" | "never";

export interface RangeSliderProps<Style> {
    name: string;
    style: Style[];
    lowerValueAttribute: EditableValue<BigJs.Big>;
    upperValueAttribute: EditableValue<BigJs.Big>;
    editable: EditableEnum;
    minimumValue: DynamicValue<BigJs.Big>;
    maximumValue: DynamicValue<BigJs.Big>;
    stepSize: DynamicValue<BigJs.Big>;
    onChange?: ActionValue;
}

export interface RangeSliderPreviewProps {
    class: string;
    style: string;
    lowerValueAttribute: string;
    upperValueAttribute: string;
    editable: EditableEnum;
    minimumValue: string;
    maximumValue: string;
    stepSize: string;
    onChange: {} | null;
}
