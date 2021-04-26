import { WebIcon } from "mendix";
import { createElement, ReactElement } from "react";
import classNames from "classnames";

interface IconProps {
    value: WebIcon;
    empty?: boolean;
    animate?: boolean;
    full?: boolean;
}

export function Icon(props: IconProps): ReactElement {
    if (props.value && props.value.type === "glyph") {
        return (
            <span
                className={classNames(
                    "rating-icon",
                    { "rating-icon-empty": props.empty, "rating-icon-full": props.full, animate: props.animate },
                    "glyphicon",
                    props.value.iconClass
                )}
                aria-hidden="true"
            />
        );
    }
    if (props.value && props.value.type === "image") {
        return (
            <img
                className={classNames("rating-image", {
                    "rating-image-empty": props.empty,
                    "rating-image-full": props.full,
                    animate: props.animate
                })}
                src={props.value.iconUrl}
                alt=""
            />
        );
    }
    return <div />;
}
