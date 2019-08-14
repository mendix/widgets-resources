import { Component, createElement, ReactNode } from "react";

import { Carousel, Image } from "./components/Carousel";
import CarouselContainer, { CarouselContainerProps } from "./components/CarouselContainer";

type VisibilityMap = {
    [P in keyof CarouselContainerProps]: boolean;
};

declare function require(name: string): string;

export class preview extends Component<CarouselContainerProps, {}> {
    render(): ReactNode {
        const validationAlert = CarouselContainer.validateProps(this.props);

        return createElement(Carousel, {
            alertMessage: validationAlert,
            images: this.getImages(this.props)
        });
    }

    private getImages(props: CarouselContainerProps): Image[] {
        const defaultImages = [{ url: require("./img/Preview.png"), openPageAs: props.openPageAs }];
        if (props.dataSource === "static") {
            return props.staticImages && props.staticImages.length ? props.staticImages : defaultImages;
        }

        return defaultImages;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Carousel.scss");
}

export function getVisibleProperties(props: CarouselContainerProps, visibilityMap: VisibilityMap): VisibilityMap {
    visibilityMap.dataSourceMicroflow = props.dataSource === "microflow";
    visibilityMap.entityConstraint = props.dataSource === "XPath";
    visibilityMap.staticImages = props.dataSource === "static" ? visibilityMap.staticImages : false;
    visibilityMap.imagesEntity = props.dataSource === "microflow";

    visibilityMap.onClickForm = props.onClickOptions === "showPage";
    visibilityMap.openPageAs = props.onClickOptions === "showPage";
    visibilityMap.onClickMicroflow = props.onClickOptions === "callMicroflow";
    visibilityMap.onClickNanoflow = props.onClickOptions === "callNanoflow";

    return visibilityMap;
}
