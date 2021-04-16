import { Problem } from "@mendix/piw-utils-internal";
import { MapsPreviewProps } from "../typings/MapsProps";

export function check(values: MapsPreviewProps): Problem[] {
    const errors: Problem[] = [];
    const zoomLevels = ["world", "continent", "country", "city", "town", "streets", "building"];

    const minZoomLevelIndex = zoomLevels.indexOf(values.minZoomLevel);
    const maxZoomLevelIndex = zoomLevels.indexOf(values.maxZoomLevel);

    if (minZoomLevelIndex > maxZoomLevelIndex) {
        errors.push({
            property: "minZoomLevel",
            severity: "error",
            message: "The minimum zoom level can not be smaller than the maximum zoom level."
        });
    } else if (minZoomLevelIndex < maxZoomLevelIndex) {
        errors.push({
            property: "maxZoomLevel",
            severity: "error",
            message: "The maximum zoom level can not be bigger than the minimum zoom level."
        });
    }

    return errors;
}
