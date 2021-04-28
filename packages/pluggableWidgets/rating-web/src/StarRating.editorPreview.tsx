import { createElement, ReactElement } from "react";
import { Rating as RatingComponent } from "./components/Rating";
import { parseStyle } from "@mendix/piw-utils-internal";
import { WebIcon } from "mendix";
import { StarRatingPreviewProps } from "../typings/StarRatingProps";
import { Icon } from "./components/Icon";

export function preview(props: StarRatingPreviewProps): ReactElement {
    // TODO: The widget generator is out of sync with Studio Pro design mode. Change PIW preview props typing (class -> className) and readOnly generation to remove the ts-ignore below
    // @ts-ignore
    const { className, readOnly } = props;
    console.warn(className, readOnly);

    const emptyIcon = props.emptyIcon ? (
        <Icon value={props.emptyIcon as WebIcon} empty />
    ) : (
        <Icon value={{ type: "glyph", iconClass: "star-empty" }} empty />
    );
    const fullIcon = props.icon ? (
        <Icon value={props.icon as WebIcon} full />
    ) : (
        <Icon value={{ type: "glyph", iconClass: "star" }} full />
    );

    return (
        <RatingComponent
            animated={props.animation}
            className={className}
            disabled={readOnly ?? false}
            emptyIcon={emptyIcon}
            fullIcon={fullIcon}
            maximumValue={props.maximumValue ?? 5}
            style={parseStyle(props.style)}
            value={Number(props.maximumValue ?? 5) - 1}
        />
    );
}

export function getPreviewCss() {
    return require("./ui/rating-main.scss");
}
