import { hidePropertiesIn, hidePropertyIn, Problem, Properties } from "@widgets-resources/piw-utils";
import { MapsPreviewProps } from "../typings/MapsProps";

export function getProperties(values: MapsPreviewProps, defaultProperties: Properties): Properties {
    if (!values.advanced) {
        hidePropertiesIn(defaultProperties, values, ["mapProvider", "mapStyles", "geodecodeApiKey"]);
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
            hidePropertyIn(defaultProperties, values, "apiKey");
        }
    } else {
        hidePropertyIn(defaultProperties, values, "attributionControl");
    }

    return defaultProperties;
}

export function check(values: MapsPreviewProps): Problem[] {
    const errors: Problem[] = [];

    if (values.mapProvider !== "openStreet" && !values.apiKey) {
        errors.push({
            property: "apiKey",
            message: "To avoid errors during map rendering it's necessary to include an Api Key",
            url: "https://github.com/mendix/widgets-resources/blob/master/packages-web/maps/README.md#limitations"
        });
    } else if (values.advanced && !values.geodecodeApiKey) {
        errors.push({
            property: "geodecodeApiKey",
            severity: "warning",
            message: "To translate addresses to latitude and longitude a Google API Key is required",
            url: "https://github.com/mendix/widgets-resources/blob/master/packages-web/maps/README.md#limitations"
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

    values.dynamicMarkers.forEach(marker => {
        if (!marker.markersDS) {
            errors.push({
                property: "dynamicMarkers.markersDS",
                message: "A data source should be selected in order to retrieve a list of markers"
            });
        }
    });

    return errors;
}
