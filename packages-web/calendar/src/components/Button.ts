import { DetailedReactHTMLElement, SFC, createElement } from "react";
import * as classNames from "classnames";

export interface ButtonProps {
    title?: string;
    className?: string;
    caption: string | DetailedReactHTMLElement<{}, HTMLElement>;
    onClick: () => void;
}

export interface LinkProps {
    title: string;
    className?: string;
    caption: DetailedReactHTMLElement<{}, HTMLElement>;
    onClick: () => void;
}

export const Button: SFC<ButtonProps> = ({ title, className, caption, onClick }) =>
    createElement("button", { className: classNames("btn", className), title, onClick }, caption);

export const Link: SFC<LinkProps> = ({ className, title, onClick, caption }) =>
    createElement("span", { className: classNames("mx-link", className), title, onClick }, caption);
