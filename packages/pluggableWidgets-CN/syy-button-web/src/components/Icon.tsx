import { createElement, ReactElement } from "react";
import classNames from "classnames";
import { WebIcon } from "mendix";
import { Icon as InternalIcon } from "@mendix/piw-utils-internal/components/web";

export interface IconProps {
    animate?: boolean;
    empty?: boolean;
    full?: boolean;
    data: WebIcon;
}

export function Icon({ animate, empty, full, data }: IconProps): ReactElement {
    let className;
    if (data && data.type === "glyph") {
        className = classNames("rating-icon", { "rating-icon-empty": empty, "rating-icon-full": full, animate });
    }
    if (data && data.type === "image") {
        className = classNames("rating-image", {
            "rating-image-empty": empty,
            "rating-image-full": full,
            animate
        });
    }
    return <InternalIcon icon={data} className={className} fallback={<div className="falltext" />} />;
}
