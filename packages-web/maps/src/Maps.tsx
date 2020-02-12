import { hot } from "react-hot-loader/root";
import { createElement, ReactNode } from "react";
import { MapsContainerProps } from "../typings/MapsProps";
import GoogleMap from "./components/GoogleMap";
import { translateZoom } from "./utils/Utils";

const Maps = (props: MapsContainerProps): ReactNode => {
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

export default hot(Maps);
