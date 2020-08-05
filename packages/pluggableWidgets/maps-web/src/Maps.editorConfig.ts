import { hidePropertiesIn, hidePropertyIn, Problem, Properties } from "@widgets-resources/piw-utils";
import { MapsPreviewProps } from "../typings/MapsProps";

export function getProperties(
    values: MapsPreviewProps,
    defaultProperties: Properties,
    target: "web" | "desktop"
): Properties {
    if (target === "desktop") {
        if (values.apiKey) {
            hidePropertyIn(defaultProperties, values, "apiKeyExp");
        } else {
            hidePropertyIn(defaultProperties, values, "apiKey");
        }
        if (values.geodecodeApiKey) {
            hidePropertyIn(defaultProperties, values, "geodecodeApiKeyExp");
        } else {
            hidePropertyIn(defaultProperties, values, "geodecodeApiKey");
        }
    } else {
        if (values.apiKeyExp) {
            hidePropertyIn(defaultProperties, values, "apiKey");
        } else {
            hidePropertyIn(defaultProperties, values, "apiKeyExp");
        }
        if (values.geodecodeApiKeyExp) {
            hidePropertyIn(defaultProperties, values, "geodecodeApiKey");
        } else {
            hidePropertyIn(defaultProperties, values, "geodecodeApiKeyExp");
        }
    }

    if (!values.advanced) {
        hidePropertiesIn(defaultProperties, values, [
            "mapProvider",
            "mapStyles",
            "geodecodeApiKeyExp",
            "geodecodeApiKey"
        ]);
    }

    values.markers.forEach((f, index) => {
        if (f.locationType === "address") {
            hidePropertyIn(defaultProperties, values, "markers", index, "latitude");
            hidePropertyIn(defaultProperties, values, "markers", index, "longitude");
        } else {
            hidePropertyIn(defaultProperties, values, "markers", index, "address");
        }
        if (!values.advanced) {
            hidePropertyIn(defaultProperties, values, "markers", index, "markerStyle");
            hidePropertyIn(defaultProperties, values, "markers", index, "customMarker");
        } else if (f.markerStyle === "default") {
            hidePropertyIn(defaultProperties, values, "markers", index, "customMarker");
        }
    });

    values.dynamicMarkers.forEach((f, index) => {
        if (f.locationType === "address") {
            hidePropertyIn(defaultProperties, values, "dynamicMarkers", index, "latitude");
            hidePropertyIn(defaultProperties, values, "dynamicMarkers", index, "longitude");
        } else {
            hidePropertyIn(defaultProperties, values, "dynamicMarkers", index, "address");
        }
        if (!values.advanced) {
            hidePropertyIn(defaultProperties, values, "dynamicMarkers", index, "markerStyleDynamic");
            hidePropertyIn(defaultProperties, values, "dynamicMarkers", index, "customMarkerDynamic");
        } else if (f.markerStyleDynamic === "default") {
            hidePropertyIn(defaultProperties, values, "dynamicMarkers", index, "customMarkerDynamic");
        }
    });

    if (values.mapProvider !== "googleMaps") {
        hidePropertiesIn(defaultProperties, values, [
            "optionStreetView",
            "mapTypeControl",
            "fullScreenControl",
            "rotateControl",
            "mapStyles"
        ]);
        if (values.mapProvider === "openStreet") {
            hidePropertiesIn(defaultProperties, values, ["apiKeyExp", "apiKey"]);
        }
    } else {
        hidePropertyIn(defaultProperties, values, "attributionControl");
    }

    return defaultProperties;
}

export function check(values: MapsPreviewProps): Problem[] {
    const errors: Problem[] = [];

    if (values.mapProvider !== "openStreet" && !values.apiKey && !values.apiKeyExp) {
        errors.push({
            property: "apiKey",
            message: "To avoid errors during map rendering it's necessary to include an Api Key",
            url: "https://docs.mendix.com/appstore/widgets/maps#1-2-limitations"
        });
    } else if (values.advanced && !values.geodecodeApiKeyExp && !values.geodecodeApiKey) {
        errors.push({
            property: "geodecodeApiKey",
            severity: "warning",
            message: "To translate addresses to latitude and longitude a Google API Key is required",
            url: "https://docs.mendix.com/appstore/widgets/maps#1-2-limitations"
        });
    }

    values.markers.forEach(marker => {
        if (marker.locationType === "address") {
            if (!marker.address) {
                errors.push({
                    property: "markers.address",
                    message: "A static marker requires an address"
                });
            }
        } else {
            if (!marker.latitude) {
                errors.push({
                    property: "markers.latitude",
                    message: "A static marker requires latitude"
                });
            }
            if (!marker.longitude) {
                errors.push({
                    property: "markers.longitude",
                    message: "A static marker requires longitude"
                });
            }
        }
        if (values.advanced && marker.markerStyle === "image" && !marker.customMarker) {
            errors.push({
                property: "customMarker",
                message: `Custom marker image is required when shape is 'image' for address ${marker.address}`
            });
        }
    });

    values.dynamicMarkers.forEach((marker, index) => {
        if (!marker.markersDS) {
            errors.push({
                property: "dynamicMarkers.markersDS",
                message: "A data source should be selected in order to retrieve a list of markers"
            });
        }
        if (marker.locationType === "address") {
            if (!marker.address) {
                errors.push({
                    property: "dynamicMarkers.address",
                    message: "A dynamic marker requires an address"
                });
            }
        } else {
            if (!marker.latitude) {
                errors.push({
                    property: "dynamicMarkers.latitude",
                    message: "A dynamic marker requires latitude"
                });
            }
            if (!marker.longitude) {
                errors.push({
                    property: "dynamicMarkers.longitude",
                    message: "A dynamic marker requires longitude"
                });
            }
        }
        if (values.advanced && marker.markerStyleDynamic === "image" && !marker.customMarkerDynamic) {
            errors.push({
                property: "dynamicMarkers.customMarkerDynamic",
                message: `Custom marker image is required when shape is 'image' for list at position ${index + 1}`
            });
        }
    });

    return errors;
}
