import { ReactNode, SFC, createElement } from "react";
import * as classNames from "classnames";

export interface ButtonProps {
    renderMode: "button" | "link";
    title?: string;
    className?: string;
    buttonStyle?: ButtonStyle;
    icon?: string;
    iconPosition?: "left" | "right";
    active: boolean;
    caption: ReactNode;
    onClick: () => void;
}

export type ButtonStyle = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";

export const addIcon = (icon?: string, iconPosition?: "left" | "right", content?: ReactNode) => {
    if (icon) {
        if (iconPosition === "right") {
            return [
                content,
                content ? " " : null,
                createElement("span", { className: icon })
            ];
        } else {
            return [
                createElement("span", { className: icon }),
                content ? " " : null,
                content
            ];
        }
    } else {
        return content;
    }
};

export const ToolbarButton: SFC<ButtonProps> = props =>
    props.renderMode === "button"
        ? Button(props)
        : Link(props);

ToolbarButton.defaultProps = { buttonStyle: "default", renderMode: "button", iconPosition: "left" };

export const Button: SFC<ButtonProps> = ({ title, className, caption, onClick, buttonStyle, active, icon, iconPosition }) =>
    createElement("button",
        { className: classNames("btn", `btn-${buttonStyle}`, className, { active }), title, onClick },
        addIcon(icon, iconPosition, caption)
    );

const Link: SFC<ButtonProps> = ({ title, className, caption, onClick, active, icon, iconPosition }) =>
    createElement("span",
        { className: classNames("btn btn-link", className, { active }), title, onClick },
        addIcon(icon, iconPosition, createElement("a", {}, caption))
    );
