import { ValueStatus } from "mendix";
import { createElement, FunctionComponent, useCallback } from "react";
import { ImageViewerContainerProps } from "../typings/ImageViewerProps";
import { ImageViewer as ImageViewerComponent } from "./components/ImageViewer";

type ImageProps = {
    type: "image" | "icon";
    image: string | undefined;
};

function getImageProps({ datasource, imageIcon, imageObject, imageUrl }: ImageViewerContainerProps): ImageProps {
    const fallback: ImageProps = {
        type: "image",
        image: undefined
    };
    switch (datasource) {
        case "image":
            return {
                type: "image",
                image: imageObject?.status === ValueStatus.Available ? imageObject.value.uri : undefined
            };
        case "imageUrl":
            return {
                type: "image",
                image: imageUrl?.status === ValueStatus.Available ? imageUrl.value : undefined
            };
        case "icon": {
            if (imageIcon?.status === ValueStatus.Available) {
                if (imageIcon.value?.type === "glyph") {
                    return {
                        type: "icon",
                        image: imageIcon.value.iconClass
                    };
                }
                if (imageIcon.value?.type === "image") {
                    return {
                        type: "image",
                        image: imageIcon.value.iconUrl
                    };
                }
            }
            return fallback;
        }
        default:
            return fallback;
    }
}

export const ImageViewer: FunctionComponent<ImageViewerContainerProps> = props => {
    const { type, image } = getImageProps(props);
    // TODO: Handle props.onClickType === "enlarge";
    const onClick = useCallback(() => props.onClick?.execute(), [props.onClick]);
    const sharedContentProps = {
        style: props.style,
        onClick: props.onClick ? onClick : undefined
    };
    return (
        <ImageViewerComponent.Wrapper
            className={props.class}
            responsive={props.responsive}
            hasImage={image !== undefined && image.length > 0}
        >
            {type === "image" ? (
                <ImageViewerComponent.Image
                    image={image}
                    height={props.height}
                    heightUnit={props.heightUnit}
                    width={props.width}
                    widthUnit={props.widthUnit}
                    {...sharedContentProps}
                />
            ) : (
                <ImageViewerComponent.Glyphicon icon={image} size={props.iconSize} {...sharedContentProps} />
            )}
        </ImageViewerComponent.Wrapper>
    );
};
