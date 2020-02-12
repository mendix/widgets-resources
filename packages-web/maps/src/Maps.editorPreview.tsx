import { createElement, ReactNode } from "react";
import { MapsPreviewProps } from "../typings/MapsProps";
import GoogleMap from "./components/GoogleMap";
import { translateZoom } from "./utils/Utils";

declare function require(name: string): string;

export const preview = (props: MapsPreviewProps): ReactNode => {
    return (
        <GoogleMap
            autoZoom
            zoomLevel={translateZoom(props.zoom)}
            mapsToken={props.apiKey}
            defaultCenterLatitude={51.906855}
            defaultCenterLongitude={4.488367}
        />
    );
};

export function getPreviewCss(): string {
    return require("./ui/Maps.css") + require("./ui/GoogleMapsPreview.css");
}
