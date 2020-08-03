/**
 * This file was generated from ToggleButtons.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, EditableValue } from "mendix";

export type EditableEnum = "default" | "never";

export interface ToggleButtonsProps<Style> {
    name: string;
    style: Style[];
    enum: EditableValue<string>;
    editable: EditableEnum;
    onChange?: ActionValue;
}

export interface ToggleButtonsPreviewProps {
    class: string;
    style: string;
    enum: string;
    editable: EditableEnum;
    onChange: {} | null;
}
