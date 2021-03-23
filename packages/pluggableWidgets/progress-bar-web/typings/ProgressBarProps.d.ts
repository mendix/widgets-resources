/**
 * This file was generated from ProgressBar.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type TypeEnum = "static" | "dynamic" | "expression";

export type LabelTypeEnum = "text" | "percentage" | "custom";

export interface ProgressBarContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    type: TypeEnum;
    staticCurrentValue: number;
    dynamicCurrentValue?: EditableValue<BigJs.Big>;
    expressionCurrentValue?: DynamicValue<BigJs.Big>;
    staticMinValue: number;
    dynamicMinValue?: EditableValue<BigJs.Big>;
    expressionMinValue?: DynamicValue<BigJs.Big>;
    staticMaxValue: number;
    dynamicMaxValue?: EditableValue<BigJs.Big>;
    expressionMaxValue?: DynamicValue<BigJs.Big>;
    onClick?: ActionValue;
    showLabel: boolean;
    labelType: LabelTypeEnum;
    labelText?: DynamicValue<string>;
    customLabel?: ReactNode;
}

export interface ProgressBarPreviewProps {
    class: string;
    style: string;
    type: TypeEnum;
    staticCurrentValue: number | null;
    dynamicCurrentValue: string;
    expressionCurrentValue: string;
    staticMinValue: number | null;
    dynamicMinValue: string;
    expressionMinValue: string;
    staticMaxValue: number | null;
    dynamicMaxValue: string;
    expressionMaxValue: string;
    onClick: {} | null;
    showLabel: boolean;
    labelType: LabelTypeEnum;
    labelText: string;
    customLabel: { widgetCount: number; renderer: ComponentType };
}
