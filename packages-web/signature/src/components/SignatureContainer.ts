import { Component, createElement } from "react";
import { SignatureCanvas, SignatureProps } from "./Signature";

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
}

interface SignatureContainerState {
    url: string;
}

export default class SignatureContainer extends Component<SignatureContainerProps, SignatureContainerState> {
    private subscriptionHandles: number[] = [];
    constructor(props: SignatureContainerProps) {
        super(props);

        this.state = {
            url : this.getAttributeValue(this.props.dataUrl, this.props.mxObject)
        };
        this.updateState = this.updateState.bind(this);
    }

    render() {
        // tslint:disable-next-line:no-object-literal-type-assertion
        return createElement(SignatureCanvas, {
            ...this.props as SignatureContainerProps,
            url: this.props.dataUrl
        } as SignatureProps);
    }

    componentWillReceiveProps(newProps: SignatureContainerProps) {
        this.resetSubscriptions(newProps.mxObject);

        this.setState({
            url: this.getAttributeValue(this.props.dataUrl, newProps.mxObject)
        });
    }

    private getAttributeValue(attributeName: string, mxObject?: mendix.lib.MxObject): string {
        return mxObject ? mxObject.get(attributeName) as string : "";
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);

        if (mxObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: this.updateState,
                guid: mxObject.getGuid()
            }));
        }
    }

    private updateState() {

        this.setState({
            url : this.getAttributeValue(this.props.dataUrl, this.props.mxObject)
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
