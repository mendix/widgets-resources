import { Component, createElement, ReactNode } from "react";
import { BootstrapStyle, ProgressCircle, ProgressTextSize } from "./ProgressCircle";
import { Alert } from "./Alert";

interface WrapperProps {
    class: string;
    mxObject?: mendix.lib.MxObject;
    style: string;
    mxform: mxui.lib.form._FormBase;
}

export interface ContainerProps extends WrapperProps {
    animate: boolean;
    circleThickness: number;
    displayText: DisplayText;
    displayTextAttribute: string;
    displayTextStatic: string;
    maximumValueAttribute: string;
    microflow?: string;
    nanoflow: Nanoflow;
    negativeValueColor: BootstrapStyle;
    onClickEvent: OnClickOptions;
    page?: string;
    progressAttribute: string;
    positiveValueColor: BootstrapStyle;
    textSize: ProgressTextSize;
    openPageAs: PageLocation;
    staticValue: number;
    staticMaximumValue: number;
}

interface Nanoflow {
    nanoflow: object[];
    paramsSpec: { Progress: string };
}

interface ContainerState {
    alertMessage?: string;
    maximumValue?: number;
    showAlert?: boolean;
    progressValue?: number;
    displayTextAttributeValue: string;
}

export type DisplayText = "none" | "value" | "percentage" | "static" | "attribute";
type OnClickOptions = "doNothing" | "showPage" | "callMicroflow" | "callNanoflow";
type PageLocation = "content" | "popup" | "modal";

export default class ProgressCircleContainer extends Component<ContainerProps, ContainerState> {
    private subscriptionHandles: number[];
    private defaultMaximumValue = 100;
    private attributeCallback: (mxObject: mendix.lib.MxObject) => () => void;

    constructor(props: ContainerProps) {
        super(props);

        const alertMessage = ProgressCircleContainer.validateProps(props);
        this.state = {
            alertMessage,
            maximumValue: this.getValue(props.maximumValueAttribute, props.mxObject),
            progressValue: this.getValue(props.progressAttribute, props.mxObject),
            showAlert: !!alertMessage,
            displayTextAttributeValue: ""
        };
        this.subscriptionHandles = [];
        this.handleOnClick = this.handleOnClick.bind(this);
        this.attributeCallback = mxObject => () => this.updateAttributeValues(mxObject);
        this.resetSubscription(props.mxObject);
    }

    render(): ReactNode {
        if (this.state.showAlert) {
            return createElement(Alert, {
                bootstrapStyle: "danger",
                className: "widget-progress-circle-alert",
                message: this.state.alertMessage
            });
        }

        return createElement(ProgressCircle, {
            alertMessage: this.state.alertMessage,
            animate: this.hasAnimation(),
            circleThickness: this.props.circleThickness,
            className: this.props.class,
            clickable: this.props.onClickEvent !== "doNothing",
            displayText: this.props.displayText,
            displayTextValue: this.getDisplayTextValue(),
            maximumValue: this.props.maximumValueAttribute ? this.state.maximumValue : this.props.staticMaximumValue,
            negativeValueColor: this.props.negativeValueColor,
            onClickAction: this.handleOnClick,
            positiveValueColor: this.props.positiveValueColor,
            style: ProgressCircleContainer.parseStyle(this.props.style),
            textSize: this.props.textSize,
            value: this.props.progressAttribute ? this.state.progressValue || 0 : this.props.staticValue
        });
    }

    componentWillReceiveProps(newProps: ContainerProps): void {
        this.resetSubscription(newProps.mxObject);
        this.updateAttributeValues(newProps.mxObject);
    }

