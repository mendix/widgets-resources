import { LatLng } from "../src/utils";
import { GoogleMapsWindow } from "./google";

declare global {
    interface Window extends GoogleMapsWindow {
        locationsCache: {
            [key: string]: LatLng;
        };
    }
}

declare const window: Window;
