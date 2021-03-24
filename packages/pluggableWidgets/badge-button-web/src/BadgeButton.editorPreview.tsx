import { parseStyle } from "@mendix/piw-utils-internal";
import { createElement, ReactElement } from "react";
import { BadgeButton } from "./components/BadgeButton";
import { BadgeButtonPreviewProps } from "../typings/BadgeButtonProps";

export const preview = (props: BadgeButtonPreviewProps): ReactElement => {
    const { class: className, style, label, value } = props;

    return <BadgeButton className={className} label={label} style={parseStyle(style)} value={value} />;
};
