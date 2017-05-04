import { Component, createElement } from "react";

import { Badge, BootstrapStyle } from "./Badge";
import { Alert } from "./Alert";

interface WrapperProps {
    class?: string;
    mxObject?: mendix.lib.MxObject;
    style?: string;
}

interface BadgeContainerProps extends WrapperProps {
    valueAttribute: string;
    bootstrapStyleAttribute: string;
    labelAttribute: string;
    label: string;
    bootstrapStyle: BootstrapStyle;
    badgeType: "badge" | "label";
    badgeValue: string;
    microflow: string;
    onClickEvent: OnClickOptions;
    page: string;
}

interface BadgeContainerState {
    alertMessage?: string;
    value: string;
    label: string;
    bootstrapStyle: BootstrapStyle | string;
}

type OnClickOptions = "doNothing" | "showPage" | "callMicroflow";

export default class BadgeContainer extends Component<BadgeContainerProps, BadgeContainerState> {
    private subscriptionHandles: number[];

    constructor(props: BadgeContainerProps) {
        super(props);

        const defaultState = this.updateValues(props.mxObject);
        defaultState.alertMessage = this.validateProps();
        this.state = defaultState;
        this.subscriptionHandles = [];
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleSubscriptions = this.handleSubscriptions.bind(this);
    }

    render() {
        if (this.state.alertMessage) {
            return createElement(Alert, { message: this.state.alertMessage });
        }

        return createElement(Badge, {
            badgeType: this.props.badgeType,
            bootstrapStyle: this.state.bootstrapStyle as BootstrapStyle,
            className: this.props.class,
            clickable: !!this.props.microflow || !!this.props.page,
            label: this.state.label,
            onClickAction: this.handleOnClick,
            style: BadgeContainer.parseStyle(this.props.style),
            value: this.state.value
        });
    }

    componentWillReceiveProps(newProps: BadgeContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.setState(this.updateValues(newProps.mxObject));
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    private updateValues(mxObject = this.props.mxObject): BadgeContainerState {
        return ({
            bootstrapStyle: this.getValue(this.props.bootstrapStyleAttribute, this.props.bootstrapStyle, mxObject),
            label: this.getValue(this.props.labelAttribute, this.props.label, mxObject),
            value: this.getValue(this.props.valueAttribute, this.props.badgeValue, mxObject)
        });
    }

    private getValue<T>(attributeName: string, defaultValue: T, mxObject?: mendix.lib.MxObject): string | T {
        if (mxObject && attributeName) {
            const value = mxObject.get(attributeName);
            return value ? value.toString() : defaultValue;
        }

        return defaultValue;
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);

        if (mxObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: this.handleSubscriptions,
                guid: mxObject.getGuid()
            }));

            [
                this.props.valueAttribute,
                this.props.bootstrapStyleAttribute,
                this.props.labelAttribute
            ].forEach((attr) =>
                this.subscriptionHandles.push(window.mx.data.subscribe({
                    attr,
                    callback: this.handleSubscriptions,
                    guid: mxObject.getGuid()
                }))
            );
        }
    }

    private handleSubscriptions() {
        this.setState(this.updateValues());
    }

    private validateProps(): string {
        let errorMessage = "";
        if (this.props.onClickEvent === "callMicroflow" && !this.props.microflow) {
            errorMessage = "A 'Microflow' is required for 'Events' 'Call a microflow'";
        } else if (this.props.onClickEvent === "showPage" && !this.props.page) {
            errorMessage = "A 'Page' is required for 'Events' 'Show a page'";
        }
        if (errorMessage) {
            errorMessage = `Error in configuration: ${errorMessage}`;
        }

        return errorMessage;
    }

    private handleOnClick() {
        const { mxObject, onClickEvent, microflow, page } = this.props;
        if (!mxObject || !mxObject.getGuid()) {
            return;
        }
        const context = new mendix.lib.MxContext();
        context.setContext(mxObject.getEntity(), mxObject.getGuid());
        if (onClickEvent === "callMicroflow" && microflow && mxObject.getGuid()) {
            window.mx.ui.action(microflow, {
                error: (error) => window.mx.ui.error(`Error while executing microflow: ${microflow}: ${error.message}`),
                params: {
                    applyto: "selection",
                    guids: [ mxObject.getGuid() ]
                }
            });
        } else if (onClickEvent === "showPage" && page && mxObject.getGuid()) {
            window.mx.ui.openForm(page, {
                context,
                error: (error) => window.mx.ui.error(`Error while opening page ${page}: ${error.message}`)
            });
        }
    }

    private static parseStyle(style = ""): {[key: string]: string} {
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
            console.log("Failed to parse style", style, error);
        }

        return {};
    }
}
