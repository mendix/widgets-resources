import { Marker, ModeledMarker } from "../../typings";
import { PromiseQueue } from "./PromiseQueue";

export interface LatLng {
    latitude: number;
    longitude: number;
}

const queue = new PromiseQueue<any>();

export const analyzeLocations = (locations?: ModeledMarker[], mapToken?: string): Promise<Marker[]> => {
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
                    const decodedAddress = await geocode(location.address!, mapToken!);
                    return {
                        latitude: decodedAddress.latitude,
                        longitude: decodedAddress.longitude,
                        url: location.customMarker ?? "",
                        title: location.title ?? "",
                        onClick: location.action ?? undefined
                    } as Marker;
                })
            );
            markerLocations.push(...resolvedMarkers);
            resolve(markerLocations);
        } else {
            resolve(markerLocations);
        }
    });
};

const geocode = (address: string, mapToken: string): Promise<LatLng> => {
    if (!window.locationsCache) {
        window.locationsCache = {};
    }
    if (window.locationsCache.hasOwnProperty(address)) {
        console.warn("Using cache value for", address);
        return Promise.resolve(window.locationsCache[address]);
    } else {
        return queuedGeocode(address, mapToken).then(coordinate => {
            window.locationsCache[address] = coordinate;
            return coordinate;
        });
    }
};

const queuedGeocode = (address: string, mapToken: string): Promise<LatLng> => {
    return queue
        .add(() =>
            fetch(obtainGeodecodeApiAddress(address, mapToken))
                .then(result => result.json())
                .catch(() => {
                    throw new Error(`Failed to retrieve a location for the provided address: ${address}`);
                })
        )
        .then(resolvedAddress => {
            if (resolvedAddress.results.length === 0) {
                throw new Error(`No location found for the provided address: ${address}`);
            }

            const decodedLocation = resolvedAddress.results[0].geometry.location;

            return {
                latitude: decodedLocation.lat,
                longitude: decodedLocation.lng
            };
        });
};

export const obtainGeodecodeApiAddress = (address: string, mapsToken: string): string => {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${mapsToken}`;
};
