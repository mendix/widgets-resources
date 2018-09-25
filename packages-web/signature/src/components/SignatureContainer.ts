import { Component, createElement } from "react";

import { Signature, SignatureProps, heightUnitType, widthUnitType } from "./Signature";

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
    afterSignEvent: OnClickEventOptions;
    afterSignMicroflow: string;
    afterSignNanoflow: Nanoflow;
    timeout: number;
    editable?: "default" | "never";
}

type OnClickEventOptions = "doNothing" | "callMicroflow" | "callNanoflow";

interface Nanoflow {
    nanoflow: object[];
    paramsSpec: { Progress: string };
}

interface SignatureContainerState {
    url: string;
    alertMessage: string;
}

export default class SignatureContainer extends Component<SignatureContainerProps, SignatureContainerState> {
    private subscriptionHandles: number[] = [];

    constructor(props: SignatureContainerProps) {
        super(props);

        this.state = {
            url: "",
            alertMessage: ""
        };

        this.updateState = this.updateState.bind(this);
        this.handleValidations = this.handleValidations.bind(this);
    }

    render() {
        return createElement(Signature, {
            ...this.props as SignatureProps,
            alertMessage: this.state.alertMessage,
            onClickAction: this.saveImage,
            onEndAction: this.handleAfterSignAction,
            status: this.getCanvasStatus(!this.isReadOnly())
        });
    }

    componentWillReceiveProps(newProps: SignatureContainerProps) {
        this.resetSubscriptions(newProps.mxObject);

        this.setState({
            url: this.getAttributeValue(this.props.dataUrl, newProps.mxObject)
        });
    }

    private saveImage = (url: string) => {
        const { mxObject, dataUrl } = this.props;

        if (mxObject && mxObject.inheritsFrom("System.Image") && dataUrl) {
            mx.data.saveDocument(
                mxObject.getGuid(),
                `${Math.floor(Math.random() * 1000000)}.png`,
                { width: this.props.width, height: this.props.height },
                this.base64toBlob(url),
                () => { mx.ui.info("Image has been saved", false); },
                error => { mx.ui.error(error.message, false); }
            );

            // this.executeAction(onClickEvent, onChangeMicroflow, onChangeNanoflow);
        } else {
            this.setState({ alertMessage: "The entity does not inherit from System Image" });
        }
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
        }
    }

    private updateState() {
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

    private base64toBlob(base64Uri: string): Blob {
        const byteString = atob(base64Uri.split(";base64,")[1]);
        const bufferArray = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(bufferArray);

        for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
        }

        return new Blob([ bufferArray ], { type: base64Uri.split(":")[0] });
    }
}
