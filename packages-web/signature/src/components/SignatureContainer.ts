import { Component, createElement } from "react";

import { Signature, penOptions } from "./Signature";

interface WrapperProps {
    mxObject?: mendix.lib.MxObject;
    mxform: mxui.lib.form._FormBase;
    style?: string;
    friendlyId: string;
}

export interface SignatureContainerProps extends WrapperProps {
    showSignature: string;
    height: number;
    width: number;
    gridColumnSize: number;
    gridRowSize: number;
    gridColor: string;
    gridBorder: number;
    penColor: string;
    penType: penOptions;
    showGrid: boolean;
}

interface SignatureContainerState {
    alertMessage: string;
    hasSignature: boolean;
}

export default class SignatureContainer extends Component<SignatureContainerProps, SignatureContainerState> {
    private subscriptionHandles: number[] = [];
    private base64Uri: string;
    private formHandle = 0;
    readonly state = {
        alertMessage: "",
        hasSignature: false
    };

    render() {
        return createElement(Signature, {
            ...this.props as SignatureContainerProps,
            divStyle: parseStyle(this.props.style),
            alertMessage: this.state.alertMessage,
            clearPad: this.state.hasSignature ? true : false,
            onSignEndAction: this.handleSignEnd
        });
    }

    componentWillReceiveProps(newProps: SignatureContainerProps) {
        const validationMessage = this.validateProps(newProps.mxObject);

        if (validationMessage) {
            this.setState({ alertMessage: validationMessage });
        }
    }

    componentDidUpdate() {
        this.resetSubscriptions(this.props.mxObject);
    }

    componentWillMount() {
        this.props.mxform.unlisten(this.formHandle);
    }

    private handleSignEnd = (base64Uri: string) => {
        const { mxObject } = this.props;
        this.base64Uri = "";

        if (mxObject && this.state.hasSignature === false) {
            mxObject.set(this.props.showSignature, true);
        }
        this.base64Uri = base64Uri;
    }

    private saveDocument = (mxObject: mendix.lib.MxObject) => {
        const { height, width } = this.props;

        if (this.base64Uri && this.state.hasSignature) {
            mx.data.saveDocument(mxObject.getGuid(), this.generateFileName(),
                { width, height }, this.convertUrltoBlob(), () => {
                    mx.ui.info("Image has been saved", true);
                },
                error => {
                    mx.ui.error(error.message, false);
                });
        }
    }

    private generateFileName(): string {
        return `${Math.floor(Math.random() * 1000000)}.png`;
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
                callback: () => this.updateCanvasState(mxObject)
            }));
            this.subscriptionHandles.push(mx.data.subscribe({
                attr: this.props.showSignature,
                callback: () => this.updateCanvasState(mxObject),
                guid: mxObject.getGuid()
            }));

            this.formHandle = this.props.mxform.listen("commit", () => this.saveDocument(mxObject));
        }
    }

    private updateCanvasState = (mxObject: mendix.lib.MxObject) => {
        this.setState({
            hasSignature: this.getAttributeValue(this.props.showSignature, mxObject)
        });
    }

    private getAttributeValue(attribute: string, mxObject?: mendix.lib.MxObject): boolean {
        return !!mxObject && mxObject.get(attribute) as boolean;
    }

    private convertUrltoBlob(): Blob {
        const base64Uri = this.base64Uri;
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

export const parseStyle = (style = ""): {[key: string]: string} => { // Doesn't support a few stuff.
    try {
        return style.split(";").reduce<{[key: string]: string}>((styleObject, line) => {
            const pair = line.split(":");
            if (pair.length === 2) {
                const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                styleObject[name] = pair[1].trim();
            }

            return styleObject;
        }, {});
    } catch (error) {
        // tslint:disable-next-line no-console
        window.console.log("Failed to parse style", style, error);
    }

    return {};
};
