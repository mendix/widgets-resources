import { Properties, StructurePreviewProps, transformGroupsIntoTabs } from "@mendix/piw-utils-internal";
import { BarcodeScannerContainerProps } from "../typings/BarcodeScannerProps";
import BarcodeScannerSvg from "./assets/barcodescanner.svg";

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

export function getPreview(): StructurePreviewProps | null {
    return {
        type: "Image",
        document: decodeURIComponent(BarcodeScannerSvg.replace("data:image/svg+xml,", "")),
        height: 275,
        width: 275
    };
}
