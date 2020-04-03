import { DynamicMarkersType, Marker, MarkersType, ModeledMarker } from "../../typings";
import { useEffect, useMemo, useState } from "react";
import { analyzeDataSource, analyzeStaticMarker } from "./data";
import { analyzeLocations } from "./geodecode";
import deepEqual from "deep-equal";

interface MarkerQueue {
    //TODO: REMOVE timestamp
    timestamp: number;
    markers: ModeledMarker[];
}

export const useLocationResolver = (
    staticMarkers: MarkersType[],
    dynamicMarkers: DynamicMarkersType[],
    googleApiKey?: string
): [Marker[]] => {
    const [locations, setLocations] = useState<Marker[]>([]);
    const [modeledMarkers, setModeledMarkers] = useState<ModeledMarker[]>([]);
    const [loading, setLoading] = useState(false);
    const [queue, pushItem, popItem] = useQueue();

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
            pushItem(markers);
            setModeledMarkers(markers);
        }
    }, [markers]);

    useEffect(() => {
        if (queue.length > 0 && !loading) {
            const toBeQueued = queue.pop();
            if (toBeQueued) {
                setLoading(true);
                //TODO: REMOVE timestamp
                console.warn("Executing promise", toBeQueued.timestamp);
                const promise = analyzeLocations(toBeQueued.markers, googleApiKey);
                promise
                    .then(newLocations => {
                        //TODO: REMOVE timestamp
                        console.warn("Promise executed", toBeQueued.timestamp);
                        setLocations(newLocations);
                        popItem();
                        setLoading(false);
                    })
                    .catch(() => {
                        popItem();
                        setLoading(false);
                    });
            }
        }
    }, [queue, loading]);

    return [locations];
};

const useQueue = (): [MarkerQueue[], (newItem: ModeledMarker[]) => void, () => void] => {
    const [queue, setQueue] = useState<MarkerQueue[]>([]);
    const pushItem = (newItem: ModeledMarker[]) => {
        setQueue(oldQueue => [{ timestamp: Date.now(), markers: newItem }, ...oldQueue]);
    };

    const popItem = () => {
        if (queue.length > 0) {
            setQueue(prevQueue => {
                prevQueue.pop();
                return prevQueue;
            });
        }
    };
    return [queue, pushItem, popItem];
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
