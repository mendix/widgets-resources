import { StructurePreviewProps } from "@mendix/piw-utils-internal";

import barcodeScannerSvgDark from "./assets/BarcodeScanner.dark.svg";
import barcodeScannerSvgLight from "./assets/BarcodeScanner.light.svg";
import { BarcodeScannerPreviewProps } from "../typings/BarcodeScannerProps";

export function getPreview(_: BarcodeScannerPreviewProps, isDarkMode: boolean): StructurePreviewProps {
    return {
        type: "Image",
        document: decodeURIComponent(
            (isDarkMode ? barcodeScannerSvgDark : barcodeScannerSvgLight).replace("data:image/svg+xml,", "")
        ),
        width: 100
    };
}
