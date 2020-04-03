import { LatLng } from "../src/utils";
import { GoogleMapsWindow } from "./google";

declare global {
    interface Window extends GoogleMapsWindow {
        mxGMLocationCache: {
            [key: string]: Promise<LatLng>;
        };
    }
}

declare const window: Window;
