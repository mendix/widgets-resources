import { createElement, ReactElement } from "react";
import classNames from "classnames";
import { WebIcon } from "mendix";

interface IconProps {
    animate?: boolean;
    empty?: boolean;
    full?: boolean;
    value: WebIcon;
}

export function Icon({ animate, empty, full, value }: IconProps): ReactElement {
    if (value && value.type === "glyph") {
        return (
            <span
                className={classNames(
                    "rating-icon",
                    { "rating-icon-empty": empty, "rating-icon-full": full, animate },
                    "glyphicon",
                    value.iconClass
                )}
                aria-hidden="true"
            />
        );
    }
    if (value && value.type === "image") {
        return (
            <img
                className={classNames("rating-image", {
                    "rating-image-empty": empty,
                    "rating-image-full": full,
                    animate
                })}
                src={value.iconUrl}
                alt=""
            />
        );
    }
    return <div />;
}
