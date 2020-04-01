import { createElement, ReactNode } from "react";
import { MapsPreviewProps } from "../typings";
import GoogleMap from "./components/GoogleMap";
import { translateZoom } from "./utils";

declare function require(name: string): string;

export const preview = (props: MapsPreviewProps): ReactNode => {
    return (
        <GoogleMap
            autoZoom
            zoomLevel={translateZoom(props.zoom)}
            mapsToken={props.apiKey}
            widthUnit={props.widthUnit}
            width={props.width}
            heightUnit={props.heightUnit}
            height={props.height}
            showCurrentLocation={props.showCurrentLocation}
            optionZoomControl={props.optionZoomControl}
            optionScroll={props.optionScroll}
            optionDrag={props.optionDrag}
            optionStreetView={props.optionStreetView}
            mapTypeControl={props.mapTypeControl}
            fullScreenControl={props.fullScreenControl}
            rotateControl={props.rotateControl}
            mapStyles={props.mapStyles}
        />
    );
};

export function getPreviewCss(): string {
    return require("./ui/Maps.css") + require("./ui/GoogleMapsPreview.css");
}
