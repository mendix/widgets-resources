import { RowLayoutProps } from "@mendix/piw-utils-internal";
import StructurePreviewQRCodeSVG from "./assets/StructurePreviewQRCode.svg";
import StructurePreviewQRCodeDarkSVG from "./assets/StructurePreviewQRCodeDark.svg";

export const getPreview = (_: undefined, isDarkMode: boolean): RowLayoutProps => ({
    type: "RowLayout",
    borders: false,
    padding: 8,
    columnSize: "grow",
    children: [
        {
            type: "Image",
            document: isDarkMode
                ? decodeURIComponent(StructurePreviewQRCodeDarkSVG.replace("data:image/svg+xml,", ""))
                : decodeURIComponent(StructurePreviewQRCodeSVG.replace("data:image/svg+xml,", "")),
            width: 48,
            height: 48
        }
    ]
});
