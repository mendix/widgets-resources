import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import {
    changePropertyIn,
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties
} from "@mendix/pluggable-widgets-tools";

import { MapsPreviewProps } from "../typings/MapsProps";
import StructurePreviewMapsSVG from "./assets/StructurePreviewMaps.svg";

export function getPreview(_: MapsPreviewProps): StructurePreviewProps {
    return {
        type: "Image",
        document: decodeURIComponent(StructurePreviewMapsSVG.replace("data:image/svg+xml,", "")),
        width: 375,
        height: 375
    };
}

export function getProperties(values: MapsPreviewProps, defaultProperties: Properties): Properties {
    values.markers.forEach((f, index) => {
        if (f.locationType === "address") {
            hidePropertyIn(defaultProperties, values, "markers", index, "latitude");
            hidePropertyIn(defaultProperties, values, "markers", index, "longitude");
        } else {
            hidePropertyIn(defaultProperties, values, "markers", index, "address");
        }
    });

    values.dynamicMarkers.forEach((f, index) => {
        if (f.locationDynamicType === "address") {
            hidePropertyIn(defaultProperties, values, "dynamicMarkers", index, "latitude");
            hidePropertyIn(defaultProperties, values, "dynamicMarkers", index, "longitude");
        } else {
            hidePropertyIn(defaultProperties, values, "dynamicMarkers", index, "address");
        }
    });

    if (values.fitToMarkers) {
        hidePropertiesIn(defaultProperties, values, ["centerAddress", "centerLatitude", "centerLongitude"]);

        if (values.markers.length > 1 || values.dynamicMarkers.length > 1) {
            hidePropertyIn(defaultProperties, values, "defaultZoomLevel");
        }
    }

    changePropertyIn(
        defaultProperties,
        values,
        prop => {
            prop.objectHeaders = ["Address", "Latitude", "Longitude"];
            prop.objects?.forEach((object, index) => {
                const column = values.markers[index];
                object.captions = [column.address, column.latitude, column.longitude];
            });
        },
        "markers"
    );

    changePropertyIn(
        defaultProperties,
        values,
        prop => {
            prop.objectHeaders = ["Address", "Latitude", "Longitude"];
            prop.objects?.forEach((object, index) => {
                const column = values.dynamicMarkers[index];
                object.captions = [column.address, column.latitude, column.longitude];
            });
        },
        "dynamicMarkers"
    );

    return defaultProperties;
}

export function check(values: Omit<MapsPreviewProps, "className" | "style" | "readOnly">): Problem[] {
    const errors: Problem[] = [];
    const zoomLevels = ["world", "continent", "country", "city", "town", "streets", "building"];
    const defaultZoomLevelIndex = zoomLevels.indexOf(values.defaultZoomLevel);
    const minZoomLevelIndex = zoomLevels.indexOf(values.minZoomLevel);
    const maxZoomLevelIndex = zoomLevels.indexOf(values.maxZoomLevel);

    if (minZoomLevelIndex > maxZoomLevelIndex) {
        errors.push({
            property: "minZoomLevel",
            severity: "error",
            message: "The minimum zoom level can not be greater than the maximum zoom level."
        });
    }

    if (defaultZoomLevelIndex < minZoomLevelIndex) {
        errors.push({
            property: "defaultZoomLevel",
            severity: "error",
            message: "The default zoom level can not be smaller than the minimum zoom level."
        });
    } else if (defaultZoomLevelIndex > maxZoomLevelIndex) {
        errors.push({
            property: "defaultZoomLevel",
            severity: "error",
            message: "The default zoom level can not be greater than the maximum zoom level."
        });
    }

    values.markers.forEach((marker, index) => {
        if (marker.locationType === "address") {
            if (!marker.address) {
                errors.push({
                    property: `markers/${index + 1}/address`,
                    message: "A static marker requires an address"
                });
            }
        } else {
            if (!marker.latitude) {
                errors.push({
                    property: `markers/${index + 1}/latitude`,
                    message: "A static marker requires latitude"
                });
            }
            if (!marker.longitude) {
                errors.push({
                    property: `markers/${index + 1}/longitude`,
                    message: "A static marker requires longitude"
                });
            }
        }
    });

    values.dynamicMarkers.forEach((marker, index) => {
        if (!marker.markersDS || ("type" in marker.markersDS && marker.markersDS.type === "null")) {
            errors.push({
                property: `dynamicMarkers/${index + 1}/markersDS`,
                message: "A data source should be selected in order to retrieve a list of markers"
            });
        } else {
            if (marker.locationDynamicType === "address") {
                if (!marker.address) {
                    errors.push({
                        property: `dynamicMarkers/${index + 1}/address`,
                        message: "A dynamic marker requires an address"
                    });
                }
            } else {
                if (!marker.latitude) {
                    errors.push({
                        property: `dynamicMarkers/${index + 1}/latitude`,
                        message: "A dynamic marker requires latitude"
                    });
                }
                if (!marker.longitude) {
                    errors.push({
                        property: `dynamicMarkers/${index + 1}/longitude`,
                        message: "A dynamic marker requires longitude"
                    });
                }
            }
        }
    });

    return errors;
}
