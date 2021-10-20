/**
 * This file was generated from Switch.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, EditableValue } from "mendix";

export type LabelOrientationEnum = "horizontal" | "vertical";

export interface SwitchProps<Style> {
    name: string;
    style: Style[];
    booleanAttribute: EditableValue<boolean>;
    onChange?: ActionValue;
    showLabel: boolean;
    label: string;
    labelWidth: number;
    labelOrientation: LabelOrientationEnum;
}

export interface SwitchPreviewProps {
    class: string;
    style: string;
    booleanAttribute: string;
    onChange: {} | null;
    showLabel: boolean;
    label: string;
    labelWidth: number | null;
    labelOrientation: LabelOrientationEnum;
}
