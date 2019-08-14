import { Component, createElement, ReactNode } from "react";
import { ImageViewer, ImageViewerProps } from "./components/ImageViewer";
import ImageViewerContainer, { ImageViewerContainerProps } from "./components/ImageViewerContainer";
import { Alert } from "./components/Alert";

const image = require("base64-image-loader!./img/imageviewerpreview.png");

declare function require(name: string): string;

type VisibilityMap = {
    [P in keyof ImageViewerContainerProps]: boolean;
};

export class preview extends Component<ImageViewerContainerProps, {}> {
    render(): ReactNode {
        const message = ImageViewerContainer.validateProps(this.props);
        if (!message) {
            return createElement(ImageViewer, this.transformProps(this.props));
        } else {
            return createElement(
                "div",
                {},
                createElement(Alert, { className: "widget-image-viewer-alert-danger", message }),
                createElement(ImageViewer, this.transformProps(this.props))
            );
        }
    }

    private transformProps(props: ImageViewerContainerProps): ImageViewerProps {
        return {
            className: props.class,
            height: props.height,
            heightUnit: props.heightUnit,
            imageUrl: this.getImage(props),
            responsive: props.responsive,
            style: ImageViewerContainer.parseStyle(props.style),
            width: props.width,
            widthUnit: props.widthUnit
        };
    }

    private getImage(props: ImageViewerContainerProps): string {
        if (props.source === "staticUrl") {
            return props.urlStatic || image;
        } else if (props.source === "staticImage") {
            return props.imageStatic || image;
        }

        return image;
    }
}

export function getPreviewCss(): string {
    return require("./ui/ImageViewer.css");
}

export function getVisibleProperties(valueMap: ImageViewerContainerProps, visibilityMap: VisibilityMap): VisibilityMap {
    visibilityMap.dynamicUrlAttribute = valueMap.source === "urlAttribute";
    visibilityMap.urlStatic = valueMap.source === "staticUrl";
    visibilityMap.imageStatic = valueMap.source === "staticImage";

    visibilityMap.width = valueMap.widthUnit === "auto";
    visibilityMap.height = valueMap.heightUnit === "auto";

    visibilityMap.onClickMicroflow = valueMap.onClickOption === "callMicroflow";
    visibilityMap.onClickNanoflow = valueMap.onClickOption === "callNanoflow";
    visibilityMap.onClickForm = valueMap.onClickOption === "showPage";
    visibilityMap.openPageAs = valueMap.onClickOption === "showPage";

    return visibilityMap;
}
