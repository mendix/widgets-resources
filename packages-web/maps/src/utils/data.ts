import { DynamicMarkersType, MarkersType } from "../../typings";
import { DynamicValue, EditableValue, ObjectItem, ValueStatus } from "mendix";
import { ModeledMarker } from "../../typings";
import { Option } from "./index";

export const analyzeStaticMarker = (marker: MarkersType): ModeledMarker => {
    let address, title, latitude, longitude;
    if (marker.dataSourceType === "static") {
        title = marker.title;
        if (marker.locationType === "address") {
            address = marker.address;
        } else {
            latitude = marker.latitude;
            longitude = marker.longitude;
        }
    } else {
        if (marker.propertyContext === "attribute") {
            title = getValue(marker.titleAttribute);
            if (marker.locationType === "address") {
                address = getValue(marker.addressAttribute);
            } else {
                latitude = getValue(marker.latitudeAttribute);
                longitude = getValue(marker.longitudeAttribute);
            }
        } else {
            title = getValue(marker.titleExpression);
            if (marker.locationType === "address") {
                address = getValue(marker.addressExpression);
            } else {
                latitude = getValue(marker.latitudeExpression);
                longitude = getValue(marker.longitudeExpression);
            }
        }
    }

    return {
        address,
        latitude,
        longitude,
        title,
        action: marker.onClick?.execute,
        customMarker: marker.customMarker?.value?.uri
    };
};

export const analyzeDynamicMarker = (marker: DynamicMarkersType, item: ObjectItem): ModeledMarker => {
    const { locationType, address: addr, latitude: lat, longitude: lng, onClickAttribute, title } = marker;
    let address, latitude, longitude;
    if (locationType === "address") {
        address = addr ? getValue(addr(item)) : "";
    } else {
        latitude = lat ? getValue(lat(item)) : undefined;
        longitude = lng ? getValue(lng(item)) : undefined;
    }
    return {
        address,
        latitude,
        longitude,
        title: title ? getValue(title(item)) : "",
        action: onClickAttribute ? onClickAttribute(item).execute : undefined,
        customMarker: marker.customMarkerDynamic?.value?.uri
    };
};

export const analyzeDataSource = (marker: DynamicMarkersType): ModeledMarker[] => {
    if (marker.markersDS && marker.markersDS.status === ValueStatus.Available) {
        return marker.markersDS.items?.map(item => analyzeDynamicMarker(marker, item)) ?? [];
    }
    return [];
};

export const countTotalMarkers = (markers: MarkersType[], markersDynamic: DynamicMarkersType[]): number => {
    const count = markers.length;
    const dynamicCount =
        markersDynamic
            .filter(m => m.markersDS && m.markersDS.items)
            .map(marker => marker.markersDS!.items!.length)
            .reduce((a, b) => a + b, 0) || 0;
    console.warn("Total amount of locations", count + dynamicCount);
    return count + dynamicCount;
};

export const getValue = (property?: DynamicValue<any> | EditableValue<any>): Option<any> => {
    return property && property.status === ValueStatus.Available && property.value ? property.value : undefined;
};
