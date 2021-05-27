import { ValueStatus } from "mendix";
import { createElement, FunctionComponent } from "react";
import { ImageViewerContainerProps } from "../typings/ImageViewerProps";
import { ImageViewer as ImageViewerComponent } from "./components/ImageViewer";

function getImageUrl(props: ImageViewerContainerProps): string | undefined {
    switch (props.datasource) {
        case "dynamicImage":
        case "staticImage":
            return props.imageObject?.status === ValueStatus.Available ? props.imageObject.value.uri : undefined;
        case "imageUrl":
            return props.imageUrl?.status === ValueStatus.Available ? props.imageUrl.value : undefined;
        default:
            return undefined;
    }
}

export const ImageViewer: FunctionComponent<any> = (props: ImageViewerContainerProps) => {
    return (
        <ImageViewerComponent
            className={props.class}
            height={props.height}
            heightUnit={props.heightUnit}
            width={props.width}
            widthUnit={props.widthUnit}
            responsive={props.responsive}
            style={props.style}
            imageUrl={getImageUrl(props)}
        />
    );
};
