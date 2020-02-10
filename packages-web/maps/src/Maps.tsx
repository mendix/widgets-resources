import { hot } from "react-hot-loader/root";
import { createElement, ReactNode } from "react";
import { MapsContainerProps } from "../typings/MapsProps";
import GoogleMap from "./components/GoogleMap";

const Maps = (props: MapsContainerProps): ReactNode => {
    console.log(props);
    return <GoogleMap />;
};

export default hot(Maps);
