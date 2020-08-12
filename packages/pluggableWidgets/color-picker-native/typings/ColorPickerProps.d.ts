/**
 * This file was generated from ColorPicker.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, EditableValue } from "mendix";

export type FormatEnum = "hex" | "hsl" | "hsv" | "rgb";

export interface ColorPickerProps<Style> {
    name: string;
    style: Style[];
    color: EditableValue<string>;
    format: FormatEnum;
    showPreview: boolean;
    showSaturation: boolean;
    showLightness: boolean;
    showAlpha: boolean;
    onChange?: ActionValue;
}

export interface ColorPickerPreviewProps {
    class: string;
    style: string;
    color: string;
    format: FormatEnum;
    showPreview: boolean;
    showSaturation: boolean;
    showLightness: boolean;
    showAlpha: boolean;
    onChange: {} | null;
}
