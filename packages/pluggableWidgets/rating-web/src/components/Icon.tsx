import { createElement, ReactElement } from "react";
import classNames from "classnames";
import { WebIcon } from "mendix";
import { Icon as InternalIcon } from "@mendix/piw-utils-internal";

interface IconProps {
    animate?: boolean;
    empty?: boolean;
    full?: boolean;
    value: WebIcon;
}

export function Icon({ animate, empty, full, value }: IconProps): ReactElement {
    let className;
    if (value && value.type === "glyph") {
        className = classNames("rating-icon", { "rating-icon-empty": empty, "rating-icon-full": full, animate });
    }
    if (value && value.type === "image") {
        className = classNames("rating-image", {
            "rating-image-empty": empty,
            "rating-image-full": full,
            animate
        });
    }
    return <InternalIcon icon={value} className={className} fallback={<div />} />;
}
