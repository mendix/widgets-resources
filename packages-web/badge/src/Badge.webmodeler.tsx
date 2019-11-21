import { createElement, ReactElement } from "react";

import { BadgePreviewProps } from "../typings/BadgeProps";
import { Badge } from "./components/Badge";

declare function require(name: string): string;

export const preview = (props: BadgePreviewProps): ReactElement => {
    const { class: classname, styleObject, type, value, brandStyle, onClick } = props;

    return (
        <Badge
            type={type}
            value={value ? value : ""}
            clickable={onClick.type !== "NoClientAction"}
            brandStyle={brandStyle}
            className={classname}
            style={styleObject}
        />
    );
};

export function getPreviewCss(): string {
    return require("./ui/Badge.css");
}
