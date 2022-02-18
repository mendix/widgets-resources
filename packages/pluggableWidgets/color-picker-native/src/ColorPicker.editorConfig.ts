import { StructurePreviewProps } from "@mendix/piw-utils-internal";

import { ColorPickerPreviewProps } from "../typings/ColorPickerProps";
import colorPickerSvgNoPreviewDark from "./assets/ColorPicker.nopreview.dark.svg";
import colorPickerSvgNoPreviewLight from "./assets/ColorPicker.nopreview.light.svg";
import colorPickerSvgPreviewDark from "./assets/ColorPicker.preview.dark.svg";
import colorPickerSvgPreviewLight from "./assets/ColorPicker.preview.light.svg";

export function getPreview(values: ColorPickerPreviewProps, isDarkMode: boolean): StructurePreviewProps {
    return {
        type: "Image",
        document: decodeURIComponent(
            (values.showPreview
                ? isDarkMode
                    ? colorPickerSvgPreviewDark
                    : colorPickerSvgPreviewLight
                : isDarkMode
                ? colorPickerSvgNoPreviewDark
                : colorPickerSvgNoPreviewLight
            ).replace("data:image/svg+xml,", "")
        ),
        width: 188
    };
}
