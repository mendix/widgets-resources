import { DynamicMarkersType, MarkersType } from "../../typings";
import { ObjectItem, ValueStatus } from "mendix";
import { ModeledMarker } from "../../typings";

export const analyzeStaticMarker = (marker: MarkersType): ModeledMarker => {
    let address, title, latitude, longitude;
    if (marker.dataSourceType === "static") {
        title = marker.title;
        if (marker.locationType === "address") {
            address = marker.address;
        } else {
            latitude = Number(marker.latitude);
            longitude = Number(marker.longitude);
        }
    } else {
        if (marker.propertyContext === "attribute") {
            title = marker.titleAttribute?.value;
            if (marker.locationType === "address") {
                address = marker.addressAttribute?.value;
            } else {
                latitude = Number(marker.latitudeAttribute?.value);
                longitude = Number(marker.longitudeAttribute?.value);
            }
        } else {
            title = marker.titleExpression?.value;
            if (marker.locationType === "address") {
                address = marker.addressExpression?.value;
            } else {
                latitude = Number(marker.latitudeExpression?.value);
                longitude = Number(marker.longitudeExpression?.value);
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

// export const analyzeMarkers = async (
//     staticMarkers: MarkersType[],
//     dynamicMarkers: DynamicMarkersType[],
//     googleApiKey?: string
// ) => {
//     const markers = useMemo(() => {
//         const markers: ModeledMarker[] = [];
//         markers.push(...staticMarkers.map(marker => analyzeStaticMarker(marker)));
//         markers.push(
//             ...dynamicMarkers
//                 .map(marker => analyzeDataSource(marker))
//                 .reduce((prev, current) => [...prev, ...current], [])
//         );
//         return markers;
//     }, []);
//     try {
//         return await analyzeLocations(markers, googleApiKey);
//     } catch (e) {
//         return [];
//     }
// };

// export const countTotalMarkers = (markers: MarkersType[], markersDynamic: DynamicMarkersType[]): number => {
//     const count = markers.length;
//     const dynamicCount =
//         markersDynamic
//             .filter(m => m.markersDS && m.markersDS.items)
//             .map(marker => marker.markersDS!.items!.length)
//             .reduce((a, b) => a + b, 0) || 0;
//     console.warn("Total amount of locations", count + dynamicCount);
//     return count + dynamicCount;
// };

// export const getValue = (property?: DynamicValue<any> | EditableValue<any>): Option<any> => {
//     return property && property.status === ValueStatus.Available && property.value ? property.value : undefined;
// };
