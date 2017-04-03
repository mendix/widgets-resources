import { Component, createElement } from "react";
import { ProgressCircle, ProgressTextSize } from "./ProgressCircle";
import { Alert } from "./Alert";

interface ProgressCircleContainerProps {
    animate: boolean;
    mxObject: mendix.lib.MxObject;
    maximumValueAttribute: string;
    microflow?: string;
    onClickEvent: OnClickOptions;
    page?: string;
    progressAttribute: string;
    textSize: ProgressTextSize;
}

interface ProgressCircleContainerState {
    alertMessage?: string;
    maximumValue?: number;
    showAlert?: boolean;
    progressValue?: number;
}

type OnClickOptions = "doNothing" | "showPage" | "callMicroflow";

class ProgressCircleContainer extends Component<ProgressCircleContainerProps, ProgressCircleContainerState> {
    private subscriptionHandles: number[];
    private defaultMaximumValue = 100;
    private attributeCallback: (mxObject: mendix.lib.MxObject) => () => void;

    constructor(props: ProgressCircleContainerProps) {
        super(props);

        this.state = {
            alertMessage: this.validateProps(),
            maximumValue: this.getValue(props.mxObject, props.maximumValueAttribute),
            progressValue: this.getValue(props.mxObject, this.props.progressAttribute),
            showAlert: !!this.validateProps()
        };
        this.subscriptionHandles = [];
        this.handleOnClick = this.handleOnClick.bind(this);
        this.attributeCallback = mxObject => () => this.updateValues(mxObject);
    }

    render() {
        if (this.state.showAlert) {
            return createElement(Alert, { message: this.state.alertMessage });
        }

        return createElement(ProgressCircle, {
            alertMessage: this.state.alertMessage,
            animate: this.props.animate,
            clickable: !!this.props.microflow || !!this.props.page,
            maximumValue: this.state.maximumValue,
            onClickAction: this.handleOnClick,
            textSize: this.props.textSize,
            value: this.state.progressValue
        });
    }

    componentWillReceiveProps(newProps: ProgressCircleContainerProps) {
        this.resetSubscription(newProps.mxObject);
        this.updateValues(newProps.mxObject);
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach((handle) => window.mx.data.unsubscribe(handle));
    }

    private validateProps(): string {
        let errorMessage = "";
        if (this.props.onClickEvent === "callMicroflow" && !this.props.microflow) {
            errorMessage = "on click microflow is required";
        } else if (this.props.onClickEvent === "showPage" && !this.props.page) {
            errorMessage = "on click page is required";
        }

        return errorMessage && `Error in progress circle configuration: ${errorMessage}`;
    }

    private getValue(mxObject: mendix.lib.MxObject, attribute: string): number | undefined {
        return mxObject ? parseFloat(mxObject.get(attribute) as string) : undefined;
    }

    private updateValues(mxObject: mendix.lib.MxObject) {
        const maxValue = this.getValue(mxObject, this.props.maximumValueAttribute);
        this.setState({
            maximumValue: (maxValue || maxValue === 0) ? maxValue : this.defaultMaximumValue,
            progressValue: this.getValue(mxObject, this.props.progressAttribute)
        });
    }

    private resetSubscription(mxObject: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach((handle) => window.mx.data.unsubscribe(handle));

        if (mxObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: this.attributeCallback(mxObject),
                guid: mxObject.getGuid()
            }));

            [ this.props.progressAttribute, this.props.maximumValueAttribute ].forEach(attr => {
                this.subscriptionHandles.push(window.mx.data.subscribe({
                    attr,
                    callback: this.attributeCallback(mxObject),
                    guid: mxObject.getGuid()
                }));
            });
        }

    }

    private handleOnClick() {
        const { mxObject, microflow, onClickEvent, page } = this.props;
        if (mxObject && onClickEvent === "callMicroflow" && microflow && mxObject.getGuid()) {
            window.mx.ui.action(microflow, {
                error: error => window.mx.ui.error(
                    `Error while executing microflow ${microflow}: ${error.message}`
                ),
                params: {
                    applyto: "selection",
                    guids: [ mxObject.getGuid() ]
                }
            });
        } else if (mxObject && onClickEvent === "showPage" && page && mxObject.getGuid()) {
            const context = new window.mendix.lib.MxContext();
            context.setContext(mxObject);

            window.mx.ui.openForm(page, {
                error: error => window.mx.ui.error(
                    `Error while opening page ${page}: ${error.message}`
                ),
                context
            });
        }
    }
}

export { ProgressCircleContainer as default };
