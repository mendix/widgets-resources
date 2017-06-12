import { Component, createElement } from "react";

import { Carousel, Image } from "./components/Carousel";
import CarouselContainer, { CarouselContainerProps } from "./components/CarouselContainer";
import { Alert } from "./components/Alert";

// tslint:disable-next-line
const image = require("base64-image-loader!./img/Preview.jpg");

declare function require(url: string): string;

// tslint:disable class-name
export class preview extends Component<CarouselContainerProps, {}> {
    render() {
        const validationAlert = CarouselContainer.validateProps(this.props);
        if (validationAlert) {
            return createElement(Alert, { message: validationAlert });
        }

        return createElement(Carousel, {
            alertMessage: validationAlert,
            images: this.getImages(this.props)
        });
    }

    private getImages(props: CarouselContainerProps): Image[] {
        if (props.dataSource === "static") {
            return props.staticImages;
        }

        return [ { url: image } ];
    }
}

export function getPreviewCss() {
    return require("./ui/Carousel.scss");
}
