import { Component, createElement } from "react";
import * as classNames from "classnames";

export interface CanvasProps {
    width?: number;
    gridx?: number;
    gridy?: number;
    height?: number;
    gridBorder?: number;
    getItemNode?: (ref: HTMLElement | null) => void;
}

export class Canvas extends Component<CanvasProps> {
    render() {
        return createElement("canvas", {
            gridx: this.props.gridx,
            gridy: this.props.gridy,
            height: this.props.height,
            ref: node => { if (this.props.getItemNode) { this.props.getItemNode(node); } },
            style: {
                border: this.props.gridBorder + "px solid",
                display: "block"
            },
            width: this.props.width
        });
    }
}
