import { Component, createElement } from "react";

import { BadgeButton, BootstrapStyle } from "./BadgeButton";
import { Alert } from "./Alert";

interface WrapperProps {
    class?: string;
    mxObject?: mendix.lib.MxObject;
    style?: string;
}

export interface BadgeButtonContainerProps extends WrapperProps {
    valueAttribute: string;
    label: string;
    bootstrapStyle: BootstrapStyle;
    badgeButtonValue: string;
    microflow: string;
    onClickEvent: OnClickOptions;
    page: string;
}

interface BadgeButtonContainerState {
    alertMessage?: string;
    value: string;
}

type OnClickOptions = "doNothing" | "showPage" | "callMicroflow";

export default class BadgeButtonContainer extends Component<BadgeButtonContainerProps, BadgeButtonContainerState> {
    private subscriptionHandles: number[];
    private badgeButton: HTMLButtonElement;

    constructor(props: BadgeButtonContainerProps) {
        super(props);

        const defaultState = this.updateValues(props.mxObject);
        defaultState.alertMessage = this.validateProps();
        this.state = defaultState;
        this.subscriptionHandles = [];
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleSubscriptions = this.handleSubscriptions.bind(this);
        this.setBadgeButtonReference = this.setBadgeButtonReference.bind(this);
    }

    render() {
        if (this.state.alertMessage) {
            return createElement(Alert, { message: this.state.alertMessage });
        }

        return createElement(BadgeButton, {
            bootstrapStyle: this.props.bootstrapStyle,
            className: this.props.class,
            getRef: this.setBadgeButtonReference,
            label: this.props.label,
            onClickAction: this.handleOnClick,
            style: BadgeButtonContainer.parseStyle(this.props.style),
            value: this.state.value
        });
    }

    componentDidMount() {
        if (this.badgeButton && this.badgeButton.parentElement) {
            this.badgeButton.parentElement.classList.add("widget-badge-button-wrapper");
        }
    }

    componentWillReceiveProps(newProps: BadgeButtonContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.setState(this.updateValues(newProps.mxObject));
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    private setBadgeButtonReference(ref: HTMLButtonElement) {
        this.badgeButton = ref;
    }

    private updateValues(mxObject = this.props.mxObject): BadgeButtonContainerState {
        return({
            value: this.getValue(this.props.valueAttribute, this.props.badgeButtonValue, mxObject)
        });
    }

    private getValue<T>(attributeName: string, defaultValue: T, mxObject?: mendix.lib.MxObject ): string | T {
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

            this.subscriptionHandles.push(window.mx.data.subscribe({
                attr: this.props.valueAttribute,
                callback: this.handleSubscriptions,
                guid: mxObject.getGuid()
            }));
        }
    }

    private handleSubscriptions() {
        this.setState({
            value: this.getValue(this.props.valueAttribute, this.props.badgeButtonValue, this.props.mxObject)
        });
    }

    private validateProps(): string {
        let errorMessage = "";
        if (this.props.onClickEvent === "callMicroflow" && !this.props.microflow) {
            errorMessage = "A 'Microflow' is required for 'Events' 'Call a microflow'";
        } else if (this.props.onClickEvent === "showPage" && !this.props.page) {
            errorMessage = "A 'Page' is required for 'Events' 'Show a page'";
        }
        if (errorMessage) {
            errorMessage = `Error in badge button configuration: ${errorMessage}`;
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
            console.log("Failed to parse style", style, error);
        }

        return {};
    }
}
