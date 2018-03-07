import { Component, createElement } from "react";
import * as classNames from "classnames";

export interface ImageProps {
    width?: number;
    height?: number;
    gridBorder?: number;
}

export class Image extends Component<ImageProps> {
    render() {
        return createElement("img", {
            height: this.props.height,
            style: {
                display: "none",
                opacity: 0.5,
                border: this.props.gridBorder + "px solid"
            },
            width: this.props.width
        });
    }
}
