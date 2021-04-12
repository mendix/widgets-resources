import { Problem, Properties } from "@mendix/piw-utils-internal";
import { BarcodeScannerPreviewProps } from "../typings/BarcodeScannerProps";

export function getProperties(_values: BarcodeScannerPreviewProps, defaultProperties: Properties): Properties {
    return defaultProperties;
}

export function check(_values: BarcodeScannerPreviewProps): Problem[] {
    const errors: Problem[] = [];
    return errors;
}
