import { hot } from "react-hot-loader/root";
import { createElement, ReactNode } from "react";
import { MapsContainerProps } from "../typings/MapsProps";
import GoogleMap, { ModeledMarker } from "./components/GoogleMap";
import { translateZoom } from "./utils/Utils";
import { ValueStatus } from "mendix";

const Maps = (props: MapsContainerProps): ReactNode => {
    const locations: ModeledMarker[] = props.markers.map(location => ({
        location: location.location.value!,
        action: location.onClick?.execute
    }));
    return (
        <GoogleMap
            autoZoom
            zoomLevel={translateZoom(props.zoom)}
            mapsToken={props.apiKey && props.apiKey.status === ValueStatus.Available ? props.apiKey.value : undefined}
            defaultCenterLatitude={51.906855}
            defaultCenterLongitude={4.488367}
            locations={locations}
        />
    );
};

export default hot(Maps);
