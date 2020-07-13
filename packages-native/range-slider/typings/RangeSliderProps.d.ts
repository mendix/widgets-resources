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
    lowerValueAttribute: { displayValue: string } | null;
    upperValueAttribute: { displayValue: string } | null;
    editable: EditableEnum;
    minimumValue: { displayValue: string } | null;
    maximumValue: { displayValue: string } | null;
    stepSize: { displayValue: string } | null;
    onChange: {} | null;
}
