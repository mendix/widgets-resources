import { MarkerOptions } from "leaflet";

declare module "leaflet" {
    export interface MarkerOptions {
        Guid?: string;
    }
}
