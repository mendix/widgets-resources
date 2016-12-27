import { Component, DOM, MouseEventHandler, createElement } from "react";

import { CarouselControl } from "./CarouselControl";
import { CarouselItem } from "./CarouselItem";

import "../ui/Carousel.css";

export interface Image {
    url: string;
}

export interface CarouselProps {
    images?: Image[];
}

export class Carousel extends Component<CarouselProps, { activeIndex: number }> {
    static defaultProps: CarouselProps = { images: [] };
    private moveToTheLeft: MouseEventHandler<HTMLDivElement>;
    private moveToTheRight: MouseEventHandler<HTMLDivElement>;

    constructor(props: CarouselProps) {
        super(props);

        this.moveToTheLeft = () => this.moveInDirection("left");
        this.moveToTheRight = () => this.moveInDirection("right");
        this.state = { activeIndex: 0 };
    }

    render() {
        return DOM.div({ className: "widget-carousel" },
            DOM.div({ className: "widget-carousel-item-wrapper" },
                this.createCarouselItems(this.props.images, this.state.activeIndex)
            ),
            this.props.images.length ? this.createCarouselControls() : null
        );
    }

    private createCarouselItems(images: Image[], activeIndex: number) {
        return images.map((image, index) =>
            createElement(CarouselItem, {
                active: index === activeIndex,
                key: index,
                url: image.url
            }));
    }

    private createCarouselControls() {
        return [
            createElement(CarouselControl, {
                direction: "left",
                key: 0,
                onClick: this.moveToTheLeft
            }),
            createElement(CarouselControl, {
                direction: "right",
                key: 1,
                onClick: this.moveToTheRight
            })
        ];
    }

    private moveInDirection(direction: "right" | "left") {
        const { activeIndex } = this.state;
        const firstIndex = 0;
        const newActiveIndex = direction === "right"
            ? activeIndex < this.props.images.length - 1 ? activeIndex + 1 : firstIndex
            : activeIndex === firstIndex ? this.props.images.length - 1 : activeIndex - 1;

        this.setState({ activeIndex: newActiveIndex });
    }
}
