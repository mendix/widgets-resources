import { createElement, ReactNode, Fragment, ReactElement } from "react";
import { MapsPreviewProps } from "../typings/MapsProps";
import { Alert } from "@mendix/piw-utils-internal/components/web";
import GoogleMapsSVG from "./assets/GoogleMaps.svg";
import MapboxSVG from "./assets/Mapbox.svg";
import OpenStreetMapSVG from "./assets/OpenStreetMap.svg";
import HereMapsSVG from "./assets/HereMaps.svg";

declare function require(name: string): string;

export const preview = (props: MapsPreviewProps): ReactNode => {
    const renderImagePreview = (): ReactElement => {
        let image;
        switch (props.mapProvider) {
            case "googleMaps":
                image = GoogleMapsSVG;
                break;
            case "mapBox":
                image = MapboxSVG;
                break;
            case "openStreet":
                image = OpenStreetMapSVG;
                break;
            case "hereMaps":
                image = HereMapsSVG;
                break;
        }

        const style = {
            backgroundImage: `url("${image}")`,
            backgroundPosition: "center, center",
            backgroundSize: "cover",
            width: "375px",
            height: "375px"
        };
        return <div style={style} />;
    };

    return (
        <Fragment>
            {(props.mapProvider === "mapBox" || props.mapProvider === "hereMaps") && (
                <Alert bootstrapStyle="warning">
                    Provider unavailable without API Key, preview is not possible at the moment
                </Alert>
            )}
            {renderImagePreview()}
        </Fragment>
    );
};

export function getPreviewCss(): string {
    return require("leaflet/dist/leaflet.css") + require("./ui/Maps.css") + require("./ui/GoogleMapsPreview.css");
}
