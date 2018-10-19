import { Component, createElement } from "react";

import { Signature, SignatureProps } from "./Signature";
import { Alert } from "./Alert";

interface WrapperProps {
    mxObject?: mendix.lib.MxObject;
    mxform: mxui.lib.form._FormBase;
    readOnly?: boolean;
}

export interface SignatureContainerProps extends WrapperProps {
    dataUrl?: string;
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
    style?: object;
    saveImage: SaveImage;
    afterSignEvent: OnClickEventOptions;
    afterSignMicroflow: string;
    afterSignNanoflow: Nanoflow;
    changeTimeout: number;
}

type OnClickEventOptions = "doNothing" | "callMicroflow" | "callNanoflow";
type SaveImage = "onChange" | "onFormCommit";

interface Nanoflow {
    nanoflow: object[];
    paramsSpec: { Progress: string };
}

interface SignatureContainerState {
    url: string;
    alertMessage: string;
    base64Uri: string;
    clearPad: boolean;
}

export default class SignatureContainer extends Component<SignatureContainerProps, SignatureContainerState> {
    private subscriptionHandles: number[] = [];
    private formHandle = 0;
    readonly state = {
        alertMessage: "",
        base64Uri: "",
        clearPad: false,
        url: ""
    };

    render() {
        if (this.state.alertMessage) {
            return createElement(Alert, { bootstrapStyle: "danger" }, this.state.alertMessage);
        }

        return createElement(Signature, {
            ...this.props as SignatureProps,
            alertMessage: this.state.alertMessage,
            clearPad: this.state.clearPad,
            onSignEndAction: this.handleSignEnd
        });
    }

    componentWillReceiveProps(newProps: SignatureContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        const validationMessage = this.validateProps(newProps.mxObject);

        this.setState({ alertMessage: validationMessage });
    }

    componentWillMount() {
        this.props.mxform.unlisten(this.formHandle);
    }

    private handleSignEnd = (base64Uri: string) => {
        const { mxObject, saveImage } = this.props;

        if (mxObject && mxObject.inheritsFrom("System.Image")) {
            this.setState({ base64Uri });
            if (saveImage === "onChange") {
                setTimeout(() => this.saveDocument(), this.props.changeTimeout);
            }
        } else {
            this.setState({
                alertMessage: `${mxObject.getEntity()} does not inherit from "System.Image.`
            });
        }
    }

    private saveDocument = () => {
        const { height, mxObject, width } = this.props;

        mx.data.saveDocument(mxObject.getGuid(), this.generateFileName(),
            { width, height }, this.convertUrltoBlob(), () => {
                mx.ui.info("Image has been saved", true);
                this.setState({ clearPad: true });
            },
            error => {
                mx.ui.error(error.message, false);
            }
        );

        this.handleAfterSignAction();
    }

    private generateFileName(): string {
        return `${Math.floor(Math.random() * 1000000)}.png`;
    }

    public validateProps(mxObject: mendix.lib.MxObject): string {
        let errorMessage = "";

        if (mxObject && !mxObject.inheritsFrom("System.Image")) {
            errorMessage = `${mxObject.getEntity()} does not inherit from "System.Image.`;
        }
        if (this.props.afterSignEvent === "callMicroflow" && !this.props.afterSignMicroflow) {
            errorMessage = "A 'Microflow' is required for 'After sign event' 'Call a microflow'";
        } else if (this.props.afterSignEvent === "callNanoflow" && !this.props.afterSignNanoflow.nanoflow) {
            errorMessage = "A 'Nanoflow' is required for 'After sign event' 'Call a nanoflow'";
        }
        if (errorMessage) {
            errorMessage = `Error in configuration: ${errorMessage}`;
        }

        return errorMessage;
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];

        if (mxObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                guid: mxObject.getGuid(),
                callback: () => this.validateProps(mxObject)
            }));

            this.formHandle = this.props.mxform.listen("commit", this.saveDocument);
        }
    }

    private handleAfterSignAction = () => {
        const { afterSignEvent, afterSignMicroflow, afterSignNanoflow } = this.props;
        const context = new mendix.lib.MxContext();
        context.setContext(this.props.mxObject.getEntity(), this.props.mxObject.getGuid());

        if (afterSignEvent === "callMicroflow" && afterSignMicroflow && this.props.mxObject.getGuid()) {
            window.mx.ui.action(afterSignMicroflow, {
                context,
                origin: this.props.mxform,
                error: error => window.mx.ui.error(
                    `An error occurred while executing the nanoflow: ${afterSignMicroflow}: ${error.message}`
                )
            });
        } else if (afterSignEvent === "callNanoflow" && afterSignNanoflow.nanoflow) {
            window.mx.data.callNanoflow({
                nanoflow: afterSignNanoflow,
                origin: this.props.mxform,
                context,
                error: error => window.mx.ui.error(
                    `An error occurred while executing the nanoflow: ${error.message}`
                )
            });
        }
    }

    private convertUrltoBlob(): Blob {
        const base64Uri = this.state.base64Uri;
        const contentType = "image/png";
        const sliceSize = 512;
        const byteCharacters = atob(base64Uri.split(";base64,")[1]);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        const imageBlob = new Blob(byteArrays, { type: contentType });

        return imageBlob;
    }
}
