import { DOM } from "react";
import * as classNames from "classnames";

export interface CarouselItemProps {
    url: string;
    active: boolean;
}

export const CarouselItem = (props: CarouselItemProps) =>
    DOM.div({ className: classNames("widget-carousel-item", { active: props.active }) },
        DOM.img({ alt: "Carousel image", src: props.url })
    );
