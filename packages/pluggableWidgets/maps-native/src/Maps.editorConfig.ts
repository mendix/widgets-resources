import { Problem } from "@mendix/piw-utils-internal";
import { MapsPreviewProps } from "../typings/MapsProps";

export function check(values: MapsPreviewProps): Problem[] {
    const errors: Problem[] = [];
    const zoomLevels = ["world", "continent", "country", "city", "town", "streets", "building"];

    const defaultZoomLevelIndex = zoomLevels.indexOf(values.defaultZoomLevel);
    const minZoomLevelIndex = zoomLevels.indexOf(values.minZoomLevel);
    const maxZoomLevelIndex = zoomLevels.indexOf(values.maxZoomLevel);

    if (minZoomLevelIndex > maxZoomLevelIndex) {
        errors.push({
            property: "minZoomLevel",
            severity: "error",
            message: "The minimum zoom level can not be smaller than the maximum zoom level."
        });
    }

    if (defaultZoomLevelIndex < minZoomLevelIndex) {
        errors.push({
            property: "defaultZoomLevel",
            severity: "error",
            message: "The default zoom level can not be bigger than the minimum zoom level."
        });
    } else if (defaultZoomLevelIndex > maxZoomLevelIndex) {
        errors.push({
            property: "defaultZoomLevel",
            severity: "error",
            message: "The default zoom level can not be smaller than the maximum zoom level."
        });
    }

    return errors;
}
