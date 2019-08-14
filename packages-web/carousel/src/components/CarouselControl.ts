import { MouseEventHandler, SFC, createElement } from "react";
import classNames from "classnames";

export interface CarouselControlProps {
    direction: "right" | "left";
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export const CarouselControl: SFC<CarouselControlProps> = props =>
    createElement(
        "div",
        {
            className: classNames("widget-carousel-control", props.direction),
            onClick: props.onClick
        },
        createElement("span", { className: classNames("glyphicon", "glyphicon-chevron-" + props.direction) })
    );

CarouselControl.displayName = "CarouselControl";
