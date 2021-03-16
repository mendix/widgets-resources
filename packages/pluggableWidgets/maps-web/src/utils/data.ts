import { ObjectItem, ValueStatus } from "mendix";
import { DynamicMarkersType, MarkersType } from "../../typings/MapsProps";
import { ModeledMarker } from "../../typings/shared";

export declare type Option<T> = T | undefined;

export function convertStaticModeledMarker(marker: MarkersType): ModeledMarker {
    return {
        address: marker.address?.value,
        latitude: Number(marker.latitude?.value),
        longitude: Number(marker.longitude?.value),
        title: marker.title?.value,
        action: marker.onClick?.execute,
        customMarker: marker.customMarker?.value?.uri
    };
}

export function convertDynamicModeledMarker(marker: DynamicMarkersType): ModeledMarker[] {
    if (marker.markersDS && marker.markersDS.status === ValueStatus.Available) {
        return marker.markersDS.items?.map(item => fromDatasource(marker, item)) ?? [];
    }
    return [];
}

function fromDatasource(marker: DynamicMarkersType, item: ObjectItem): ModeledMarker {
    const { locationType, address: addr, latitude: lat, longitude: lng, onClickAttribute, title } = marker;
    let address;
    let latitude;
    let longitude;
    if (locationType === "address") {
        address = addr ? addr.get(item).value : undefined;
    } else {
        latitude = lat ? Number(lat.get(item).value) : undefined;
        longitude = lng ? Number(lng.get(item).value) : undefined;
    }
    return {
        address,
        latitude,
        longitude,
        title: title ? title.get(item).value : "",
        action: onClickAttribute ? onClickAttribute.get(item).execute : undefined,
        customMarker: marker.customMarkerDynamic?.value?.uri
    };
}
