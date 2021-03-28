/**
 * This file was generated from RangeSlider.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, DynamicValue, EditableValue } from "mendix";
import { Big } from "big.js";

export type EditableEnum = "default" | "never";

export interface RangeSliderProps<Style> {
    name: string;
    style: Style[];
    lowerValueAttribute: EditableValue<Big>;
    upperValueAttribute: EditableValue<Big>;
    editable: EditableEnum;
    minimumValue: DynamicValue<Big>;
    maximumValue: DynamicValue<Big>;
    stepSize: DynamicValue<Big>;
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
