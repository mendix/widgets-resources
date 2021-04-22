import { hidePropertiesIn, hidePropertyIn, Problem, Properties } from "@mendix/piw-utils-internal";
import { MapsPreviewProps } from "../typings/MapsProps";

export function getProperties(values: MapsPreviewProps, defaultProperties: Properties): Properties {
    [...values.markers, ...values.dynamicMarkers].forEach((f, index) => {
        if (f.locationType === "address") {
            hidePropertyIn(defaultProperties, values, "markers", index, "latitude");
            hidePropertyIn(defaultProperties, values, "markers", index, "longitude");
        } else {
            hidePropertyIn(defaultProperties, values, "markers", index, "address");
        }
    });

    if (values.fitToMarkers) {
        hidePropertiesIn(defaultProperties, values, ["centerAddress", "centerLatitude", "centerLongitude"]);

        if (values.markers.length > 1) {
            hidePropertyIn(defaultProperties, values, "defaultZoomLevel");
        }
    }

    return defaultProperties;
}

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
        // @ts-ignore
        if (marker.markersDS.type === "null") {
            errors.push({
                property: `dynamicMarkers/${index + 1}/markersDS`,
                message: "A data source should be selected in order to retrieve a list of markers"
            });
        } else {
            if (marker.locationType === "address") {
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
