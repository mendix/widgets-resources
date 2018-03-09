import { Component, createElement } from "react";
import * as classNames from "classnames";

export interface ImageProps {
    width?: number;
    height?: number;
    gridBorder?: number;
    url?: string;
}

export class Image extends Component<ImageProps> {
    render() {
        return createElement("img", {
            className: "image",
            height: this.props.height,
            style: { border: this.props.gridBorder + "px solid black" },
            width: this.props.width,
            src: this.props.url
        });
    }
}
