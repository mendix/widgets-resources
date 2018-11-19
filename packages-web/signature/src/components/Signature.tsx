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
    readOnly: boolean;
}

export type penOptions = "fountain" | "ballpoint" | "marker";

export class Signature extends React.PureComponent<SignatureProps> {
    private canvasNode: HTMLCanvasElement;
    private signaturePad: SignaturePad;

    render() {
        const { widthUnit, width, heightUnit, height, readOnly, className, alertMessage } = this.props;

        return < SizeContainer
            className={ classNames("widget-signature", className) }
            classNameInner="widget-signature-wrapper form-control mx-textarea-input mx-textarea"
            widthUnit={widthUnit}
            width={width}
            heightUnit={heightUnit}
            height={height}
            readOnly={readOnly}
        >
            <Alert bootstrapStyle = "danger">{alertMessage}</Alert>
            { this.getGrid() }
            <canvas className="widget-signature-canvas"
                ref={ (node: HTMLCanvasElement) => this.canvasNode = node }
            />
            <ReactResizeDetector handleWidth handleHeight onResize={ this.onResize } />
        </SizeContainer>;
    }

    componentDidMount() {
        this.signaturePad = new SignaturePad(this.canvasNode, {
            penColor: this.props.penColor,
            onEnd: this.handleSignEnd,
            ...this.signaturePadOptions()
        });
        if (this.props.readOnly) {
            this.signaturePad.off();
        }
    }

    componentWillReceiveProps(nextProps: SignatureProps) {
        if (this.signaturePad) {
            const { clearSignature, readOnly } = this.props;
            if (nextProps.clearSignature !== clearSignature && clearSignature) {
                this.signaturePad.clear();
            }
            if (nextProps.readOnly !== readOnly) {
                if (nextProps.readOnly) {
                    this.signaturePad.off();
                } else {
                    this.signaturePad.on();
                }
            }
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
            const { gridCellWidth, gridCellHeight, gridBorderColor, gridBorderWidth } = this.props;

            return <Grid
                gridCellWidth={gridCellWidth}
                gridCellHeight={gridCellHeight}
                gridBorderColor={gridBorderColor}
                gridBorderWidth={gridBorderWidth}
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
