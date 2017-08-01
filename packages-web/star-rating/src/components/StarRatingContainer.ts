import { Component, createElement } from "react";
import { Alert } from "./Alert";
import { StarRating } from "./StarRating";

interface WrapperProps {
    class: string;
    mxObject: mendix.lib.MxObject;
    readOnly: boolean;
    style: string;
}

export interface ContainerProps extends WrapperProps {
    // Properties from Mendix modeler
    editable: "default" | "never";
    maximumStars: number;
    onChangeMicroflow: string;
    rateAttribute: string;
    widgetColor: widgetColors;
}
// tslint:disable max-length-line
export type widgetColors = "widget" | "default" | "primary" | "success" | "info" | "warning" | "danger" | "inverse" ;

interface ContainerState {
    initialRate: number;
}

export default class StarRatingContainer extends Component<ContainerProps, ContainerState> {
    private subscriptionHandles: number[];

    constructor(props: ContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.state = {
            initialRate: this.props.mxObject
                ? this.props.mxObject.get(this.props.rateAttribute) as number
                : 0
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.subscribe(this.props.mxObject);
    }

    render() {
        const alertMessage = StarRatingContainer.validateProps(this.props);
        if (!alertMessage) {
            const { mxObject } = this.props;
            const readOnly = this.props.editable === "never"
                || (mxObject && mxObject.isReadonlyAttr(this.props.rateAttribute)) || this.props.readOnly || !mxObject;

            return createElement(StarRating, {
                className: this.props.class,
                handleOnChange: this.handleOnChange,
                initialRate: this.state.initialRate,
                readOnly,
                maximumStars: this.props.maximumStars,
                style: StarRatingContainer.parseStyle(this.props.style),
                widgetColor: this.props.widgetColor
            });
        } else {
            return createElement(Alert, {
                bootstrapStyle: "danger",
                message: alertMessage,
                className: "widget-star-rating-alert"
            });
        }
    }

    componentWillReceiveProps(nextProps: ContainerProps) {
        this.subscribe(nextProps.mxObject);
        this.updateRating(nextProps.mxObject);
    }

    componentWillUnmount() {
        this.unSubscribe();
    }

    private handleOnChange(rate: number) {
        const { mxObject, onChangeMicroflow, rateAttribute } = this.props;
        if (mxObject) {
            mxObject.set(rateAttribute, Number(rate));
            if (onChangeMicroflow) {
                window.mx.ui.action(onChangeMicroflow, {
                    error: error =>
                        window.mx.ui.error(`Error while executing microflow: ${onChangeMicroflow}: ${error.message}`),
                    params: {
                        applyto: "selection",
                        guids: [ mxObject.getGuid() ]
                    }
                });
            }
        }
    }

    private subscribe(contextObject?: mendix.lib.MxObject) {
        this.unSubscribe();

        if (contextObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: () => this.updateRating(contextObject),
                guid: contextObject.getGuid()
            }));

            this.subscriptionHandles.push(window.mx.data.subscribe({
                attr: this.props.rateAttribute,
                callback: () => this.updateRating(contextObject),
                guid: contextObject.getGuid()
            }));
        }
    }

    private unSubscribe() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];
    }

    private updateRating(mxObject: mendix.lib.MxObject) {
        this.setState({
            initialRate: mxObject
                ? mxObject.get(this.props.rateAttribute) as number
                : 0
        });
    }

    public static validateProps(props: ContainerProps) {
        const errorMessage: string[] = [];
        if (props.maximumStars < 1) {
            errorMessage.push("- Number of stars should be greater than Zero (0)");
        }
        if (errorMessage.length) {
            errorMessage.unshift("Configuration Error: ");
        }
        return errorMessage.join("\n");
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
            console.error("Failed to parse style", style, error);
        }

        return {};
    }
}
