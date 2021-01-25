declare module "react-native-geocoder" {
    export interface Position {
        lat: number;
        lng: number;
    }

    export interface GeocodingObject {
        position: Position;
        formattedAddress: string;
        feature: string | null;
        streetNumber: string | null;
        streetName: string | null;
        postalCode: string | null;
        locality: string | null;
        country: string;
        countryCode: string;
        adminArea: string | null;
        subAdminArea: string | null;
        subLocality: string | null;
    }

    export const apiKey: null | string;

    export function fallbackToGoogle(key: string): void;

    export function geocodePosition(position: Position): Promise<GeocodingObject[]>;

    export function geocodeAddress(address: string): Promise<GeocodingObject[]>;

    export = {
        apiKey,
        fallbackToGoogle,
        geocodePosition,
        geocodeAddress
    };
}
