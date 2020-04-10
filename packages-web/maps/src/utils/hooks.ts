import { DynamicMarkersType, Marker, MarkersType, ModeledMarker } from "../../typings";
import { useMemo, useRef, useState } from "react";
import { analyzeDataSource, analyzeStaticMarker } from "./data";
import { analyzeLocations } from "./geodecode";
import deepEqual from "deep-equal";

export const useLocationResolver = (
    staticMarkers: MarkersType[],
    dynamicMarkers: DynamicMarkersType[],
    googleApiKey?: string
): [Marker[]] => {
    const [locations, setLocations] = useState<Marker[]>([]);
    const requestedMarkers = useRef<ModeledMarker[]>([]);

    const markers = useMemo(() => {
        const markers: ModeledMarker[] = [];
        markers.push(...staticMarkers.map(marker => analyzeStaticMarker(marker)));
        markers.push(
            ...dynamicMarkers
                .map(marker => analyzeDataSource(marker))
                .reduce((prev, current) => [...prev, ...current], [])
        );
        return markers;
    }, [staticMarkers, dynamicMarkers]);

    if (!isIdenticalMarkers(requestedMarkers.current, markers)) {
        requestedMarkers.current = markers;
        analyzeLocations(markers, googleApiKey)
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
};

const isIdenticalMarkers = (previousMarkers: ModeledMarker[], newMarkers: ModeledMarker[]): boolean => {
    const previousProps = previousMarkers.map(({ ...marker }) => {
        delete marker.action;
        return marker;
    });
    const newProps = newMarkers.map(({ ...marker }) => {
        delete marker.action;
        return marker;
    });
    return deepEqual(previousProps, newProps, { strict: true });
};
