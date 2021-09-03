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
        description: marker.description?.value,
        onClick: marker.onClick,
        icon: marker.icon?.value,
        iconSize: Number(marker.iconSize),
        iconColor: marker.iconColor
    };
}

export function convertDynamicModeledMarker(marker: DynamicMarkersType): ModeledMarker[] {
    if (marker.markersDS && marker.markersDS.status === ValueStatus.Available) {
        return marker.markersDS.items?.map(item => fromDatasource(marker, item)) ?? [];
    }
    return [];
}

function fromDatasource(marker: DynamicMarkersType, item: ObjectItem): ModeledMarker {
    const {
        locationDynamicType,
        address,
        latitude,
        longitude,
        onClick,
        title,
        description,
        icon,
        iconSize,
        iconColor
    } = marker;
    return {
        address: locationDynamicType === "address" && address ? address.get(item).value : undefined,
        latitude: locationDynamicType === "latlng" && latitude ? Number(latitude.get(item).value) : undefined,
        longitude: locationDynamicType === "latlng" && longitude ? Number(longitude.get(item).value) : undefined,
        title: title ? title.get(item).value : "",
        description: description ? description.get(item).value : "",
        onClick: onClick ? onClick.get(item) : undefined,
        icon: icon ? icon.value : undefined,
        iconSize: iconSize ? Number(iconSize) : undefined,
        iconColor: iconColor ? iconColor : undefined
    };
}
