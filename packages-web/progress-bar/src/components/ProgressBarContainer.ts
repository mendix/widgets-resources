import { Component, createElement, ReactNode } from "react";
import { hot } from "react-hot-loader/root";
import { BarStyle, BarType, ProgressBar } from "./ProgressBar";
import { Alert } from "./Alert";

interface WrapperProps {
    class?: string;
    mxform: mxui.lib.form._FormBase;
    mxObject?: mendix.lib.MxObject;
    style?: string;
}

export interface ProgressBarContainerProps extends WrapperProps {
    barType: BarType;
    bootstrapStyle: BarStyle;
    bootstrapStyleAttribute: string;
    displayText: DisplayText;
    displayTextAttribute: string;
    displayTextStatic: string;
    maximumValueAttribute: string;
    onClickMicroflow?: string;
    onClickNanoflow: Nanoflow;
    onClickOption: OnClickOptions;
    onClickPage?: string;
    progressAttribute: string;
    textColorSwitch: number;
    openPageAs: PageLocation;
    staticValue: number;
    staticMaximumValue: number;
}

interface ProgressBarContainerState {
    themeStyle?: BarStyle;
    alertMessage?: string;
    maximumValue: number;
    showAlert?: boolean;
    progressValue?: number;
    displayTextAttributeValue?: string;
}

interface Nanoflow {
    nanoflow: object[];
    paramsSpec: { Progress: string };
}

export type DisplayText = "none" | "value" | "percentage" | "static" | "attribute";
type OnClickOptions = "doNothing" | "showPage" | "callMicroflow" | "callNanoflow";
type PageLocation = "content" | "popup" | "modal";

class ProgressBarContainer extends Component<ProgressBarContainerProps, ProgressBarContainerState> {
    private subscriptionHandles: number[];
    private subscriptionCallback: (mxObject: mendix.lib.MxObject) => () => void;
    private defaultMaximumValue = 100;

    constructor(props: ProgressBarContainerProps) {
        super(props);

        const defaultState: ProgressBarContainerState = this.updateValues(props.mxObject);
        defaultState.alertMessage = ProgressBarContainer.validateProps(props);
        defaultState.showAlert = !!defaultState.alertMessage;
        defaultState.displayTextAttributeValue = "";
        this.state = defaultState;
        this.subscriptionHandles = [];
        this.handleClick = this.handleClick.bind(this);
        this.subscriptionCallback = mxObject => () => this.setState(this.updateValues(mxObject));
    }

    render(): ReactNode {
        if (this.state.showAlert) {
            return createElement(Alert as any, {
                bootstrapStyle: "danger",
                className: "widget-progressbar",
                message: this.state.alertMessage
            });
        }

        return createElement(ProgressBar, {
            alertMessage: this.state.alertMessage,
            barType: this.props.barType,
            bootstrapStyle: this.state.themeStyle,
            className: this.props.class,
            colorSwitch: this.props.textColorSwitch,
            displayText: this.props.displayText,
            displayTextValue: this.getDisplayTextValue(),
            maximumValue: this.props.maximumValueAttribute ? this.state.maximumValue : this.props.staticMaximumValue,
            onClickAction:
                this.props.onClickOption !== "doNothing" && this.props.mxObject ? this.handleClick : undefined,
            progress: this.props.progressAttribute ? this.state.progressValue || 0 : this.props.staticValue,
            style: ProgressBarContainer.parseStyle(this.props.style)
        });
    }

    componentWillReceiveProps(newProps: ProgressBarContainerProps): void {
        this.resetSubscription(newProps.mxObject);
        this.setState(this.updateValues(newProps.mxObject));
    }

