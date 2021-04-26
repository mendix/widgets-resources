import { createElement, ReactElement, useCallback } from "react";
import { Rating as RatingComponent } from "./components/Rating";
import { ValueStatus } from "mendix";
import { isAvailable } from "@mendix/piw-utils-internal";
import { Big } from "big.js";
import { StarRatingContainerProps } from "../typings/StarRatingProps";
import { Icon } from "./components/Icon";

import "./ui/rating-main.scss";

export function StarRating(props: StarRatingContainerProps): ReactElement {
    const emptyIcon =
        props.emptyIcon && isAvailable(props.emptyIcon) ? (
            <Icon value={props.emptyIcon?.value} empty animate={props.animation} />
        ) : (
            <Icon value={{ type: "glyph", iconClass: "glyphicon-star-empty" }} empty animate={props.animation} />
        );
    const fullIcon =
        props.icon && isAvailable(props.icon) ? (
            <Icon value={props.icon?.value} full animate={props.animation} />
        ) : (
            <Icon value={{ type: "glyph", iconClass: "glyphicon-star" }} full animate={props.animation} />
        );

    const onChange = useCallback(
        (value: number) => {
            if (props.ratingAttribute.status === ValueStatus.Available) {
                props.ratingAttribute.setValue(new Big(value));
                props.onChange?.execute();
            }
        },
        [props.ratingAttribute, props.onChange]
    );
    return (
        <RatingComponent
            animated={props.animation}
            disabled={props.ratingAttribute.readOnly}
            emptyIcon={emptyIcon}
            fullIcon={fullIcon}
            maximumValue={props.maximumValue}
            onChange={onChange}
            value={Number(props.ratingAttribute?.value ?? 0)}
        />
    );
}
