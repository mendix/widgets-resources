/**
 * This file was generated from ColorPicker.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type FormatEnum = "hex" | "rgb" | "rgba";

export type ModeEnum = "input" | "popover" | "inline";

export type TypeEnum =
    | "sketch"
    | "chrome"
    | "block"
    | "github"
    | "twitter"
    | "circle"
    | "hue"
    | "slider"
    | "compact"
    | "material"
    | "swatches";

export interface DefaultColorsType {
    color: string;
}

export interface DefaultColorsPreviewType {
    color: string;
}

export interface ColorPickerContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    colorAttribute: EditableValue<string>;
    format: FormatEnum;
    mode: ModeEnum;
    type: TypeEnum;
    defaultColors: DefaultColorsType[];
    invalidFormatMessage?: DynamicValue<string>;
    onChange?: ActionValue;
}

export interface ColorPickerPreviewProps {
    readOnly: boolean;
    colorAttribute: string;
    format: FormatEnum;
    mode: ModeEnum;
    type: TypeEnum;
    defaultColors: DefaultColorsPreviewType[];
    invalidFormatMessage: string;
    onChange: {} | null;
}
