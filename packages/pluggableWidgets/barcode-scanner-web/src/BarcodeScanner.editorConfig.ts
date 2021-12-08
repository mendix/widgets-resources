import { Properties, StructurePreviewProps, transformGroupsIntoTabs } from "@mendix/piw-utils-internal";
import { BarcodeScannerContainerProps } from "../typings/BarcodeScannerProps";
import BarcodeScannerSvg from "./assets/barcodescanner.svg";
import BarcodeScannerSvgDark from "./assets/barcodescanner-dark.svg";

export function getProperties(
    _: BarcodeScannerContainerProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}

export function getPreview(_: StructurePreviewProps, isDarkMode: boolean): StructurePreviewProps | null {
    return {
        type: "Image",
        document: decodeURIComponent(
            (isDarkMode ? BarcodeScannerSvgDark : BarcodeScannerSvg).replace("data:image/svg+xml,", "")
        ),
        height: 275,
        width: 275
    };
}
