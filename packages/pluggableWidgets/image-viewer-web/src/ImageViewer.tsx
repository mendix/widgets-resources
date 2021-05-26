import { ValueStatus } from "mendix";
import { createElement, FunctionComponent } from "react";
import { ImageViewerContainerProps } from "../typings/ImageViewerProps";
import { ImageViewer as ImageViewerComponent, ImageViewerImageProps } from "./components/ImageViewer";

function getImageProps(props: ImageViewerContainerProps): ImageViewerImageProps {
    const fallback: ImageViewerImageProps = {
        type: "image",
        image: undefined
    };
    switch (props.datasource) {
        case "dynamicImage":
        case "staticImage":
            return {
                type: "image",
                image: props.imageObject?.status === ValueStatus.Available ? props.imageObject.value.uri : undefined
            };
        case "imageUrl":
            console.log(props);
            return {
                type: "image",
                image: props.imageUrl?.status === ValueStatus.Available ? props.imageUrl.value : undefined
            };
        case "icon": {
            if (props.imageIcon?.status === ValueStatus.Available) {
                if (props.imageIcon.value?.type === "glyph") {
                    return {
                        type: "icon",
                        image: props.imageIcon.value.iconClass
                    };
                }
                return {
                    type: "image",
                    image: props.imageIcon.value?.iconUrl
                };
            }
            return fallback;
        }
        default:
            return fallback;
    }
}

export const ImageViewer: FunctionComponent<any> = (props: ImageViewerContainerProps) => {
    const imageProps = getImageProps(props);
    console.log(imageProps);
    return (
        <ImageViewerComponent
            className={props.class}
            height={props.height}
            heightUnit={props.heightUnit}
            width={props.width}
            widthUnit={props.widthUnit}
            responsive={props.responsive}
            style={props.style}
            {...imageProps}
        />
    );
};
