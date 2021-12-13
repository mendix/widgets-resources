/**
 * This file was generated from Switch.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type LabelOrientationEnum = "horizontal" | "vertical";

export interface SwitchProps<Style> {
    name: string;
    style: Style[];
    booleanAttribute: EditableValue<boolean>;
    onChange?: ActionValue;
    showLabel: boolean;
    label?: DynamicValue<string>;
    labelOrientation: LabelOrientationEnum;
}

export interface SwitchPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    booleanAttribute: string;
    onChange: {} | null;
    showLabel: boolean;
    label: string;
    labelOrientation: LabelOrientationEnum;
}
