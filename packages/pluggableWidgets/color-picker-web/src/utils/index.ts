import * as Picker from "react-color/lib";
import { TypeEnum, FormatEnum } from "../../typings/ColorPickerProps";
import { ColorState } from "react-color";
import { ColorPickerProps, ColorPickerConfigProps } from "../components/ColorPicker";
import { FunctionComponent } from "react";

export function getColorPicker(type: TypeEnum): FunctionComponent<ColorPickerConfigProps> {
    switch (type) {
        case "compact":
            return Picker.CompactPicker;
        case "sketch":
            return Picker.SketchPicker;
        case "chrome":
            return Picker.ChromePicker;
        case "block":
            return Picker.BlockPicker;
        case "github":
            return Picker.GithubPicker;
        case "hue":
            return Picker.HuePicker;
        case "twitter":
            return Picker.TwitterPicker;
        case "circle":
            return Picker.CirclePicker;
        case "swatches":
            return Picker.SwatchesPicker;
        case "slider":
            return Picker.SliderPicker;
        case "material":
            return Picker.MaterialPicker;
        default:
            return Picker.SketchPicker;
    }
}

export function parseColor(color: ColorState, format: FormatEnum): string {
    if (format === "hex") {
        return color.hex;
    } else if (format === "rgb") {
        return `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`;
    } else {
        return `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
    }
}

export const validateColorFormat = (color: string, colorFormat: FormatEnum): string => {
    const hexRegExp = /^#?([a-f\d]{3}|[a-f\d]{6})$/;
    const rgbRegExp =
        /^rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)$/;
    const rgbaRegExp =
        /^rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0?\.\d*|0|1(\.0)?)\)$/;
    let format = "";
    if (color && colorFormat === "hex" && !hexRegExp.test(color.toLowerCase())) {
        format = "'#0d0', '#d0d0d0'";
    } else if (color && colorFormat === "rgb" && !rgbRegExp.test(color.toLowerCase())) {
        format = "'rgb(115,159,159)'";
    } else if (color && colorFormat === "rgba" && !rgbaRegExp.test(color.toLowerCase())) {
        format = "'rgba(195,226,226,1)'";
    }
    return format;
};

export function logError(message: string, style?: string, error?: any): void {
    console.error(message, style, error);
}

export function validateProps(props: ColorPickerProps): string {
    const { type, defaultColors, invalidFormatMessage, format, id } = props;
    const message: string[] = [];
    const supportDefaultColors =
        type === "block" || type === "sketch" || type === "circle" || type === "compact" || type === "twitter";
    if (defaultColors.length > 0 && supportDefaultColors) {
        defaultColors.forEach(color => {
            const validFormat = validateColorFormat(color.color, format);
            if (validFormat) {
                message.push(`${color.color}, ${invalidFormatMessage?.replaceAll(":colors:", validFormat)}`);
            }
        });
    }

    if (message.length) {
        const errorMessage = `Configuration error in widget ${id}: ${message.join(", ")}`;
        logError(errorMessage);
        return errorMessage;
    }
    return message.join(", ");
}
