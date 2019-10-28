import { createElement, ReactElement } from "react";
import { BadgeButton } from "./components/BadgeButton";
import { BadgeButtonPreviewProps } from "../typings/BadgeButtonProps";

declare function require(name: string): string;

export const preview = (props: BadgeButtonPreviewProps): ReactElement => {
    const { bootstrapStyle, class: className, label, style, value } = props;

    return (
        <BadgeButton
            bootstrapStyle={bootstrapStyle}
            className={className}
            label={label}
            style={parseStyle(style as string)}
            value={value}
        />
    );
};

export function getPreviewCss(): string {
    return require("./ui/BadgeButton.css");
}

const parseStyle = (style = ""): { [key: string]: string } => {
    try {
        return style.split(";").reduce<{ [key: string]: string }>((styleObject, line) => {
            const pair = line.split(":");
            if (pair.length === 2) {
                const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                styleObject[name] = pair[1].trim();
            }
            return styleObject;
        }, {});
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Failed to parse style", style, error);
    }

    return {};
};
