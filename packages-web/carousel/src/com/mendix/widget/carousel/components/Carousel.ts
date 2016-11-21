import { CarouselItem } from "./CarouselItem";
import { DOM, createElement } from "react";

import "../ui/Carousel.css";

export interface Image {
    url: string;
}

export interface CarouselProps {
    images?: Image[];
}

const carouselItems = (images: Image[] = []) =>
    images.map((image, index) => createElement(CarouselItem, {
        active: index === 0,
        key: index,
        url: image.url
    }));

export const Carousel = (props: CarouselProps) =>
    DOM.div({ className: "widget-carousel" },
        DOM.div({ className: "widget-carousel-item-wrapper" },
            carouselItems(props.images)
        )
    );
