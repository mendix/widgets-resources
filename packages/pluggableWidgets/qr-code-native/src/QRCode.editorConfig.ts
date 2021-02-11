import { RowLayoutProps } from "@widgets-resources/piw-utils";
import StructurePreviewQRCodeSVG from "./assets/StructurePreviewQRCode.svg";

export const getPreview = (): RowLayoutProps => ({
    type: "RowLayout",
    borders: false,
    padding: 8,
    columnSize: "grow",
    children: [
        {
            type: "Image",
            document: decodeURIComponent(StructurePreviewQRCodeSVG.replace("data:image/svg+xml,", "")),
            width: 48,
            height: 48
        }
    ]
});
