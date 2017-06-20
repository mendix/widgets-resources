import { Component, createElement } from "react";
import { ImageViewer, ImageViewerProps } from "./components/ImageViewer";
import ImageViewerContainer, { ImageViewerContainerProps } from "./components/ImageViewerContainer";
import { Alert } from "./components/Alert";

// tslint:disable-next-line
const image = require("base64-image-loader!./img/Preview.jpg");

declare function require(name: string): string;

// tslint:disable-next-line:class-name
export class preview extends Component<ImageViewerContainerProps, {}> {

    render() {
        const warnings = ImageViewerContainer.validateProps(this.props);
        const imageViewer = createElement(ImageViewer, this.transformProps(this.props));
        if (warnings) {
            return createElement(Alert, { message: warnings });
        }

        return imageViewer;
    }

    private transformProps(props: ImageViewerContainerProps): ImageViewerProps {
        return {
            height: props.height,
            heightUnits: props.heightUnit,
            imageurl: this.getImage(props),
            width: props.width,
            widthUnits: props.widthUnit
        };
    }

    private getImage(props: ImageViewerContainerProps): string {
        if (props.source === "staticUrl") {
            return props.urlStatic;
        }
        if (props.source === "staticImage") {
            return props.imageStatic;
        }

        return image;
    }
}

export function getPreviewCss() {
    return require("./ui/ImageViewer.css");
}

export function getVisibleProperties(valueMap: any, visibilityMap: any) {
    if (valueMap.source === "systemImage") {
        visibilityMap.imageAttribute = false;
        visibilityMap.urlStatic = false;
        visibilityMap.imageStatic = false;
    }
    if (valueMap.source === "urlAttribute") {
        visibilityMap.imageAttribute = true;
        visibilityMap.urlStatic = false;
        visibilityMap.imageStatic = false;
    }
    if (valueMap.source === "staticUrl") {
        visibilityMap.imageAttribute = false;
        visibilityMap.urlStatic = true;
        visibilityMap.imageStatic = false;
    }
    if (valueMap.source === "staticImage") {
        visibilityMap.systemImageAttribute = false;
        visibilityMap.imageAttribute = false;
        visibilityMap.urlStatic = false;
        visibilityMap.imageStatic = true;
    }
    if (valueMap.widthUnit === "auto") {
        visibilityMap.width = false;
    }
    if (valueMap.heightUnit === "auto") {
        visibilityMap.height = false;
    }

    return visibilityMap;
}
