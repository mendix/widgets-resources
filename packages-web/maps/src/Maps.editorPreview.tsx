import { createElement, ReactNode } from "react";
import { MapsPreviewProps } from "../typings/MapsProps";
import GoogleMap from "./components/GoogleMap";
import { translateZoom } from "./utils/Utils";

declare function require(name: string): string;

export const preview = (props: MapsPreviewProps): ReactNode => {
    return <GoogleMap zoomLevel={translateZoom(props.zoom)} mapsToken="" inPreviewMode />;
};

export function getPreviewCss(): string {
    return require("./ui/Maps.css") + require("./ui/GoogleMapsPreview.css");
}
