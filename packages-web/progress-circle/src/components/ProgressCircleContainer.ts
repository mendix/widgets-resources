import { Component, createElement } from "react";
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
    maximumValueAttribute: string;
    microflow?: string;
    negativeValueColor: BootstrapStyle;
    onClickEvent: OnClickOptions;
    page?: string;
    progressAttribute: string;
    positiveValueColor: BootstrapStyle;
    textSize: ProgressTextSize;
    circleThickness: number;
}

interface ContainerState {
    alertMessage?: string;
    maximumValue?: number;
    showAlert?: boolean;
    progressValue?: number;
}

type OnClickOptions = "doNothing" | "showPage" | "callMicroflow";

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
            showAlert: !!alertMessage
        };
        this.subscriptionHandles = [];
        this.handleOnClick = this.handleOnClick.bind(this);
        this.attributeCallback = mxObject => () => this.updateValues(mxObject);
    }

    render() {
        if (this.state.showAlert) {
            return createElement(Alert, {
                bootstrapStyle: "danger",
                className: "widget-progress-circle-alert",
                message: this.state.alertMessage
            });
        }

        return createElement(ProgressCircle, {
            alertMessage: this.state.alertMessage,
            animate: this.props.animate,
            circleThickness: this.props.circleThickness,
            className: this.props.class,
            clickable: !!this.props.microflow || !!this.props.page,
            maximumValue: this.state.maximumValue,
            negativeValueColor: this.props.negativeValueColor,
            onClickAction: this.handleOnClick,
            positiveValueColor: this.props.positiveValueColor,
            style: ProgressCircleContainer.parseStyle(this.props.style),
            textSize: this.props.textSize,
            value: this.state.progressValue
        });
    }

    componentWillReceiveProps(newProps: ContainerProps) {
        this.resetSubscription(newProps.mxObject);
        this.updateValues(newProps.mxObject);
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach((handle) => window.mx.data.unsubscribe(handle));
    }

    public static validateProps(props: ContainerProps): string {
        let errorMessage = "";
        if (props.onClickEvent === "callMicroflow" && !props.microflow) {
            errorMessage = "on click microflow is required";
        } else if (props.onClickEvent === "showPage" && !props.page) {
            errorMessage = "on click page is required";
        }

        return errorMessage && `Error in progress circle configuration: ${errorMessage}`;
    }

    public static parseStyle(style = ""): { [key: string]: string } {
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
            // tslint:disable-next-line no-console
            console.log("Failed to parse style", style, error);
        }

        return {};
    }

    private getValue(attribute: string, mxObject?: mendix.lib.MxObject): number | undefined {
        return mxObject ? parseFloat(mxObject.get(attribute) as string) : undefined;
    }

    private updateValues(mxObject?: mendix.lib.MxObject) {
        const maxValue = this.getValue(this.props.maximumValueAttribute, mxObject);
        this.setState({
            maximumValue: (maxValue || maxValue === 0) ? maxValue : this.defaultMaximumValue,
            progressValue: this.getValue(this.props.progressAttribute, mxObject)
        });
    }

    private resetSubscription(mxObject?: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);

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
        const { mxObject, microflow, onClickEvent, page, mxform } = this.props;
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
            } else if (onClickEvent === "showPage" && page) {
                window.mx.ui.openForm(page, {
                    context,
                    error: error => window.mx.ui.error(`Error while opening page ${page}: ${error.message}`)
                });
            }
        }
    }
}
