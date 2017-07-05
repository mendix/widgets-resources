import { Component, createElement } from "react";

import { Carousel, Image } from "./components/Carousel";
import CarouselContainer, { CarouselContainerProps } from "./components/CarouselContainer";

type VisibilityMap = {
    [P in keyof CarouselContainerProps]: boolean;
};

// tslint:disable class-name
export class preview extends Component<CarouselContainerProps, {}> {
    render() {
        const validationAlert = CarouselContainer.validateProps(this.props);

        return createElement(Carousel, {
            alertMessage: validationAlert,
            images: this.getImages(this.props)
        });
    }

    private getImages(props: CarouselContainerProps): Image[] {
        const defaultImages = [ { url: require("./img/Preview.png") } ];
        if (props.dataSource === "static") {
            return props.staticImages && props.staticImages.length
                ? props.staticImages
                : defaultImages;
        }

        return defaultImages;
    }
}

export function getPreviewCss() {
    return require("./ui/Carousel.scss");
}

export function getVisibleProperties(props: CarouselContainerProps, visibilityMap: VisibilityMap) {
    if (props.dataSource === "static") {
        visibilityMap.imagesEntity = false;
        visibilityMap.entityConstraint = false;
        visibilityMap.dataSourceMicroflow = false;
        visibilityMap.urlAttribute = false;
    } else if (props.dataSource === "XPath") {
        visibilityMap.staticImages = false;
        visibilityMap.dataSourceMicroflow = false;
    } else if (props.dataSource === "microflow") {
        visibilityMap.staticImages = false;
        visibilityMap.imagesEntity = false;
        visibilityMap.entityConstraint = false;
    }

    if (props.onClickOptions === "doNothing") {
        visibilityMap.onClickMicroflow = false;
        visibilityMap.onClickForm = false;
    } else if (props.onClickOptions === "callMicroflow") {
        visibilityMap.onClickForm = false;
    } else if (props.onClickOptions === "showPage") {
        visibilityMap.onClickMicroflow = false;
    }
}
