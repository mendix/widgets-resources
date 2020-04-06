import { DynamicMarkersType, MapsPreviewProps, MarkersType } from "../typings";
import { hideProperty, Problem, Properties } from "@widgets-resources/piw-utils";

export function getProperties(
    values: MapsPreviewProps,
    defaultProperties: Properties,
    target: "web" | "desktop"
): Properties {
    const defaultPropertiesForMarkers = defaultProperties?.[0].propertyGroups?.[0].properties?.[0].properties; // First config, first group, first property
    const defaultPropertiesForDynamicMarkers = defaultProperties?.[0].propertyGroups?.[0].properties?.[1].properties; // First config, first group, second property
    // console.log(JSON.stringify(defaultProperties));
    // console.log(target); The epic is still waiting to be merged by PageEditor
    if (!values.advanced) {
        hideProperty<MarkersType>("markerStyle", defaultProperties);
        hideProperty<DynamicMarkersType>("markerStyleDynamic", defaultProperties);
        hideProperty<MarkersType>("customMarker", defaultProperties);
        hideProperty<MapsPreviewProps>("mapProvider", defaultProperties);
        hideProperty<MapsPreviewProps>("mapStyles", defaultProperties);
    }

    values.markers.forEach((f, index) => {
        const properties = defaultPropertiesForMarkers?.[index];
        if (f.dataSourceType === "static") {
            hideProperty<MarkersType>("propertyContext", properties);
            hideProperty<MarkersType>("addressAttribute", properties);
            hideProperty<MarkersType>("addressExpression", properties);
            hideProperty<MarkersType>("titleAttribute", properties);
            hideProperty<MarkersType>("titleExpression", properties);
            hideProperty<MarkersType>("latitudeAttribute", properties);
            hideProperty<MarkersType>("latitudeExpression", properties);
            hideProperty<MarkersType>("longitudeAttribute", properties);
            hideProperty<MarkersType>("longitudeExpression", properties);
        } else {
            hideProperty<MarkersType>("address", properties);
            hideProperty<MarkersType>("title", properties);
            hideProperty<MarkersType>("latitude", properties);
            hideProperty<MarkersType>("longitude", properties);
            if (f.propertyContext === "attribute" || target === "web") {
                // Studio doesnt support expression
                hideProperty<MarkersType>("addressExpression", properties);
                hideProperty<MarkersType>("titleExpression", properties);
                hideProperty<MarkersType>("latitudeExpression", properties);
                hideProperty<MarkersType>("longitudeExpression", properties);
            } else {
                hideProperty<MarkersType>("addressAttribute", properties);
                hideProperty<MarkersType>("titleAttribute", properties);
                hideProperty<MarkersType>("latitudeAttribute", properties);
                hideProperty<MarkersType>("longitudeAttribute", properties);
            }
        }
        if (f.locationType === "address") {
            hideProperty<MarkersType>("latitude", properties);
            hideProperty<MarkersType>("latitudeAttribute", properties);
            hideProperty<MarkersType>("latitudeExpression", properties);
            hideProperty<MarkersType>("longitude", properties);
            hideProperty<MarkersType>("longitudeAttribute", properties);
            hideProperty<MarkersType>("longitudeExpression", properties);
        } else {
            hideProperty<MarkersType>("address", properties);
            hideProperty<MarkersType>("addressAttribute", properties);
            hideProperty<MarkersType>("addressExpression", properties);
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
            hideProperty<DynamicMarkersType>("latitude", properties);
            hideProperty<DynamicMarkersType>("longitude", properties);
        } else {
            hideProperty<DynamicMarkersType>("address", properties);
        }
        if (f.markerStyleDynamic === "default") {
            hideProperty<DynamicMarkersType>("customMarkerDynamic", properties);
        }
    });

    if (values.mapProvider !== "googleMaps") {
        hideProperty<MapsPreviewProps>("optionStreetView", defaultProperties);
        hideProperty<MapsPreviewProps>("mapTypeControl", defaultProperties);
        hideProperty<MapsPreviewProps>("fullScreenControl", defaultProperties);
        hideProperty<MapsPreviewProps>("rotateControl", defaultProperties);
        hideProperty<MapsPreviewProps>("mapStyles", defaultProperties);
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
                severity: "error",
                message: `Custom marker image is required when shape is 'image' for address ${marker.address ??
                    marker.addressAttribute ??
                    marker.addressExpression}`
            });
        });
    if (!values.apiKey) {
        errors.push({
            property: "apiKey",
            severity: "error",
            message: "To avoid errors during map rendering it's necessary to include an Api Key",
            url: "https://github.com/mendix/widgets-resources/blob/master/packages-web/maps/README.md#limitations"
        });
    }

    values.markers.forEach(marker => {
        if (marker.dataSourceType === "static") {
            if (marker.locationType === "address") {
                if (!marker.address) {
                    errors.push({
                        property: "markers.address",
                        severity: "error",
                        message: "A static marker requires an address"
                    });
                }
            } else {
                if (!marker.latitude) {
                    errors.push({
                        property: "markers.latitude",
                        severity: "error",
                        message: "A static marker requires latitude"
                    });
                }
                if (!marker.longitude) {
                    errors.push({
                        property: "markers.longitude",
                        severity: "error",
                        message: "A static marker requires longitude"
                    });
                }
            }
        } else if (marker.propertyContext === "attribute") {
            if (marker.locationType === "address") {
                if (!marker.addressAttribute) {
                    errors.push({
                        property: "markers.addressAttribute",
                        severity: "error",
                        message: "A static marker requires an address attribute"
                    });
                }
            } else {
                if (!marker.latitudeAttribute) {
                    errors.push({
                        property: "markers.latitudeAttribute",
                        severity: "error",
                        message: "A static marker requires latitude attribute"
                    });
                }
                if (!marker.longitudeAttribute) {
                    errors.push({
                        property: "markers.longitudeAttribute",
                        severity: "error",
                        message: "A static marker requires longitude attribute"
                    });
                }
            }
        } else {
            if (marker.locationType === "address") {
                if (!marker.addressExpression) {
                    errors.push({
                        property: "markers.addressExpression",
                        severity: "error",
                        message: "A static marker requires an address expression"
                    });
                }
            } else {
                if (!marker.latitudeExpression) {
                    errors.push({
                        property: "markers.latitudeExpression",
                        severity: "error",
                        message: "A static marker requires latitude expression"
                    });
                }
                if (!marker.longitudeExpression) {
                    errors.push({
                        property: "markers.longitudeExpression",
                        severity: "error",
                        message: "A static marker requires longitude expression"
                    });
                }
            }
        }
    });

    values.dynamicMarkers.forEach(marker => {
        // @ts-ignore
        if (marker.markersDS?.type === "null") {
            errors.push({
                property: "dynamicMarkers.markersDS",
                severity: "error",
                message: "A data source should be selected in order to retrieve a list of markers"
            });
        }
    });

    return errors;
}