    componentWillUnmount(): void {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    private getValue<T>(attribute: string, defaultValue: T, mxObject?: mendix.lib.MxObject): T | number {
        if (mxObject && attribute) {
            const value = parseFloat(mxObject.get(attribute) as string);
            if (value || value === 0) {
                return value;
            }
        }

        return defaultValue;
    }

    private getBarStyle(mxObject?: mendix.lib.MxObject): BarStyle {
        if (mxObject && this.props.bootstrapStyleAttribute) {
            return mxObject.get(this.props.bootstrapStyleAttribute) as BarStyle;
        }

        return this.props.bootstrapStyle;
    }

    private updateValues(mxObject?: mendix.lib.MxObject): ProgressBarContainerState {
        return {
            displayTextAttributeValue: mxObject ? (mxObject.get(this.props.displayTextAttribute) as string) : "",
            maximumValue: this.getValue(this.props.maximumValueAttribute, this.defaultMaximumValue, mxObject),
            progressValue: this.getValue(this.props.progressAttribute, undefined, mxObject),
            themeStyle: this.getBarStyle(mxObject)
        };
    }

    private getDisplayTextValue(): string | undefined {
        if (this.props.displayText === "attribute") {
            return this.state.displayTextAttributeValue;
        } else if (this.props.displayText === "static") {
            return this.props.displayTextStatic;
        }

        return "";
    }

    private resetSubscription(mxObject?: mendix.lib.MxObject): void {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];

        if (mxObject) {
            this.subscriptionHandles.push(
                window.mx.data.subscribe({
                    callback: this.subscriptionCallback(mxObject),
                    guid: mxObject.getGuid()
                })
            );
            [
                this.props.progressAttribute,
                this.props.displayTextAttribute,
                this.props.maximumValueAttribute,
                this.props.bootstrapStyleAttribute
            ].forEach(attr => {
                this.subscriptionHandles.push(
                    window.mx.data.subscribe({
                        attr,
                        callback: this.subscriptionCallback(mxObject),
                        guid: mxObject.getGuid()
                    })
                );
            });
        }
    }

    private handleClick(): void {
        const {
            mxform,
            mxObject,
            onClickMicroflow,
            onClickNanoflow,
            onClickOption,
            onClickPage,
            openPageAs
        } = this.props;
        if (!mxObject || !mxObject.getGuid()) {
            return;
        }
        const context = new window.mendix.lib.MxContext();

        context.setContext(mxObject.getEntity(), mxObject.getGuid());
        if (onClickOption === "callMicroflow" && onClickMicroflow) {
            window.mx.ui.action(onClickMicroflow, {
                context,
                error: error =>
                    window.mx.ui.error(`Error while executing microflow ${onClickMicroflow}: ${error.message}`),
                origin: mxform
            });
        } else if (onClickOption === "callNanoflow" && onClickNanoflow.nanoflow) {
            window.mx.data.callNanoflow({
                context,
                error: error =>
                    mx.ui.error(`An error occurred while executing the on click nanoflow: ${error.message}`),
                nanoflow: onClickNanoflow,
                origin: mxform
            });
        } else if (onClickOption === "showPage" && onClickPage) {
            window.mx.ui.openForm(onClickPage, {
                context,
                error: error => window.mx.ui.error(`Error while opening page ${onClickPage}: ${error.message}`),
                location: openPageAs
            });
        }
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
    static validateProps(props: ProgressBarContainerProps): string {
        let errorMessage = "";
        if (props.onClickOption === "callMicroflow" && !props.onClickMicroflow) {
            errorMessage = "on click microflow is required in the 'Events' tab, 'Microflow' property";
        } else if (props.onClickOption === "callNanoflow" && !props.onClickNanoflow.nanoflow) {
            errorMessage = "on click nanoflow is required in the 'Events' tab, 'Nanoflow' property";
        } else if (props.onClickOption === "showPage" && !props.onClickPage) {
            errorMessage = "on click page is required in the 'Events' tab, 'Page' property";
        }

        return errorMessage && `Error in progress bar configuration: ${errorMessage}`;
    }
}

export default hot(ProgressBarContainer);
