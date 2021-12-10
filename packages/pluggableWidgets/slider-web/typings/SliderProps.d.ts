/**
 * This file was generated from Slider.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, DynamicValue, EditableValue } from "mendix";
import { Big } from "big.js";

export type MinValueTypeEnum = "static" | "dynamic" | "expression";

export type MaxValueTypeEnum = "static" | "dynamic" | "expression";

export type StepSizeTypeEnum = "static" | "dynamic" | "expression";

export type TooltipTypeEnum = "value" | "customText";

export type OrientationEnum = "horizontal" | "vertical";

export type HeightUnitEnum = "percentage" | "pixels";

export interface SliderContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    advanced: boolean;
    valueAttribute: EditableValue<Big>;
    minValueType: MinValueTypeEnum;
    staticMinimumValue: Big;
    minAttribute?: EditableValue<Big>;
    expressionMinimumValue?: DynamicValue<Big>;
    maxValueType: MaxValueTypeEnum;
    staticMaximumValue: Big;
    maxAttribute?: EditableValue<Big>;
    expressionMaximumValue?: DynamicValue<Big>;
    stepSizeType: StepSizeTypeEnum;
    stepValue: Big;
    stepAttribute?: EditableValue<Big>;
    expressionStepSize?: DynamicValue<Big>;
    showTooltip: boolean;
    tooltipType: TooltipTypeEnum;
    tooltip?: DynamicValue<string>;
    noOfMarkers: number;
    decimalPlaces: number;
    orientation: OrientationEnum;
    heightUnit: HeightUnitEnum;
    height: number;
    onChange?: ActionValue;
}

export interface SliderPreviewProps {
    readOnly: boolean;
    advanced: boolean;
    valueAttribute: string;
    minValueType: MinValueTypeEnum;
    staticMinimumValue: number | null;
    minAttribute: string;
    expressionMinimumValue: string;
    maxValueType: MaxValueTypeEnum;
    staticMaximumValue: number | null;
    maxAttribute: string;
    expressionMaximumValue: string;
    stepSizeType: StepSizeTypeEnum;
    stepValue: number | null;
    stepAttribute: string;
    expressionStepSize: string;
    showTooltip: boolean;
    tooltipType: TooltipTypeEnum;
    tooltip: string;
    noOfMarkers: number | null;
    decimalPlaces: number | null;
    orientation: OrientationEnum;
    heightUnit: HeightUnitEnum;
    height: number | null;
    onChange: {} | null;
}
