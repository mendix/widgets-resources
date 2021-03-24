import { parseStyle } from "@mendix/piw-utils-internal";
import { createElement, ReactElement } from "react";

import { BadgePreviewProps } from "../typings/BadgeProps";
import { Badge } from "./components/Badge";

export const preview = (props: BadgePreviewProps): ReactElement => {
    // TODO: Change PIW preview props typing (class -> className) generation to remove the ts-ignore below
    // @ts-ignore
    const { className, style, type, value } = props;

    return <Badge type={type} value={value ? value : ""} className={className} style={parseStyle(style)} />;
};
