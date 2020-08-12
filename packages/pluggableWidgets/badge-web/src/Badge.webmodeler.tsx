import { parseStyle } from "@widgets-resources/piw-utils";
import { createElement, ReactElement } from "react";

import { BadgePreviewProps } from "../typings/BadgeProps";
import { Badge } from "./components/Badge";

declare function require(name: string): string;

export const preview = (props: BadgePreviewProps): ReactElement => {
    const { class: classname, style, type, value, brandStyle, onClick } = props;

    return (
        <Badge
            type={type}
            value={value ? value : ""}
            clickable={onClick != null}
            brandStyle={brandStyle}
            className={classname}
            style={parseStyle(style)}
        />
    );
};

export function getPreviewCss(): string {
    return require("./ui/Badge.css");
}
