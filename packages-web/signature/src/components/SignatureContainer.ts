import { Component, createElement } from "react";

import { SignatureCanvas } from "./Signature";
import { Alert } from "./Alert";

interface WrapperProps {
    mxObject: mendix.lib.MxObject;
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
    maxWidth?: string;
    minWidth?: string;
    velocityFilterWeight?: string;
    showGrid?: boolean;
    onChangeMicroflow: string;
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
        this.saveImage = this.saveImage.bind(this);
    }

    render() {
        if (this.state.alertMessage) {
            return createElement(Alert, { message: this.state.alertMessage || "", bootstrapStyle: "danger" });
        }
        // tslint:disable-next-line:no-object-literal-type-assertion
        return createElement(SignatureCanvas, {
            ...this.props as SignatureContainerProps,
            imageUrl: this.state.url,
            onClickAction: this.saveImage
        } as any);
    }

    componentWillReceiveProps(newProps: SignatureContainerProps) {
        this.resetSubscriptions(newProps.mxObject);

        this.setState({
            url: this.getAttributeValue(this.props.dataUrl, newProps.mxObject)
        });
    }

    private saveImage(url: string) {
        const { mxObject, dataUrl, onChangeMicroflow } = this.props;

        if (mxObject && dataUrl) {
            mxObject.set(dataUrl, url);
            this.executeAction(onChangeMicroflow, mxObject.getGuid());
        } else {
            this.setState({ alertMessage: "No Data Url attribute found" });
        }
    }

    private getAttributeValue(attributeName: string, mxObject?: mendix.lib.MxObject): string {
        return mxObject ? mxObject.get(attributeName) as string : "";
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
        }
    }

    private updateState() {

        this.setState({
            url: this.getAttributeValue(this.props.dataUrl, this.props.mxObject)
        });
    }

    private executeAction(actionname: string, guid: string) {
        if (actionname && guid) {
            window.mx.ui.action(actionname, {
                error: (error) =>
                    window.mx.ui.error(`Error while executing microflow ${actionname}: ${error.message}`),
                params: {
                    applyto: "selection",
                    guids: [ guid ]
                }
            });
        }
    }
}
