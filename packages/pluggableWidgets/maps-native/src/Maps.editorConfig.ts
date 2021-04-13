import { Problem, StructurePreviewProps } from "@mendix/piw-utils-internal";
import { MapsPreviewProps } from "../typings/MapsProps";
import StructurePreviewMapsSVG from "./assets/StructurePreviewMaps.svg";

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
    }

    return errors;
}
