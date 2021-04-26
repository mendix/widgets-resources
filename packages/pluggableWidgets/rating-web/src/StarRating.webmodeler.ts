import { Component, ReactNode, createElement } from "react";
import { Alert } from "./components/Alert";
import { StarRating } from "./components/StarRating";
import StarRatingContainer, { ContainerProps } from "./components/StarRatingContainer";

import classNames from "classnames";

type VisibilityMap = {
    [P in keyof ContainerProps]: boolean;
};

declare function require(name: string): string;

// tslint:disable class-name
export class preview extends Component<ContainerProps, {}> {
    render(): ReactNode {
        const alertMessage = StarRatingContainer.validateProps(this.props);
        if (!alertMessage) {
            return createElement(
                "div",
                {
                    className: classNames("widget-star-rating", this.props.class),
                    style: StarRatingContainer.parseStyle(this.props.style)
                },
                createElement(StarRating, {
                    initialRate: 1,
                    maximumStars: this.props.maximumStars,
                    readOnly: true,
                    starSize: this.props.starSize,
                    starSizeCustom: this.props.starSizeCustom,
                    widgetColor: this.props.widgetColor
                })
            );
        } else {
            return createElement(Alert, {
                bootstrapStyle: "danger",
                message: alertMessage,
                className: "widget-star-rating-alert"
            });
        }
    }
}

export function getPreviewCss(): string {
    return require("./ui/StarRating.scss");
}

export function getVisibleProperties(valueMap: ContainerProps, visibilityMap: VisibilityMap): VisibilityMap {
    visibilityMap.starSizeCustom = valueMap.starSize === "custom";

    return visibilityMap;
}
