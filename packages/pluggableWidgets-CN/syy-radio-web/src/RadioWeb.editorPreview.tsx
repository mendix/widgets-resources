import { Component, createElement, ReactNode } from "react";
import { RadioWebPreviewProps } from "../typings/RadioWebProps";

declare function require(name: string): string;

export class preview extends Component<RadioWebPreviewProps> {
    render(): ReactNode {
        return (
            <div>
                <div>22</div>
            </div>
        );
    }
}

export function getPreviewCss(): string {
    return require("./ui/index.css");
}
