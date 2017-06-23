import { Component, createElement } from "react";

import { Carousel, Image } from "./components/Carousel";
import CarouselContainer, { CarouselContainerProps } from "./components/CarouselContainer";

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
        const defaultImages = [ { url: require("./img/Preview.jpg") } ];
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
