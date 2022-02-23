import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import StructurePreviewSvg from "./assets/structure-preview.svg";
import StructurePreviewSvgDark from "./assets/structure-preview-dark.svg";
import { ProgressCirclePreviewProps } from "../typings/ProgressCircleProps";

export function getPreview(_: ProgressCirclePreviewProps, isDarkMode: boolean): StructurePreviewProps | null {
    return {
        type: "Image",
        document: decodeURIComponent(
            (isDarkMode ? StructurePreviewSvgDark : StructurePreviewSvg).replace("data:image/svg+xml,", "")
        ),
        height: 175,
        width: 175
    };
}
