/**
 * This file was generated from ColorPicker.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, EditableValue } from "@mendix/pluggable-widgets-api/properties";

interface CommonProps<Style> {
    style: Style[];
}

export interface ColorPickerProps<Style> extends CommonProps<Style> {
    color: EditableValue<string>;
    onChange?: ActionValue;
}
