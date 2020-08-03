import { parseStyle } from "@widgets-resources/piw-utils";
import { createElement, ReactElement } from "react";
import { BadgeButton } from "./components/BadgeButton";
import { BadgeButtonPreviewProps } from "../typings/BadgeButtonProps";

declare function require(name: string): string;

export const preview = (props: BadgeButtonPreviewProps): ReactElement => {
    const { bootstrapStyle, class: className, style, label, value } = props;

    return (
        <BadgeButton
            bootstrapStyle={bootstrapStyle}
            className={className}
            label={label}
            style={parseStyle(style)}
            value={value}
        />
    );
};

export function getPreviewCss(): string {
    return require("./ui/BadgeButton.css");
}
