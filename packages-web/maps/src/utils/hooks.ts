import { DynamicMarkersType, Marker, MarkersType, ModeledMarker } from "../../typings";
import { useMemo, useRef, useState } from "react";
import { analyzeDataSource, analyzeStaticMarker } from "./data";
import { analyzeLocations } from "./geodecode";
import deepEqual from "deep-equal";

export const useLocationResolver = (
    staticMarkers: MarkersType[],
    dynamicMarkers: DynamicMarkersType[],
    googleApiKey?: string
): [boolean, Marker[]] => {
    const [locations, setLocations] = useState<Marker[]>([]);
    const requestedMarkers = useRef<ModeledMarker[]>([]);
    const [loadingCount, setLoadingCount] = useState(0);

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

    if (!isIdenticalLocations(requestedMarkers.current, markers)) {
        requestedMarkers.current = markers;
        setLoadingCount(x => x + 1);
        analyzeLocations(markers, googleApiKey)
            .then(newLocations => {
                if (requestedMarkers.current === markers) {
                    setLocations(newLocations);
                    setLoadingCount(x => x - 1);
                }
            })
            .catch(e => {
                console.error(e);
                setLoadingCount(x => x - 1);
            });
    }

    return [loadingCount > 0, locations];
};

const isIdenticalLocations = (previousLocations: ModeledMarker[], newLocations: ModeledMarker[]): boolean => {
    const previous = previousLocations.map(l => {
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const { action, ...rest } = l;
        return rest;
    });
    const news = newLocations.map(l => {
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const { action, ...rest } = l;
        return rest;
    });
    return deepEqual(previous, news, { strict: true });
};
