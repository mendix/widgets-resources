/**
 * This file was generated from Slider.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";
import { Big } from "big.js";

export type MinValueTypeEnum = "static" | "dynamic" | "expression";

export type MaxValueTypeEnum = "static" | "dynamic" | "expression";

export type StepSizeTypeEnum = "static" | "dynamic" | "expression";

export type OrientationEnum = "horizontal" | "vertical";

export interface SliderContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    id: string;
    valueAttribute: EditableValue<Big>;
    minValueType: MinValueTypeEnum;
    staticMinimumValue: Big;
    minAttribute?: EditableValue<Big>;
    expressionMinimumValue?: DynamicValue<Big>;
    maxValueType: MaxValueTypeEnum;
    staticMaximumValue: Big;
    maxAttribute?: EditableValue<Big>;
    expressionMaximumValue?: DynamicValue<Big>;
    noOfMarkers: number;
    decimalPlaces: number;
    stepSizeType: StepSizeTypeEnum;
    stepValue: Big;
    stepAttribute?: EditableValue<Big>;
    expressionStepSize?: DynamicValue<Big>;
    orientation: OrientationEnum;
    showTooltip: boolean;
    tooltip?: DynamicValue<string>;
    onChange?: ActionValue;
}

export interface SliderPreviewProps {
    class: string;
    style: string;
    valueAttribute: string;
    minValueType: MinValueTypeEnum;
    staticMinimumValue: number | null;
    minAttribute: string;
    expressionMinimumValue: string;
    maxValueType: MaxValueTypeEnum;
    staticMaximumValue: number | null;
    maxAttribute: string;
    expressionMaximumValue: string;
    noOfMarkers: number | null;
    decimalPlaces: number | null;
    stepSizeType: StepSizeTypeEnum;
    stepValue: number | null;
    stepAttribute: string;
    expressionStepSize: string;
    orientation: OrientationEnum;
    showTooltip: boolean;
    tooltip: string;
    onChange: {} | null;
}
