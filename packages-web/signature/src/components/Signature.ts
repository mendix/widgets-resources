import { CSSProperties, Component, createElement } from "react";
import * as classNames from "classnames";
import { Alert } from "./Alert";
import SignaturePad from "signature_pad";
import "../ui/Signature.scss";

export interface SignatureProps {
    alertMessage?: string;
    clearPad?: boolean;
    height: number;
    width: number;
    gridx: number;
    gridy: number;
    gridColor: string;
    gridBorder: number;
    penColor: string;
    maxLineWidth: number;
    minLineWidth: number;
    velocityFilterWeight: number;
    showGrid: boolean;
    timeout: number;
    status?: Status;
    onSignEndAction?: (imageUrl?: string) => void;
    widthUnit?: widthUnitType;
    heightUnit?: heightUnitType;
    style?: object;
}

export type Status = "enabled" | "disabled";

export interface SignatureState {
    isGridDrawn: boolean;
}

export type heightUnitType = "percentageOfWidth" | "pixels" | "percentageOfParent";
export type widthUnitType = "percentage" | "pixels";

export class Signature extends Component<SignatureProps, SignatureState> {
    private canvasNode: HTMLCanvasElement;
    private signaturePad: any;
    private width: number;
    private height: number;

    constructor(props: SignatureProps) {
        super(props);

        this.state = {
            isGridDrawn: false
        };

        this.handleSignEnd = this.handleSignEnd.bind(this);
        this.getCanvas = this.getCanvas.bind(this);
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.drawGrid = this.drawGrid.bind(this);
    }

    render() {
        return createElement("div", {
            className: classNames("widget-signature-wrapper", { disabled: this.props.status === "disabled" }),
            style: this.getStyle(this.props)
        }, createElement("canvas", {
                className: classNames("widget-Signature", "form-control mx-textarea-input mx-textarea",
                { disabled: this.props.status === "disabled" }),
                height: this.height,
                width: this.width,
                resize: true,
                ref: this.getCanvas
            }),
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
                onEnd: this.handleSignEnd
            });

            if (this.canvasNode.parentElement) {
                this.height = this.canvasNode.parentElement.clientHeight;
                this.width = this.canvasNode.parentElement.clientWidth;
            }
        }
        window.addEventListener("resize", this.resizeCanvas);
    }

    componentDidUpdate() {
        if (this.props.showGrid && !this.state.isGridDrawn) {
            this.drawGrid();
            this.setState({ isGridDrawn: true });
        }
        if (this.props.clearPad) {
            this.signaturePad.clear();
            if (this.props.showGrid) {
                this.drawGrid();
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeCanvas);
    }

    private handleSignEnd() {
        const { onSignEndAction } = this.props;

        if (onSignEndAction) {
            onSignEndAction(this.signaturePad.toDataURL());
        }
    }

    private getCanvas(node: HTMLCanvasElement) {
        this.canvasNode = node;
    }

    private resizeCanvas() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);

        this.width = this.canvasNode.parentElement.offsetWidth * ratio;
        const context = this.canvasNode.getContext("2d") as CanvasRenderingContext2D;
        context.scale(ratio, ratio);

        this.signaturePad.clear();
        this.setState({ isGridDrawn: false });
    }

    private drawGrid() {
        const { showGrid, gridColor, gridx, gridy } = this.props;
        if (!showGrid) {
            return;
        }

        if (this.width && this.height) {
            let x = gridx;
            let y = gridy;
            const context = this.canvasNode.getContext("2d") as CanvasRenderingContext2D;
            context.beginPath();

            for (; x < this.width; x += gridx) {
                context.moveTo(x, 0);
                context.lineTo(x, this.height);
            }

            for (; y < this.height; y += gridy) {
                context.moveTo(0, y);
                context.lineTo(this.width, y);
            }

            context.lineWidth = 1;
            context.strokeStyle = gridColor;
            context.stroke();
        }
    }

    private getStyle(props: SignatureProps): object {
        const style: CSSProperties = {
            width: props.widthUnit === "percentage" ? `${props.width}%` : `${props.width}px`
        };
        if (props.heightUnit === "percentageOfWidth") {
            style.paddingBottom = props.widthUnit === "percentage"
                ? `${props.height}%`
                : `${props.width / 2}px`;
        } else if (props.heightUnit === "pixels") {
            style.height = `${props.height}px`;
        } else if (props.heightUnit === "percentageOfParent") {
            style.height = `${props.height}%`;
        }

        return { ...style, ...this.props.style };
    }
}
