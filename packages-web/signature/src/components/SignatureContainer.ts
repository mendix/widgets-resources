import { Component, createElement } from "react";

import { Signature, penOptions } from "./Signature";
import { Dimensions } from "./SizeContainer";
import Utils from "../utils/Utils";

interface WrapperProps {
    "class": string;
    mxObject?: mendix.lib.MxObject;
    mxform: mxui.lib.form._FormBase;
    style?: string;
    friendlyId: string;
}

export interface SignatureContainerProps extends WrapperProps, Dimensions {
    hasSignatureAttribute: string;
    showGrid: boolean;
    gridBorderColor: string;
    gridCellHeight: number;
    gridCellWidth: number;
    gridBorderWidth: number;
    penType: penOptions;
    penColor: string;
}

interface SignatureContainerState {
    alertMessage: string;
    hasSignature: boolean;
}

export default class SignatureContainer extends Component<SignatureContainerProps, SignatureContainerState> {
    private subscriptionHandles: number[] = [];
    private base64Uri: string;
    private formHandle?: number;

    readonly state = {
        alertMessage: "",
        hasSignature: false
    };

    render() {
        return createElement(Signature, {
            ...this.props as SignatureContainerProps,
            wrapperStyle: Utils.parseStyle(this.props.style),
            alertMessage: this.state.alertMessage,
            clearSignature: this.state.hasSignature ? true : false,
            onSignEndAction: this.handleSignEnd,
            className: this.props.class
        });
    }

    componentWillReceiveProps(newProps: SignatureContainerProps) {
        const alertMessage = this.validateProps(newProps.mxObject);

        if (alertMessage) {
            this.setState({ alertMessage });
        }
    }

    componentDidUpdate() {
        this.resetSubscriptions(this.props.mxObject);
    }

    componentDidMount() {
        this.formHandle = this.props.mxform.listen("commit", callback => this.saveDocument(callback));
    }

    componentWillUnmount() {
        logger.debug("componentWillUnMount");
        if (this.formHandle) {
            this.props.mxform.unlisten(this.formHandle);
        }
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    private handleSignEnd = (base64Uri: string) => {
        const { mxObject } = this.props;

        if (mxObject && this.state.hasSignature === false) {
            mxObject.set(this.props.hasSignatureAttribute, true);
        }
        this.base64Uri = base64Uri;
        if (base64Uri) {
            this.setState({ hasSignature: true });
        }
    }

    private saveDocument(callback: () => void) {
        if (this.base64Uri && this.state.hasSignature) {
            mx.data.saveDocument(this.props.mxObject.getGuid(), this.generateFileName(), { },
                Utils.convertUrlToBlob(this.base64Uri),
                callback,
                error => mx.ui.error("Error saving signature: " + error.message)
            );
        } else {
            callback();
        }
    }

    private generateFileName(): string {
        return `signature${Math.floor(Math.random() * 1000000)}.png`;
    }

    public validateProps(mxObject: mendix.lib.MxObject): string {
        let errorMessage = "";

        if (mxObject && !mxObject.inheritsFrom("System.Image")) {
            errorMessage = `${this.props.friendlyId}: ${mxObject.getEntity()} does not inherit from "System.Image.`;
        }

        return errorMessage;
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];

        if (mxObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                guid: mxObject.getGuid(),
                callback: () => this.updateCanvasState()
            }));
            this.subscriptionHandles.push(mx.data.subscribe({
                guid: mxObject.getGuid(),
                attr: this.props.hasSignatureAttribute,
                callback: () => this.updateCanvasState()
            }));
        }
    }

    private updateCanvasState = () => {
        const { mxObject, hasSignatureAttribute } = this.props;
        if (hasSignatureAttribute) {
            const hasSignature = !!mxObject && mxObject.get(hasSignatureAttribute) as boolean;
            if (this.state.hasSignature !== hasSignature) {
                this.setState({ hasSignature });
            }
        }
    }

}
