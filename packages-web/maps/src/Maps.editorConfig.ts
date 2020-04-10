import { DynamicMarkersType, MapsPreviewProps, MarkersType } from "../typings";
import { hideProperties, hideProperty, Problem, Properties } from "@widgets-resources/piw-utils";

export function getProperties(values: MapsPreviewProps, defaultProperties: Properties): Properties {
    const defaultPropertiesForMarkers = defaultProperties?.[0].propertyGroups?.[0].properties?.[0].properties; // First config, first group, first property
    const defaultPropertiesForDynamicMarkers = defaultProperties?.[0].propertyGroups?.[0].properties?.[1].properties; // First config, first group, second property
    if (!values.advanced) {
        hideProperties<MarkersType>(["markerStyle", "customMarker"], defaultProperties);
        hideProperties<MapsPreviewProps>(["mapProvider", "mapStyles", "geodecodeApiKey"], defaultProperties);
        hideProperty<DynamicMarkersType>("markerStyleDynamic", defaultProperties);
    }

    values.markers.forEach((f, index) => {
        const properties = defaultPropertiesForMarkers?.[index];
        if (f.locationType === "address") {
            hideProperties<MarkersType>(["latitude", "longitude"], properties);
        } else {
            hideProperty<MarkersType>("address", properties);
        }
        if (f.markerStyle === "default") {
            hideProperty<MarkersType>(
                "customMarker",
                properties // First config, first group, first property
            );
        }
    });

    values.dynamicMarkers.forEach((f, index) => {
        const properties = defaultPropertiesForDynamicMarkers?.[index];
        if (f.locationType === "address") {
            hideProperties<DynamicMarkersType>(["latitude", "longitude"], properties);
        } else {
            hideProperty<DynamicMarkersType>("address", properties);
        }
        if (f.markerStyleDynamic === "default") {
            hideProperty<DynamicMarkersType>("customMarkerDynamic", properties);
        }
    });

    if (values.mapProvider !== "googleMaps") {
        hideProperties<MapsPreviewProps>(
            ["optionStreetView", "mapTypeControl", "fullScreenControl", "rotateControl", "mapStyles"],
            defaultProperties
        );
        if (values.mapProvider === "openStreet") {
            hideProperty<MapsPreviewProps>("apiKey", defaultProperties);
        }
    } else {
        hideProperty<MapsPreviewProps>("attributionControl", defaultProperties);
    }

    return defaultProperties;
}

export function check(values: MapsPreviewProps): Problem[] {
    const errors: Problem[] = [];
    values.markers
        .filter(marker => values.advanced && marker.markerStyle === "image" && !marker.customMarker)
        .forEach(marker => {
            errors.push({
                property: "customMarker",
                message: `Custom marker image is required when shape is 'image' for address ${marker.address}`
            });
        });
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
