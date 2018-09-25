import { Component, createElement } from "react";
import * as classNames from "classnames";
import { Alert } from "./Alert";
import SignaturePad from "signature_pad";
import "../ui/Signature.scss";

export interface SignatureProps {
    alertMessage?: string;
    height?: number;
    width?: number;
    gridx?: number;
    gridy?: number;
    gridColor?: string;
    gridBorder?: number;
    penColor?: string;
    maxLineWidth?: number;
    minLineWidth?: number;
    velocityFilterWeight?: number;
    showGrid?: boolean;
    timeout?: number;
    status?: editable;
    onClickAction?: (imageUrl?: string) => void;
    onEndAction?: () => void;
}

type editable = "enabled" | "disabled";

export interface SignatureState {
    isSet: boolean;
}

export class Signature extends Component<SignatureProps, SignatureState> {
    private canvasNode: HTMLCanvasElement;
    private signaturePad: any;

    constructor(props: SignatureProps) {
        super(props);

        this.state = { isSet: false };
    }

    render() {
        return createElement("div", {
            className: "widget-Signature signature-unset"
        },
            createElement("canvas", {
                className: classNames("widget-Signature", "form-control mx-textarea-input mx-textarea",
                {
                    disabled: this.props.status === "disabled"
                }),
                height: this.props.height,
                width: this.props.width,
                ref: this.getCanvas
            }),
            createElement("button", {
                className: "btn btn-default",
                onClick: this.resetCanvas
            }, "Reset"),
            createElement("button", {
                className: "btn btn-primary",
                onClick: () => this.getDataUrl(),
                style: { visibility: this.state.isSet ? "visible" : "hidden" }
            }, "Save"),
            createElement(Alert, { bootstrapStyle: "danger" }, this.props.alertMessage)
        );
    }

    componentDidMount() {
        if (this.canvasNode) {
            this.signaturePad = new SignaturePad(this.canvasNode, {
                penColor: this.props.penColor,
                velocityFilterWeight: this.props.velocityFilterWeight,
                maxWidth: this.props.maxLineWidth,
                minWidth: this.props.minLineWidth,
                onEnd: this.onEnd
            });
            if (this.props.showGrid) { this.drawGrid(); }
        }
    }

    private onEnd = () => {
        this.setState({ isSet: true });
        setTimeout(() => this.props.onEndAction(), this.props.timeout);
    }

    private getDataUrl = () => {
        this.props.onClickAction(this.signaturePad.toDataURL());
    }

    private getCanvas = (node: HTMLCanvasElement) => {
        this.canvasNode = node;
    }

    private resetCanvas = () => {
        this.signaturePad.clear();
        this.setState({ isSet: false });
        if (this.props.showGrid) { this.drawGrid(); }
    }

    private drawGrid = () => {
        const { width, height, showGrid, gridColor, gridx, gridy } = this.props;
        if (!showGrid) return;

        let x = gridx;
        let y = gridy;
        const context = this.canvasNode.getContext("2d") as CanvasRenderingContext2D;
        context.beginPath();

        if (gridx !== 0) {
            for (; x < width; x += gridx) {
                context.moveTo(x, 0);
                context.lineTo(x, height);
            }
        }

        if (gridy !== 0) {
            for (; y < height; y += gridy) {
                context.moveTo(0, y);
                context.lineTo(width, y);
            }
        }

        context.lineWidth = 1;
        context.strokeStyle = gridColor;
        context.stroke();
    }
}