    componentWillUnmount(): void {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];
    }

    private hasAnimation(): boolean {
        // IE 11 does not support animation when line svg line size large then 7
        // https://github.com/kimmobrunfeldt/progressbar.js/issues/79
        const isIe11 = !!(window as any).MSInputMethodContext && !!(document as any).documentMode;
        const isEdge = window.navigator.userAgent.indexOf("Edge/") > 0;
        if ((isIe11 || isEdge) && this.props.circleThickness >= 7 && this.props.animate) {
            logger.warn("Disabled animation on IE and Edge");
            return false;
        }
        return this.props.animate;
    }

    private getValue(attribute: string, mxObject?: mendix.lib.MxObject): number | undefined {
        return mxObject ? parseFloat(mxObject.get(attribute) as string) : undefined;
    }

    private getDisplayTextValue(): string {
        if (this.props.displayText === "attribute") {
            return this.state.displayTextAttributeValue;
        } else if (this.props.displayText === "static") {
            return this.props.displayTextStatic;
        }

        return "";
    }

    private updateAttributeValues(mxObject?: mendix.lib.MxObject): void {
        const maxValue = this.getValue(this.props.maximumValueAttribute, mxObject);
        this.setState({
            maximumValue: maxValue || maxValue === 0 ? maxValue : this.defaultMaximumValue,
            progressValue: this.getValue(this.props.progressAttribute, mxObject),
            displayTextAttributeValue: mxObject ? (mxObject.get(this.props.displayTextAttribute) as string) : ""
        });
    }

    private resetSubscription(mxObject?: mendix.lib.MxObject): void {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];
        if (mxObject) {
            this.subscriptionHandles.push(
                window.mx.data.subscribe({
                    callback: this.attributeCallback(mxObject),
                    guid: mxObject.getGuid()
                })
            );

            [this.props.displayTextAttribute, this.props.progressAttribute, this.props.maximumValueAttribute].forEach(
                attr => {
                    this.subscriptionHandles.push(
                        window.mx.data.subscribe({
                            attr,
                            callback: this.attributeCallback(mxObject),
                            guid: mxObject.getGuid()
                        })
                    );
                }
            );
        }
    }

    private handleOnClick(): void {
        const { mxObject, microflow, nanoflow, onClickEvent, openPageAs, page, mxform } = this.props;

        if (mxObject && mxObject.getGuid()) {
            const context = new window.mendix.lib.MxContext();
            context.setContext(mxObject.getEntity(), mxObject.getGuid());
            if (onClickEvent === "callMicroflow" && microflow) {
                window.mx.ui.action(microflow, {
                    context,
                    error: error =>
                        window.mx.ui.error(`Error while executing microflow ${microflow}: ${error.message}`),
                    origin: mxform
                });
            } else if (onClickEvent === "callNanoflow" && nanoflow.nanoflow) {
                window.mx.data.callNanoflow({
                    context,
                    error: error =>
                        window.mx.ui.error(`An error occurred while executing the nanoflow: ${error.message}`),
                    nanoflow,
                    origin: mxform
                });
            } else if (onClickEvent === "showPage" && page) {
                window.mx.ui.openForm(page, {
                    context,
                    error: error => window.mx.ui.error(`Error while opening page ${page}: ${error.message}`),
                    location: openPageAs
                });
            }
        }
    }

    static validateProps(props: ContainerProps): string {
        let errorMessage = "";
        if (props.onClickEvent === "callMicroflow" && !props.microflow) {
            errorMessage = "on click microflow is required";
        } else if (props.onClickEvent === "callNanoflow" && !props.nanoflow.nanoflow) {
            errorMessage = "on click nanoflow is required";
        } else if (props.onClickEvent === "showPage" && !props.page) {
            errorMessage = "on click page is required";
        }

        return errorMessage && `Error in progress circle configuration: ${errorMessage}`;
    }

    static parseStyle(style = ""): { [key: string]: string } {
        try {
            return style.split(";").reduce<{ [key: string]: string }>((styleObject, line) => {
                const pair = line.split(":");
                if (pair.length === 2) {
                    const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                    styleObject[name] = pair[1].trim();
                }
                return styleObject;
            }, {});
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log("Failed to parse style", style, error);
        }

        return {};
    }
}
