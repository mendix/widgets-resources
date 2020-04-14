import { useMemo, useRef, useState } from "react";
import { convertDynamicModeledMarker, convertStaticModeledMarker } from "./data";
import deepEqual from "deep-equal";
import { Marker, ModeledMarker } from "../../typings/shared";
import { DynamicMarkersType, MarkersType } from "../../typings/MapsProps";

declare const window: {
    mxGMLocationCache: {
        [key: string]: Promise<LatLng>;
    };
};

export interface LatLng {
    latitude: number;
    longitude: number;
}

export async function convertAddressToLatLng(locations?: ModeledMarker[], mapToken?: string): Promise<Marker[]> {
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
            throw new Error("API key required in order to use markers containing address");
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
    }
    return markerLocations;
}

function geocode(address: string, mapToken: string): Promise<LatLng> {
    if (!window.mxGMLocationCache) {
        window.mxGMLocationCache = {};
    }
    if (window.mxGMLocationCache[address]) {
        return window.mxGMLocationCache[address];
    } else {
        return (window.mxGMLocationCache[address] = geocodeQueued(address, mapToken));
    }
}

async function geocodeQueued(address: string, mapToken: string): Promise<LatLng> {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${mapToken}`
    );
    const resolvedAddress = await response.json();

    const decodedLocation = resolvedAddress.results?.[0].geometry.location;

    return {
        latitude: decodedLocation.lat,
        longitude: decodedLocation.lng
    };
}

export function useLocationResolver(
    staticMarkers: MarkersType[],
    dynamicMarkers: DynamicMarkersType[],
    googleApiKey?: string
): [Marker[]] {
    const [locations, setLocations] = useState<Marker[]>([]);
    const requestedMarkers = useRef<ModeledMarker[]>([]);

    const markers = useMemo(() => {
        const markers: ModeledMarker[] = [];
        markers.push(...staticMarkers.map(marker => convertStaticModeledMarker(marker)));
        markers.push(
            ...dynamicMarkers
                .map(marker => convertDynamicModeledMarker(marker))
                .reduce((prev, current) => [...prev, ...current], [])
        );
        return markers;
    }, [staticMarkers, dynamicMarkers]);

    if (!isIdenticalMarkers(requestedMarkers.current, markers)) {
        requestedMarkers.current = markers;
        convertAddressToLatLng(markers, googleApiKey)
            .then(newLocations => {
                if (requestedMarkers.current === markers) {
                    setLocations(newLocations);
                }
            })
            .catch(e => {
                console.error(e);
            });
    }

    return [locations];
}

function isIdenticalMarkers(previousMarkers: ModeledMarker[], newMarkers: ModeledMarker[]): boolean {
    const previousProps = previousMarkers.map(({ ...marker }) => {
        delete marker.action;
        return marker;
    });
    const newProps = newMarkers.map(({ ...marker }) => {
        delete marker.action;
        return marker;
    });
    return deepEqual(previousProps, newProps, { strict: true });
}
