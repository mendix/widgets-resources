import { DynamicMarkersType, MapsPreviewProps, MarkersType } from "../typings/MapsProps";
import { Problem, Properties } from "../typings/PageEditor";
import { hideProperty } from "./utils/PageEditorUtils";

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
    }

    values.markers.forEach((f, index) => {
        if (f.dataSourceType === "static") {
            hideProperty<MarkersType>("propertyContext", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("addressAttribute", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("addressExpression", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("titleAttribute", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("titleExpression", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("latitudeAttribute", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("latitudeExpression", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("longitudeAttribute", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("longitudeExpression", defaultPropertiesForMarkers?.[index]);
        } else {
            hideProperty<MarkersType>("address", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("title", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("latitude", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("longitude", defaultPropertiesForMarkers?.[index]);
            if (f.propertyContext === "attribute" || target === "web") {
                // Studio doesnt support expression
                hideProperty<MarkersType>("addressExpression", defaultPropertiesForMarkers?.[index]);
                hideProperty<MarkersType>("titleExpression", defaultPropertiesForMarkers?.[index]);
                hideProperty<MarkersType>("latitudeExpression", defaultPropertiesForMarkers?.[index]);
                hideProperty<MarkersType>("longitudeExpression", defaultPropertiesForMarkers?.[index]);
            } else {
                hideProperty<MarkersType>("addressAttribute", defaultPropertiesForMarkers?.[index]);
                hideProperty<MarkersType>("titleAttribute", defaultPropertiesForMarkers?.[index]);
                hideProperty<MarkersType>("latitudeAttribute", defaultPropertiesForMarkers?.[index]);
                hideProperty<MarkersType>("longitudeAttribute", defaultPropertiesForMarkers?.[index]);
            }
        }
        if (f.locationType === "address") {
            hideProperty<MarkersType>("latitude", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("latitudeAttribute", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("latitudeExpression", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("longitude", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("longitudeAttribute", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("longitudeExpression", defaultPropertiesForMarkers?.[index]);
        } else {
            hideProperty<MarkersType>("address", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("addressAttribute", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("addressExpression", defaultPropertiesForMarkers?.[index]);
        }
        if (f.markerStyle === "default") {
            hideProperty<MarkersType>(
                "customMarker",
                defaultPropertiesForMarkers?.[index] // First config, first group, first property
            );
        }
    });

    values.dynamicMarkers.forEach((f, index) => {
        if (f.locationType === "address") {
            hideProperty<DynamicMarkersType>("latitude", defaultPropertiesForDynamicMarkers?.[index]);
            hideProperty<DynamicMarkersType>("longitude", defaultPropertiesForDynamicMarkers?.[index]);
        } else {
            hideProperty<DynamicMarkersType>("address", defaultPropertiesForDynamicMarkers?.[index]);
        }
        if (f.markerStyleDynamic === "default") {
            hideProperty<DynamicMarkersType>("customMarkerDynamic", defaultPropertiesForDynamicMarkers?.[index]);
        }
    });

    if (values.mapProvider !== "googleMaps") {
        hideProperty<MapsPreviewProps>("optionStreetView", defaultProperties);
        hideProperty<MapsPreviewProps>("mapTypeControl", defaultProperties);
        hideProperty<MapsPreviewProps>("fullScreenControl", defaultProperties);
        hideProperty<MapsPreviewProps>("rotateControl", defaultProperties);
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
