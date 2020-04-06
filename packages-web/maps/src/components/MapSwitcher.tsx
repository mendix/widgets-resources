import { createElement, ReactElement } from "react";
import GoogleMap, { GoogleMapsProps } from "./GoogleMap";
import { LeafletMap, LeafletProps } from "./LeafletMap";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "../ui/Maps.css";

interface SwitcherProps extends GoogleMapsProps, LeafletProps {}

export const MapSwitcher = (props: SwitcherProps): ReactElement => {
    if (props.mapProvider === "googleMaps") {
        return <GoogleMap {...props} />;
    }
    return <LeafletMap {...props} />;
};
