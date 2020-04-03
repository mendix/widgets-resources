import { DynamicMarkersType, Marker, MarkersType, ModeledMarker } from "../../typings";
import { useEffect, useMemo, useState } from "react";
import { analyzeDataSource, analyzeStaticMarker } from "./data";
import { analyzeLocations } from "./geodecode";
import deepEqual from "deep-equal";

export const useLocationResolver = (
    staticMarkers: MarkersType[],
    dynamicMarkers: DynamicMarkersType[],
    googleApiKey?: string
): [Marker[]] => {
    const [locations, setLocations] = useState<Marker[]>([]);
    const [modeledMarkers, setModeledMarkers] = useState<ModeledMarker[]>([]);
    const [queue, setQueue] = useState<Promise<Marker[]>[]>([]);
    const pushItem = (newItem: Promise<Marker[]>) => {
        setQueue(oldQueue => [...oldQueue, newItem]);
    };

    const popItem = () => {
        if (queue.length > 0) {
            setQueue(prevQueue => {
                prevQueue.pop();
                return prevQueue;
            });
        }
    };

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

    useEffect(() => {
        if (!isIdenticalLocations(modeledMarkers, markers)) {
            pushItem(analyzeLocations(markers, googleApiKey));
            setModeledMarkers(markers);
        }
    }, [markers]);

    useEffect(() => {
        if (queue.length > 0) {
            const promise = queue.pop();
            if (promise) {
                promise.then(newLocations => {
                    setLocations(newLocations);
                    popItem();
                });
            }
        }
    }, [queue]);

    return [locations];
};

const isIdenticalLocations = (previousLocations: ModeledMarker[], newLocations: ModeledMarker[]): boolean => {
    const previous = previousLocations.map(l => {
        const { action, ...rest } = l;
        return rest;
    });
    const news = newLocations.map(l => {
        const { action, ...rest } = l;
        return rest;
    });
    return deepEqual(previous, news, { strict: true });
};
