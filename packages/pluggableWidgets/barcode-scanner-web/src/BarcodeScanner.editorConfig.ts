import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import BarcodeScannerSvg from "./assets/barcodescanner.svg";

export function getPreview(): StructurePreviewProps | null {
    return {
        type: "Image",
        document: decodeURIComponent(BarcodeScannerSvg.replace("data:image/svg+xml,", "")),
        height: 275,
        width: 275
    };
}
