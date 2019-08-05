/**
 * This file was generated from ToggleButtons.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, EditableValue } from "mendix";

interface CommonProps<Style> {
    style: Style[];
}

export type EditableEnum = "default" | "never";

export interface ToggleButtonsProps<Style> extends CommonProps<Style> {
    enum: EditableValue<string>;
    editable: EditableEnum;
    onChange?: ActionValue;
}
