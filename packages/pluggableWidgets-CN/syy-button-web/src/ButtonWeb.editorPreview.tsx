import { Component, ReactNode, createElement } from "react";
import { Button } from "antd";
import { ButtonWebPreviewProps } from "../typings/ButtonWebProps";

declare function require(name: string): string;

export class preview extends Component<ButtonWebPreviewProps> {
    render(): ReactNode {
        const { props } = this;
        const {
            block,
            href,
            ghost,
            // loading, danger, disabled, icon,
            size,
            shape,
            type,
            text
        } = props;
        const shapeData = shape === "circle" ? "circle" : shape === "round" ? "round" : undefined;
        const textData = text.trim() === "" ? undefined : text;
        return (
            <div className={props.className}>
                <Button ghost={ghost} block={block} href={href} size={size} shape={shapeData} type={type}>
                    {textData}
                </Button>
            </div>
        );
    }
}

export function getPreviewCss(): string {
    return require("./ui/ButtonWeb.css");
}
