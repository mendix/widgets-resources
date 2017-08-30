import { Component, createElement } from "react";
import { Alert } from "./components/Alert";
import { StarRating } from "./components/StarRating";
import StarRatingContainer, { ContainerProps, StarSize, WidgetColors } from "./components/StarRatingContainer";
import * as css from "./ui/StarRating.scss";
import * as classNames from "classnames";

declare function require(name: string): string;
// tslint:disable class-name
export class preview extends Component<ContainerProps, {}> {

    render() {
        const alertMessage = StarRatingContainer.validateProps(this.props);
        if (!alertMessage) {
            return createElement("div",
                {
                    className: classNames("widget-star-rating", this.props.class),
                    style: StarRatingContainer.parseStyle(this.props.style)
                }, createElement(StarRating, {
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

export function getPreviewCss() {
    return require("./ui/StarRating.scss");
}

export function getVisibleProperties(valueMap: any, visibilityMap: any) {
    visibilityMap.starSizeCustom = valueMap.starSize === "custom";

    return visibilityMap;
}
