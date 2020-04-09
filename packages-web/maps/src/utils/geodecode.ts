import { Marker, ModeledMarker } from "../../typings";

export interface LatLng {
    latitude: number;
    longitude: number;
}

export const analyzeLocations = (locations?: ModeledMarker[], mapToken?: string): Promise<Marker[]> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<Marker[]>(async (resolve, reject) => {
        const unknownLatitudeLongitudes = locations?.filter(l => l.address && !l.latitude && !l.longitude) || [];
        const latitudeLongitudes = locations?.filter(l => !l.address && l.latitude && l.longitude) || [];

        const markerLocations: Marker[] = latitudeLongitudes.map(location => ({
            latitude: location.latitude!,
            longitude: location.longitude!,
            url: location.customMarker || "",
            onClick: location.action,
            title: location.title
        }));

        if (unknownLatitudeLongitudes.length > 0) {
            if (!mapToken) {
                reject(new Error("API key required in order to use markers containing address"));
            }

            const resolvedMarkers = await Promise.all(
                unknownLatitudeLongitudes.map(async location => {
                    try {
                        const decodedAddress = await geocode(location.address!, mapToken!);
                        return {
                            latitude: decodedAddress.latitude,
                            longitude: decodedAddress.longitude,
                            url: location.customMarker ?? "",
                            title: location.title ?? "",
                            onClick: location.action ?? undefined
                        } as Marker;
                    } catch (e) {
                        console.error(`Failed to retrieve a location for the provided address: ${location.address}`, e);
                        return undefined;
                    }
                })
            );
            markerLocations.push(...(resolvedMarkers.filter(r => !!r) as Marker[]));
            resolve(markerLocations);
        } else {
            resolve(markerLocations);
        }
    });
};

const geocode = (address: string, mapToken: string): Promise<LatLng> => {
    if (!window.mxGMLocationCache) {
        window.mxGMLocationCache = {};
    }
    if (window.mxGMLocationCache[address]) {
        return window.mxGMLocationCache[address];
    } else {
        return (window.mxGMLocationCache[address] = queuedGeocode(address, mapToken));
    }
};

const queuedGeocode = async (address: string, mapToken: string): Promise<LatLng> => {
    const response = await fetch(obtainGeodecodeApiAddress(address, mapToken));
    const resolvedAddress = await response.json();

    const decodedLocation = resolvedAddress.results[0].geometry.location;

    return {
        latitude: decodedLocation.lat,
        longitude: decodedLocation.lng
    };
};

export const obtainGeodecodeApiAddress = (address: string, mapsToken: string): string => {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${mapsToken}`;
};
