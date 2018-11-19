import * as React from "react";

import SignaturePad, { IOptions } from "signature_pad";
import * as classNames from "classnames";
import ReactResizeDetector from "react-resize-detector";

import { Alert } from "./Alert";
import Grid from "./Grid";
import { Dimensions, SizeContainer } from "./SizeContainer";

import "../ui/Signature.scss";

export interface SignatureProps extends Dimensions {
    className: string;
    alertMessage?: string;
    clearSignature: boolean;
    showGrid: boolean;
    gridCellWidth: number;
    gridCellHeight: number;
    gridBorderColor: string;
    gridBorderWidth: number;
    penType: penOptions;
    penColor: string;
    onSignEndAction?: (imageUrl?: string) => void;
    wrapperStyle?: object;
}

export type penOptions = "fountain" | "ballpoint" | "marker";

export class Signature extends React.PureComponent<SignatureProps> {
    private canvasNode: HTMLCanvasElement;
    private signaturePad: SignaturePad;

    render() {
        return < SizeContainer
                className={ classNames("widget-signature", this.props.className) }
                classNameInner="widget-signature-wrapper form-control mx-textarea-input mx-textarea"
                widthUnit={ this.props.widthUnit }
                width={ this.props.width }
                heightUnit={ this.props.heightUnit }
                height={ this.props.height }
            >
                <Alert bootstrapStyle = "danger">{ this.props.alertMessage }</Alert>
                { this.getGrid() }
                <canvas className = "widget-signature-canvas"
                    ref = { (node: HTMLCanvasElement) => this.canvasNode = node }
                />,
                <ReactResizeDetector handleWidth handleHeight onResize={ this.onResize }/>
            </SizeContainer>;
    }

    componentDidMount() {
        this.signaturePad = new SignaturePad(this.canvasNode, {
            penColor: this.props.penColor,
            onEnd: this.handleSignEnd,
            ...this.signaturePadOptions()
        });
    }

    componentWillReceiveProps(nextProps: SignatureProps) {
        if (nextProps.clearSignature !== this.props.clearSignature && this.props.clearSignature) {
            this.signaturePad.clear();
        }
    }

    private onResize = () => {
        if (this.canvasNode) {
            const data = this.signaturePad.toData();
            this.canvasNode.width = this.canvasNode.parentElement.offsetWidth;
            this.canvasNode.height = this.canvasNode.parentElement.offsetHeight;
            this.signaturePad.clear();
            this.signaturePad.fromData(data);
        }
    }

    private getGrid(): React.ReactNode {
        if (this.props.showGrid) {
            return <Grid
                gridCellWidth = { this.props.gridCellWidth }
                gridCellHeight = { this.props.gridCellHeight }
                gridBorderColor = { this.props.gridBorderColor }
                gridBorderWidth = { this.props.gridBorderWidth }
            />;
        }
        return null;
    }

    private signaturePadOptions(): IOptions {
        let options: IOptions = {};
        if (this.props.penType === "fountain") {
            options = { minWidth: 0.6, maxWidth: 2.6, velocityFilterWeight: 0.6 };
        } else if (this.props.penType === "ballpoint") {
            options = { minWidth: 1.4, maxWidth: 1.5, velocityFilterWeight: 1.5 };
        } else if (this.props.penType === "marker") {
            options = { minWidth: 2, maxWidth: 4, velocityFilterWeight: 0.9 };
        }
        return options;
    }

    private handleSignEnd = () => {
        if (this.props.onSignEndAction) {
            this.props.onSignEndAction(this.signaturePad.toDataURL());
        }
    }
}
