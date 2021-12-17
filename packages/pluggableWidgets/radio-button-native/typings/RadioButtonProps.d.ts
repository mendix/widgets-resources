/**
 * This file was generated from RadioButton.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export type OrientationEnum = "horizontal" | "vertical";

export interface RadioButtonProps<Style> {
    name: string;
    style: Style[];
    orientation: OrientationEnum;
    enum: EditableValue<string>;
    onChangeAction?: ActionValue;
}

export interface RadioButtonPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    orientation: OrientationEnum;
    enum: string;
    onChangeAction: {} | null;
}
