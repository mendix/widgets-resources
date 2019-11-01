import { createElement, ReactElement } from "react";

import { BadgePreviewProps } from "../typings/BadgeProps";
import { Badge } from "./components/Badge";

declare function require(name: string): string;

export const preview = (props: BadgePreviewProps): ReactElement => {
    const { class: classname, styleObject, type, defaultValue, valueAttribute, bootstrapStyle, onClick } = props;

    return (
        <Badge
            type={type}
            defaultValue={defaultValue}
            value={valueAttribute}
            clickable={onClick.type !== "NoClientAction"}
            bootstrapStyle={bootstrapStyle}
            className={classname}
            style={styleObject}
        />
    );
};

export function getPreviewCss(): string {
    return require("./ui/Badge.css");
}
