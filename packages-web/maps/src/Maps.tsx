import { hot } from "react-hot-loader/root";
import { createElement, ReactNode } from "react";
import { MapsContainerProps } from "../typings/MapsProps";
import GoogleMap from "./components/GoogleMap";
import { translateZoom } from "./utils/Utils";

const Maps = (props: MapsContainerProps): ReactNode => {
    console.log(props);
    return <GoogleMap zoomLevel={translateZoom(props.zoom)} />;
};

export default hot(Maps);
