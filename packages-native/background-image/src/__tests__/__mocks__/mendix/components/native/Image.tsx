import { createElement, ReactElement } from "react";
import { Image as RNImage } from "react-native";

export function Image(props: any): ReactElement | null {
    return <RNImage {...props} />;
}
