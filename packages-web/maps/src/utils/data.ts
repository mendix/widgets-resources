import { DynamicMarkersType, MarkersType } from "../../typings";
import { DynamicValue, EditableValue, ObjectItem, ValueStatus } from "mendix";
import { v4 as uuid } from "uuid";
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
        uuid: uuid(),
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
        uuid: item.id,
        address,
        latitude,
        longitude,
        title: title ? getValue(title(item)) : "",
        action: onClickAttribute ? onClickAttribute(item).execute : undefined,
        customMarker: marker.customMarkerDynamic?.value?.uri
    };
};

export const getValue = (property?: DynamicValue<any> | EditableValue<any>): Option<any> => {
    return property && property.status === ValueStatus.Available && property.value ? property.value : undefined;
};
