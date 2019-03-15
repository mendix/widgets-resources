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

    const Geocoder: {
        apiKey: null | string;
        fallbackToGoogle(key: string): void;
        geocodePosition(position: Position): Promise<GeocodingObject[]>;
        geocodeAddress(address: string): Promise<GeocodingObject[]>;
    };

    export default Geocoder;
}
