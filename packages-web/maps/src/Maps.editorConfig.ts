import { hidePropertiesIn, hidePropertyIn, Problem, Properties } from "@widgets-resources/piw-utils";
import { MapsPreviewProps } from "../typings/MapsProps";

export function getProperties(values: MapsPreviewProps, defaultProperties: Properties): Properties {
    if (!values.advanced) {
        hidePropertiesIn<MapsPreviewProps>(defaultProperties, ["mapProvider", "mapStyles", "geodecodeApiKey"]);
    }

    values.markers.forEach((f, index) => {
        if (f.locationType === "address") {
            hidePropertyIn<MapsPreviewProps>(defaultProperties, "markers", index, "latitude");
            hidePropertyIn<MapsPreviewProps>(defaultProperties, "markers", index, "longitude");
        } else {
            hidePropertyIn<MapsPreviewProps>(defaultProperties, "markers", index, "address");
        }
        if (!values.advanced) {
            hidePropertyIn<MapsPreviewProps>(defaultProperties, "markers", index, "markerStyle");
            hidePropertyIn<MapsPreviewProps>(defaultProperties, "markers", index, "customMarker");
        } else if (f.markerStyle === "default") {
            hidePropertyIn<MapsPreviewProps>(defaultProperties, "markers", index, "customMarker");
        }
    });

    values.dynamicMarkers.forEach((f, index) => {
        if (f.locationType === "address") {
            hidePropertyIn<MapsPreviewProps>(defaultProperties, "dynamicMarkers", index, "latitude");
            hidePropertyIn<MapsPreviewProps>(defaultProperties, "dynamicMarkers", index, "longitude");
        } else {
            hidePropertyIn<MapsPreviewProps>(defaultProperties, "dynamicMarkers", index, "address");
        }
        if (!values.advanced) {
            hidePropertyIn<MapsPreviewProps>(defaultProperties, "dynamicMarkers", index, "markerStyleDynamic");
        } else if (f.markerStyleDynamic === "default") {
            hidePropertyIn<MapsPreviewProps>(defaultProperties, "dynamicMarkers", index, "customMarkerDynamic");
        }
    });

    if (values.mapProvider !== "googleMaps") {
        hidePropertiesIn<MapsPreviewProps>(defaultProperties, [
            "optionStreetView",
            "mapTypeControl",
            "fullScreenControl",
            "rotateControl",
            "mapStyles"
        ]);
        if (values.mapProvider === "openStreet") {
            hidePropertyIn<MapsPreviewProps>(defaultProperties, "apiKey");
        }
    } else {
        hidePropertyIn<MapsPreviewProps>(defaultProperties, "attributionControl");
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
