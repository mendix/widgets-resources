import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import { hidePropertiesIn, hidePropertyIn, Problem, Properties } from "@mendix/pluggable-widgets-tools";

import { MapsPreviewProps } from "../typings/MapsProps";

import GoogleMapsSVG from "./assets/GoogleMaps.svg";
import MapboxSVG from "./assets/Mapbox.svg";
import OpenStreetMapSVG from "./assets/OpenStreetMap.svg";
import HereMapsSVG from "./assets/HereMaps.svg";

export function getProperties(
    values: MapsPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    const containsAddress =
        values.markers.some(marker => marker.locationType === "address") ||
        values.dynamicMarkers.some(marker => marker.locationType === "address");

    if (platform === "desktop") {
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

        hidePropertyIn(defaultProperties, values, "advanced");
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

        if (!values.advanced) {
            hidePropertiesIn(defaultProperties, values, ["mapProvider", "mapStyles"]);
        }
    }

    values.markers.forEach((f, index) => {
        if (f.locationType === "address") {
            hidePropertyIn(defaultProperties, values, "markers", index, "latitude");
            hidePropertyIn(defaultProperties, values, "markers", index, "longitude");
        } else {
            hidePropertyIn(defaultProperties, values, "markers", index, "address");
        }
        if (platform === "web" && !values.advanced) {
            hidePropertyIn(defaultProperties, values, "markers", index, "markerStyle");
            hidePropertyIn(defaultProperties, values, "markers", index, "customMarker");
        }
        if (f.markerStyle === "default") {
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
        if (platform === "web" && !values.advanced) {
            hidePropertyIn(defaultProperties, values, "dynamicMarkers", index, "markerStyleDynamic");
            hidePropertyIn(defaultProperties, values, "dynamicMarkers", index, "customMarkerDynamic");
        }
        if (f.markerStyleDynamic === "default") {
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

    if (!containsAddress) {
        hidePropertiesIn(defaultProperties, values, ["geodecodeApiKey", "geodecodeApiKeyExp"]);
    }

    return defaultProperties;
}

export function check(values: MapsPreviewProps): Problem[] {
    const errors: Problem[] = [];
    const containsAddress =
        values.markers.some(marker => marker.locationType === "address") ||
        values.dynamicMarkers.some(marker => marker.locationType === "address");

    if (values.mapProvider !== "openStreet" && !values.apiKey && !values.apiKeyExp) {
        errors.push({
            property: "apiKey",
            message: "To avoid errors during map rendering it's necessary to include an Api Key",
            url: "https://docs.mendix.com/appstore/widgets/maps#1-2-limitations"
        });
    }

    if (containsAddress && !values.geodecodeApiKeyExp && !values.geodecodeApiKey) {
        errors.push({
            property: "geodecodeApiKey",
            message: "To translate addresses to latitude and longitude a Geo Location API key is required",
            url: "https://docs.mendix.com/appstore/widgets/maps#1-2-limitations"
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
        if (marker.markerStyle === "image" && !marker.customMarker) {
            errors.push({
                property: `markers/${index + 1}/customMarker`,
                message: `Custom marker image is required when shape is 'image' for address ${marker.address}`
            });
        }
    });

    values.dynamicMarkers.forEach((marker, index) => {
        if (!marker.markersDS || ("type" in marker.markersDS && marker.markersDS.type === "null")) {
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
        if (marker.markerStyleDynamic === "image" && !marker.customMarkerDynamic) {
            errors.push({
                property: `dynamicMarkers/${index + 1}/customMarkerDynamic`,
                message: `Custom marker image is required when shape is 'image' for list at position ${index + 1}`
            });
        }
    });

    return errors;
}

export function getPreview(values: MapsPreviewProps): StructurePreviewProps {
    const { mapProvider } = values;
    let image: string;

    switch (mapProvider) {
        case "googleMaps":
            image = GoogleMapsSVG;
            break;
        case "mapBox":
            image = MapboxSVG;
            break;
        case "openStreet":
            image = OpenStreetMapSVG;
            break;
        case "hereMaps":
            image = HereMapsSVG;
            break;
    }

    return {
        type: "Image",
        document: decodeURIComponent(image.replace("data:image/svg+xml,", "")),
        width: 375,
        height: 375
    };
}
