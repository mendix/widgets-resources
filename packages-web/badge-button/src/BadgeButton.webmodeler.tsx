import { createElement, ReactElement } from "react";
import { BadgeButton } from "./components/BadgeButton";
import { BadgeButtonPreviewProps } from "../typings/BadgeButtonProps";

declare function require(name: string): string;

export const preview = (props: BadgeButtonPreviewProps): ReactElement => {
    const { bootstrapStyle, class: className, label, styleObject, value } = props;

    return (
        <BadgeButton
            bootstrapStyle={bootstrapStyle}
            className={className}
            label={label}
            style={styleObject}
            value={value}
        />
    );
};

export function getPreviewCss(): string {
    return require("./ui/BadgeButton.css");
}
