import { DOM, MouseEventHandler, SFC } from "react";
import * as classNames from "classnames";

export interface CarouselControlProps {
    direction: "right" | "left";
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export const CarouselControl: SFC<CarouselControlProps> = (props) =>
    DOM.div(
        {
            className: classNames("widget-carousel-control", props.direction),
            onClick: props.onClick
        },
        DOM.span({ className: classNames("glyphicon", "glyphicon-chevron-" + props.direction) })
    );

CarouselControl.displayName = "CarouselControl";
