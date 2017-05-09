import { Component, createElement } from "react";
import { Alert } from "./Alert";
import { StarRating } from "./StarRating";

interface WrapperProps {
    class?: string;
    mxObject?: mendix.lib.MxObject;
    style?: string;
}

export interface ContainerProps extends WrapperProps {
    mxObject: mendix.lib.MxObject;
    viewAverage: boolean;
    readOnly: boolean;
    // Properties from Mendix modeler
    rateAttribute: string;
    onCommitMicroflow: string;
}

interface ContainerState {
    alertMessage?: string;
    initialRate: number;
}

export default class StarRatingInputContainer extends Component<ContainerProps, ContainerState> {
    private subscriptionHandles: number[];
    private ownerReference = "";

    constructor(props: ContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.ownerReference = "System.owner";
        this.state = {
            alertMessage: this.validateProps(props),
            initialRate: 0
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.resetSubscription(this.props.mxObject);
    }

    render() {
        if (!this.state.alertMessage) {
            const ownerGuid = this.props.mxObject ? this.props.mxObject.get(this.ownerReference) as string : "";
            return createElement(StarRating, {
                className: this.props.class,
                fractions: this.props.viewAverage ? 2 : 1,
                handleOnChange: !this.props.viewAverage ? this.handleOnChange : undefined,
                initialRate: this.state.initialRate,
                readOnly: this.props.readOnly || this.props.viewAverage
                    || !(ownerGuid === window.mx.session.getUserId()),
                style: StarRatingInputContainer.parseStyle(this.props.style)
            });
        } else {
            return createElement(Alert, { message: this.state.alertMessage });
        }
    }

    componentWillReceiveProps(nextProps: ContainerProps) {
        this.resetSubscription(nextProps.mxObject);
        if (nextProps.mxObject) {
            const errorMessage = this.validateProps(nextProps);
            if (!errorMessage) {
                this.updateRating(nextProps.mxObject);
            } else {
                this.setState({ alertMessage: errorMessage });
            }
        }
    }

    componentWillUnmount() {
        this.unSubscribe();
    }

    private handleOnChange(rate: number) {
        const { mxObject, onCommitMicroflow, rateAttribute } = this.props;
        if (mxObject) {
            mxObject.set(rateAttribute, rate);
            if (onCommitMicroflow) {
                window.mx.ui.action(onCommitMicroflow, {
                    error: error =>
                        window.mx.ui.error(`Error while executing microflow: ${onCommitMicroflow}: ${error.message}`),
                    params: {
                        applyto: "selection",
                        guids: [ mxObject.getGuid() ]
                    }
                });
            }
        }
    }

    private validateProps(props: ContainerProps): string {
        if (props.mxObject && !props.mxObject.isReference(this.ownerReference)) {
            return !props.viewAverage ? `Configuration Error: Context object has no 'Owner' system member to it` : "";
        }
        return "";
    }

    private resetSubscription(contextObject: mendix.lib.MxObject) {
        this.unSubscribe();

        if (contextObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: () => this.updateRating(contextObject),
                guid: contextObject.getGuid()
            }));
        }
    }

    private unSubscribe() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];
    }

    private updateRating(contextObject: mendix.lib.MxObject) {
        this.setState({
            initialRate: contextObject
                ? contextObject.get(this.props.rateAttribute) as number
                : 0
        });
    }

    private static parseStyle(style = ""): { [key: string]: string } {
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
