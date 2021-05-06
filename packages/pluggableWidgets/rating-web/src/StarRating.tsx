import { createElement, ReactElement, useCallback } from "react";
import { Rating as RatingComponent } from "./components/Rating";
import { ValueStatus } from "mendix";
import { executeAction, isAvailable } from "@mendix/piw-utils-internal";
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
            if (props.rateAttribute.status === ValueStatus.Available) {
                props.rateAttribute.setValue(new Big(value));
                executeAction(props.onChange);
            }
        },
        [props.rateAttribute, props.onChange]
    );

    const value = Number(isAvailable(props.rateAttribute) ? props.rateAttribute.value : 0);

    return (
        <RatingComponent
            className={props.class}
            animated={props.animation}
            disabled={props.rateAttribute.readOnly}
            emptyIcon={emptyIcon}
            fullIcon={fullIcon}
            maximumValue={props.maximumStars}
            onChange={onChange}
            tabIndex={props.tabIndex}
            value={value > props.maximumStars ? props.maximumStars : value}
        />
    );
}
