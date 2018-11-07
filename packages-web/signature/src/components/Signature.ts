import { CSSProperties, PureComponent, createElement } from "react";
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
    widthUnit: widthUnitType;
    heightUnit: heightUnitType;
    divStyle?: object;
    saveGridToImage: boolean;
}

export interface SignatureState {
    isGridDrawn: boolean;
    alertMessage: string;
}

export type penOptions = "fountain" | "ballpoint" | "marker";
export type heightUnitType = "percentageOfWidth" | "pixels" | "percentageOfParent";
export type widthUnitType = "percentage" | "pixels";

export class Signature extends PureComponent<SignatureProps, SignatureState> {
    private canvasNode: HTMLCanvasElement;
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
                style: this.getStyle(this.props)
            }, createElement("canvas", {
                className: "widget-Signature form-control mx-textarea-input mx-textarea signature-canvas",
                ref: this.getCanvas
            })));
    }

    componentDidMount() {
        if (this.canvasNode) {
            this.signaturePad = new SignaturePad(this.canvasNode, {
                penColor: this.props.penColor,
                onEnd: this.handleSignEnd,
                ...this.signaturePadOptions()
            });

            if (this.canvasNode.parentElement) {
                this.canvasNode.height = this.canvasNode.parentElement.offsetHeight;
                this.canvasNode.width = this.canvasNode.parentElement.offsetWidth;
            }
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

    private getCanvas = (node: HTMLCanvasElement) => {
        this.canvasNode = node;
    }

    private resizeCanvas = () => {
        const ratio = 1;

        if (this.canvasNode && this.signaturePad) {
            const data = this.signaturePad.toData();
            this.canvasNode.width = this.canvasNode.parentElement.offsetWidth * ratio;
            this.canvasNode.height = this.canvasNode.parentElement.offsetHeight * ratio;
            const context = this.canvasNode.getContext("2d") as CanvasRenderingContext2D;
            context.scale(ratio, ratio);
            context.clearRect(0, 0, this.canvasNode.width, this.canvasNode.height);
            this.signaturePad.fromData(data);
            this.setState({ isGridDrawn: false });
        }
    }

    private drawGrid = () => {
        const { gridColor, gridColumnSize, gridRowSize } = this.props;

        if (this.canvasNode && this.canvasNode.width && this.canvasNode.height) {
            let x = gridColumnSize;
            let y = gridRowSize;
            const context = this.canvasNode.getContext("2d") as CanvasRenderingContext2D;
            context.beginPath();

            for (; x < this.canvasNode.width; x += gridColumnSize) {
                context.moveTo(x, 0);
                context.lineTo(x, this.canvasNode.height);
            }

            for (; y < this.canvasNode.height; y += gridRowSize) {
                context.moveTo(0, y);
                context.lineTo(this.canvasNode.width, y);
            }

            context.lineWidth = this.props.gridBorder;
            context.strokeStyle = gridColor;
            context.stroke();
            this.setState({ isGridDrawn: true });
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

        return { ...style, ...props.divStyle };
    }
}
