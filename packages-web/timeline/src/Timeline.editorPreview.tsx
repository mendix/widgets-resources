import { Component, ReactNode } from "react";
import { TimelinePreviewProps } from "../typings/TimelineProps";

declare function require(name: string): string;

export class preview extends Component<TimelinePreviewProps> {
    render(): ReactNode {
        return null;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Timeline.scss");
}
