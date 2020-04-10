import { DynamicMarkersType, MarkersType, ModeledMarker } from "../../typings";
import { ObjectItem, ValueStatus } from "mendix";

export const analyzeStaticMarker = (marker: MarkersType): ModeledMarker => {
    return {
        address: marker.address?.value,
        latitude: Number(marker.latitude?.value),
        longitude: Number(marker.longitude?.value),
        title: marker.title?.value,
        action: marker.onClick?.execute,
        customMarker: marker.customMarker?.value?.uri
    };
};

export const analyzeDynamicMarker = (marker: DynamicMarkersType, item: ObjectItem): ModeledMarker => {
    const { locationType, address: addr, latitude: lat, longitude: lng, onClickAttribute, title } = marker;
    let address;
    let latitude;
    let longitude;
    if (locationType === "address") {
        address = addr ? addr(item).value : undefined;
    } else {
        latitude = lat ? Number(lat(item).value) : undefined;
        longitude = lng ? Number(lng(item).value) : undefined;
    }
    return {
        address,
        latitude,
        longitude,
        title: title ? title(item).value : "",
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
