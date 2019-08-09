import { Component, createElement } from "react";
import { hot } from "react-hot-loader";

import { BadgeButton, BootstrapStyle } from "./BadgeButton";
import { Alert } from "./Alert";

interface WrapperProps {
    class?: string;
    mxform: mxui.lib.form._FormBase;
    mxObject?: mendix.lib.MxObject;
    style?: string;
}

export interface BadgeButtonContainerProps extends WrapperProps {
    valueAttribute: string;
    label: string;
    bootstrapStyle: BootstrapStyle;
    badgeButtonValue: string;
    microflow: string;
    nanoflow: Nanoflow;
    onClickEvent: OnClickOptions;
    page: string;
    openPageAs: PageLocation;
}

interface Nanoflow {
    nanoflow: object[];
    paramsSpec: { Progress: string };
}

interface BadgeButtonContainerState {
    alertMessage?: string;
    value: string;
}

type OnClickOptions = "doNothing" | "showPage" | "callMicroflow" | "callNanoflow";
type PageLocation = "content"| "popup" | "modal";

class BadgeButtonContainer extends Component<BadgeButtonContainerProps, BadgeButtonContainerState> {
    private subscriptionHandles: number[];

    constructor(props: BadgeButtonContainerProps) {
        super(props);

        this.state = {
            alertMessage: BadgeButtonContainer.validateProps(this.props),
            value: this.getValue(this.props.valueAttribute, this.props.mxObject)
        };
        this.subscriptionHandles = [];
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleSubscriptions = this.handleSubscriptions.bind(this);
    }

    render() {
        if (this.state.alertMessage) {
            return createElement(Alert, { bootstrapStyle: "danger", message: this.state.alertMessage });
        }

        return createElement(BadgeButton, {
            bootstrapStyle: this.props.bootstrapStyle,
            className: this.props.class,
            defaultValue: this.props.badgeButtonValue,
            label: this.props.label,
            onClickAction: this.handleOnClick,
            style: BadgeButtonContainer.parseStyle(this.props.style),
            value: this.state.value
        });
    }

    componentWillReceiveProps(newProps: BadgeButtonContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.setState({
            value: this.getValue(this.props.valueAttribute, newProps.mxObject)
        });
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    public static validateProps(props: BadgeButtonContainerProps): string {
        let errorMessage = "";
        if (props.onClickEvent === "callMicroflow" && !props.microflow) {
            errorMessage = "A 'Microflow' is required for 'Events' 'Call a microflow'";
        } else if (props.onClickEvent === "callNanoflow" && !props.nanoflow.nanoflow) {
            errorMessage = "A 'Nanoflow' is required for 'Events' 'Call a nanoflow'";
        } else if (props.onClickEvent === "showPage" && !props.page) {
            errorMessage = "A 'Page' is required for 'Events' 'Show a page'";
        }
        if (errorMessage) {
            errorMessage = `Error in badge button configuration: ${errorMessage}`;
        }

        return errorMessage;
    }

    public static parseStyle(style = ""): {[key: string]: string} {
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
            console.log("Failed to parse style", style, error);
        }

        return {};
    }

    private getValue(attributeName: string, mxObject?: mendix.lib.MxObject): string {
        if (mxObject && attributeName) {
            const value = mxObject.get(attributeName);
            if (mxObject.isEnum(attributeName)) {
                return mxObject.getEnumCaption(attributeName, value as string);
            }
            return value.toString();
        }

        return "";
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);

        if (mxObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: this.handleSubscriptions,
                guid: mxObject.getGuid()
            }));

            this.subscriptionHandles.push(window.mx.data.subscribe({
                attr: this.props.valueAttribute,
                callback: this.handleSubscriptions,
                guid: mxObject.getGuid()
            }));
        }
    }

    private handleSubscriptions() {
        this.setState({
            value: this.getValue(this.props.valueAttribute, this.props.mxObject)
        });
    }

    private handleOnClick() {
        const { mxObject, onClickEvent, microflow, mxform, nanoflow, openPageAs, page } = this.props;
        if (!mxObject || !mxObject.getGuid()) {
            return;
        }
        const context = new mendix.lib.MxContext();
        context.setContext(mxObject.getEntity(), mxObject.getGuid());
        if (onClickEvent === "callMicroflow" && microflow) {
            window.mx.ui.action(microflow, {
                error: error => window.mx.ui.error(`Error while executing microflow: ${microflow}: ${error.message}`),
                origin: mxform,
                params: {
                    applyto: "selection",
                    guids: [ mxObject.getGuid() ]
                }
            });
        } else if (onClickEvent === "callNanoflow" && nanoflow.nanoflow) {
            window.mx.data.callNanoflow({
                context,
                error: error => window.mx.ui.error(`Error while executing the nanoflow: ${error.message}`),
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

export default hot(module)(BadgeButtonContainer);
