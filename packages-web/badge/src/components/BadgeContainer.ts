import { Component, createElement } from "react";

import { Badge, BootstrapStyle } from "./Badge";
import { Alert } from "./Alert";

interface WrapperProps {
    "class"?: string;
    mxform: mxui.lib.form._FormBase;
    mxObject?: mendix.lib.MxObject;
    style?: string;
}

export interface BadgeContainerProps extends WrapperProps {
    valueAttribute: string;
    bootstrapStyle: BootstrapStyle;
    badgeType: "badge" | "label";
    badgeValue: string;
    microflow: string;
    nanoflow: Nanoflow;
    onClickEvent: OnClickOptions;
    page: string;
    openPageAs: PageLocation;
}

interface BadgeContainerState {
    alertMessage?: string;
    value: string;
}

interface Nanoflow {
    nanoflow: object[];
    paramsSpec: { Progress: string };
}

type OnClickOptions = "doNothing" | "showPage" | "callMicroflow" | "callNanoflow";
type PageLocation = "content"| "popup" | "modal";

export default class BadgeContainer extends Component<BadgeContainerProps, BadgeContainerState> {
    private subscriptionHandles: number[];

    constructor(props: BadgeContainerProps) {
        super(props);

        this.state = {
            alertMessage: BadgeContainer.validateProps(this.props),
            value: BadgeContainer.getValue(this.props.valueAttribute, this.props.mxObject)
        };
        this.subscriptionHandles = [];
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleSubscriptions = this.handleSubscriptions.bind(this);
    }

    render() {
        if (this.state.alertMessage) {
            return createElement(Alert, {
                bootstrapStyle: "danger",
                className: "widget-badge-alert",
                message: this.state.alertMessage
            });
        }

        return createElement(Badge, {
            badgeType: this.props.badgeType,
            bootstrapStyle: this.props.bootstrapStyle,
            className: this.props.class,
            clickable: this.props.onClickEvent !== "doNothing",
            defaultValue: this.props.badgeValue,
            onClickAction: this.handleOnClick,
            style: BadgeContainer.parseStyle(this.props.style),
            value: this.state.value
        });
    }

    componentWillReceiveProps(newProps: BadgeContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.setState({
            value: BadgeContainer.getValue(this.props.valueAttribute, newProps.mxObject)
        });
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    private static getValue(attributeName: string, mxObject?: mendix.lib.MxObject): string {
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
            value: BadgeContainer.getValue(this.props.valueAttribute, this.props.mxObject)
        });
    }

    public static validateProps(props: BadgeContainerProps): string {
        let errorMessage = "";
        if (props.onClickEvent === "callMicroflow" && !props.microflow) {
            errorMessage = "A 'Microflow' is required for 'Events' 'Call a microflow'";
        } else if (props.onClickEvent === "callNanoflow" && !props.nanoflow.nanoflow) {
            errorMessage = "A 'Nanoflow' is required for 'Events' 'Call a nanoflow'";
        } else if (props.onClickEvent === "showPage" && !props.page) {
            errorMessage = "A 'Page' is required for 'Events' 'Show a page'";
        }
        if (errorMessage) {
            errorMessage = `Error in configuration: ${errorMessage}`;
        }

        return errorMessage;
    }

    private handleOnClick() {
        const { mxObject, onClickEvent, microflow, mxform, nanoflow, openPageAs, page } = this.props;
        if (!mxObject || !mxObject.getGuid()) {
            return;
        }
        const context = new mendix.lib.MxContext();
        context.setContext(mxObject.getEntity(), mxObject.getGuid());
        if (onClickEvent === "callMicroflow" && microflow && mxObject.getGuid()) {
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
                error: error => window.mx.ui.error(`An error occurred while executing the nanoflow: ${error.message}`),
                nanoflow,
                origin: mxform
            });
        } else if (onClickEvent === "showPage" && page && mxObject.getGuid()) {
            window.mx.ui.openForm(page, {
                context,
                error: error => window.mx.ui.error(`Error while opening page ${page}: ${error.message}`),
                location: openPageAs
            });
        }
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
}
