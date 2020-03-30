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
        if (target === "web") {
            return defaultProperties;
        }
        hideProperty<MarkersType>("markerStyle", defaultProperties);
        hideProperty<DynamicMarkersType>("markerStyleDynamic", defaultProperties);
        hideProperty<MarkersType>("customMarker", defaultProperties);
    }

    values.markers.forEach((f, index) => {
        if (f.dataSourceType === "static") {
            hideProperty<MarkersType>("propertyContext", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("addressAttribute", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("addressExpression", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("latitudeAttribute", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("latitudeExpression", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("longitudeAttribute", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("longitudeExpression", defaultPropertiesForMarkers?.[index]);
        } else {
            hideProperty<MarkersType>("address", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("latitude", defaultPropertiesForMarkers?.[index]);
            hideProperty<MarkersType>("longitude", defaultPropertiesForMarkers?.[index]);
            if (f.propertyContext === "attribute" || target === "web") {
                // Studio doesnt support expression
                hideProperty<MarkersType>("addressExpression", defaultPropertiesForMarkers?.[index]);
                hideProperty<MarkersType>("latitudeExpression", defaultPropertiesForMarkers?.[index]);
                hideProperty<MarkersType>("longitudeExpression", defaultPropertiesForMarkers?.[index]);
            } else {
                hideProperty<MarkersType>("addressAttribute", defaultPropertiesForMarkers?.[index]);
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
                    marker.addressExpression}`,
                url: "https://mendix.com"
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
    // if (values.markersDS) {
    //     if (!values.locationAttribute) {
    //         errors.push({
    //             property: "locationAttribute",
    //             severity: "error",
    //             message: "Location attribute is required for Dynamic data source",
    //             url: ""
    //         });
    //     }
    // }
    return errors;
}
