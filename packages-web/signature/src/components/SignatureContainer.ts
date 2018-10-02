import { Component, createElement } from "react";

import { Signature, SignatureProps } from "./Signature";

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
    timeout: number;
    editable: "default" | "never";
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
    imageBlob: Blob;
}

export default class SignatureContainer extends Component<SignatureContainerProps, SignatureContainerState> {
    private subscriptionHandles: number[] = [];
    private _formHandle = 0;
    public get formHandle() {
        return this._formHandle;
    }
    public set formHandle(value) {
        this._formHandle = value;
    }

    constructor(props: SignatureContainerProps) {
        super(props);

        this.state = {
            alertMessage: "",
            imageBlob: null,
            url: ""
        };

        this.handleValidations = this.handleValidations.bind(this);
    }

    render() {
        return createElement(Signature, {
            ...this.props as SignatureProps,
            alertMessage: this.state.alertMessage,
            onSignEndAction: this.handleSignEnd,
            status: this.getCanvasStatus(!this.isReadOnly())
        });
    }

    componentWillReceiveProps(newProps: SignatureContainerProps) {
        this.resetSubscriptions(newProps.mxObject);

        this.setState({
            url: this.getAttributeValue(this.props.dataUrl, newProps.mxObject)
        });
    }

    private handleSignEnd = (url: string) => {
        const { mxObject, dataUrl, saveImage } = this.props;

        if (mxObject && mxObject.inheritsFrom("System.Image") && dataUrl) {
            this.convertUrltoBlob(url);
            if (saveImage === "onChange") {
                setTimeout(this.saveDocument(), 3000);
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
            { width, height }, this.state.imageBlob, () => {
                mx.ui.info("Image has been saved", false);
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

    private getAttributeValue(attributeName: string, mxObject?: mendix.lib.MxObject): string {
        return mxObject ? mxObject.get(attributeName) as string : "";
    }

    private isReadOnly(): boolean {
        const { dataUrl, editable, mxObject, readOnly } = this.props;

        return !(editable === "default" && mxObject) || (readOnly || mxObject.isReadonlyAttr(dataUrl));
    }

    private getCanvasStatus(enabled: boolean) {
        return enabled ? "enabled" : "disabled";
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];

        if (mxObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: this.updateState,
                guid: mxObject.getGuid()
            }));

            this.subscriptionHandles.push(mx.data.subscribe({
                attr: this.props.dataUrl,
                callback: this.updateState,
                guid: mxObject.getGuid()
            }));

            this.subscriptionHandles.push(mx.data.subscribe({
                callback: this.handleValidations,
                guid: mxObject.getGuid(),
                val: true
            }));

            this.formHandle = this.props.mxform.listen("commit", this.saveDocument);
        }
    }

    private updateState = () => {
        this.setState({
            url: this.getAttributeValue(this.props.dataUrl, this.props.mxObject)
        });
    }

    private handleValidations(validations: mendix.lib.ObjectValidation[]) {
        const validationMessage = validations[0].getErrorReason(this.props.dataUrl);
        validations[0].removeAttribute(this.props.dataUrl);

        if (validationMessage) {
            this.setState({ alertMessage: validationMessage });
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

    private convertUrltoBlob(base64Uri: string, contentType = "image/png", sliceSize = 512) {
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
        this.setState({ imageBlob });
    }
}
