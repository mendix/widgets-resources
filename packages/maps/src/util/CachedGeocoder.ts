import Geocoder, { GeocodingObject } from "react-native-geocoder";
import { LatLng } from "react-native-maps";
import { PromiseQueue } from "./PromiseQueue";

interface GeocodeCache {
    [address: string]: LatLng | undefined;
}

export class CachedGeocoder {
    private readonly queue = new PromiseQueue<GeocodingObject[]>();
    private cache: GeocodeCache = {};

    geocode(address: string): Promise<LatLng> {
        const cachedValue = this.cache[address];
        if (cachedValue) {
            return Promise.resolve(cachedValue);
        }

        return this.queuedGeocode(address).then(coordinate => {
            this.cache = { ...this.cache, [address]: coordinate };
            return coordinate;
        });
    }

    private queuedGeocode(address: string): Promise<LatLng> {
        return this.queue
            .add(() =>
                Geocoder.geocodeAddress(address).catch(() => {
                    throw new Error(`Failed to retrieve a location for the provided address: ${address}`);
                })
            )
            .then(results => {
                if (results.length === 0) {
                    throw new Error(`No location found for the provided address: ${address}`);
                }

                return {
                    latitude: results[0].position.lat,
                    longitude: results[0].position.lng
                };
            });
    }
}
