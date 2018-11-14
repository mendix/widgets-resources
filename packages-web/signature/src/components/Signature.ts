import { PureComponent, createElement } from "react";
import { Alert } from "./Alert";
import SignaturePad, { IOptions } from "signature_pad";
import "../ui/Signature.scss";

export interface SignatureProps {
    alertMessage?: string;
    clearPad: boolean;
    height: number;
    width: number;
    gridColumnSize: number;
    gridRowSize: number;
    gridColor: string;
    gridBorder: number;
    penType: penOptions;
    penColor: string;
    showGrid: boolean;
    onSignEndAction?: (imageUrl?: string) => void;
    divStyle?: object;
}

export interface SignatureState {
    isGridDrawn: boolean;
    alertMessage: string;
}

export type penOptions = "fountain" | "ballpoint" | "marker";

export class Signature extends PureComponent<SignatureProps, SignatureState> {
    private canvasNode: HTMLCanvasElement;
    private GridNode: HTMLCanvasElement;
    private signaturePad: SignaturePad;
    private eventHandle = 0;
    readonly state = {
        isGridDrawn: false,
        alertMessage: ""
    };

    render() {
        return createElement("div", {},
            createElement(Alert,
                { bootstrapStyle: "danger" },
                this.state.alertMessage),
            createElement("div", {
                className: "widget-signature-wrapper",
                style: { height: this.props.height, width: this.props.width, ...this.props.divStyle }
            }, createElement("canvas", {
                className: "widget-signature form-control mx-textarea-input mx-textarea signature-grid",
                ref: this.getGridCanvas
            }), createElement("canvas", {
                className: "widget-signature form-control mx-textarea-input mx-textarea signature-canvas",
                ref: this.getCanvas
            })
        ));
    }

    componentDidMount() {
        if (this.canvasNode && this.GridNode) {
            this.signaturePad = new SignaturePad(this.canvasNode, {
                penColor: this.props.penColor,
                onEnd: this.handleSignEnd,
                ...this.signaturePadOptions()
            });

            this.canvasNode.height = this.props.height;
            this.canvasNode.width = this.props.width;
            this.GridNode.height = this.props.height;
            this.GridNode.width = this.props.width;
        }
        window.addEventListener("resize", this.throttleUpdate);
    }

    componentWillReceiveProps(nextProps: SignatureProps) {
        if (nextProps.alertMessage !== this.props.alertMessage) {
            this.setState({ alertMessage: nextProps.alertMessage });
        }
        if (nextProps.clearPad !== this.props.clearPad && this.props.clearPad) {
            this.signaturePad.clear();
            this.setState({ isGridDrawn: false });
        }
    }

    componentDidUpdate() {
        if (this.props.showGrid && this.state.isGridDrawn !== true) {
            this.drawGrid();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.throttleUpdate);
    }

    private throttleUpdate = () => {
        if (this.eventHandle) {
            window.clearTimeout(this.eventHandle);
        }
        this.eventHandle = window.setTimeout(() => {
            this.resizeCanvas();
            this.eventHandle = 0;
        }, 50);
    }

    private signaturePadOptions = (): IOptions => {
        let options: IOptions = {};
        if (this.props.penType === "fountain") {
            options = { minWidth: 0.7, maxWidth: 2.6, velocityFilterWeight: 0.6 };
        } else if (this.props.penType === "ballpoint") {
            options = { minWidth: 1.4, maxWidth: 1.5, velocityFilterWeight: 1.5 };
        } else if (this.props.penType === "marker") {
            options = { minWidth: 2, maxWidth: 4, velocityFilterWeight: 0.9 };
        }
        return options;
    }

    private handleSignEnd = () => {
        const { onSignEndAction } = this.props;

        if (onSignEndAction) {
            onSignEndAction(this.signaturePad.toDataURL());
        }
    }

    private getGridCanvas = (node: HTMLCanvasElement) => {
        this.GridNode = node;
    }

    private getCanvas = (node: HTMLCanvasElement) => {
        this.canvasNode = node;
    }

    private resizeCanvas = () => {
        if (this.GridNode && this.signaturePad) {
            const data = this.signaturePad.toData();
            const context = this.GridNode.getContext("2d") as CanvasRenderingContext2D;
            context.scale(1, 1);
            context.clearRect(0, 0, this.GridNode.width, this.GridNode.height);
            this.signaturePad.fromData(data);
            this.setState({ isGridDrawn: false });
        }
    }

    private drawGrid = () => {
        const { gridColor, gridColumnSize, gridRowSize, gridBorder } = this.props;

        if (this.GridNode && this.GridNode.width && this.GridNode.height) {
            let x = gridColumnSize;
            let y = gridRowSize;
            const context = this.GridNode.getContext("2d") as CanvasRenderingContext2D;
            context.beginPath();

            for (; x < this.GridNode.width; x += gridColumnSize) {
                context.moveTo(x, 0);
                context.lineTo(x, this.GridNode.height);
            }

            for (; y < this.GridNode.height; y += gridRowSize) {
                context.moveTo(0, y);
                context.lineTo(this.GridNode.width, y);
            }

            context.lineWidth = gridBorder;
            context.strokeStyle = gridColor;
            context.stroke();
            this.setState({ isGridDrawn: true });
        }
    }
}
