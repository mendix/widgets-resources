import { MouseEvent, createElement, FunctionComponent } from "react";
import classNames from "classnames";

export interface CarouselItemProps {
    url: string;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    status: ItemStatus;
    position: number;
    getItemNode?: (ref: HTMLElement | null) => void;
}

export type ItemStatus = "active" | "next" | "prev";

export const CarouselItem: FunctionComponent<CarouselItemProps> = props =>
    createElement(
        "div",
        {
            className: classNames("widget-carousel-item", props.status),
            onClick: props.onClick,
            ref: (node: HTMLElement) => {
                if (props.getItemNode) {
                    props.getItemNode(node);
                }
            },
            style: { transform: `translate3d(${props.position}%, 0px, 0px)` }
        },
        createElement("img", { className: "widget-carousel-image", alt: "Carousel image", src: props.url })
    );

CarouselItem.defaultProps = {
    position: 0
};

CarouselItem.displayName = "CarouselItem";
