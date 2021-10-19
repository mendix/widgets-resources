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
    dataSource: EditableValue<boolean>;
    showLabel: boolean;
    label: string;
    labelWidth: number;
    labelOrientation: LabelOrientationEnum;
    onClick?: ActionValue;
}

export interface SwitchPreviewProps {
    class: string;
    style: string;
    dataSource: string;
    showLabel: boolean;
    label: string;
    labelWidth: number | null;
    labelOrientation: LabelOrientationEnum;
    onClick: {} | null;
}
