import { Component, ReactNode, createElement } from "react";
import { Alert } from "./Alert";
import { StarRating } from "./StarRating";
import classNames from "classnames";

interface WrapperProps {
    class: string;
    mxform: mxui.lib.form._FormBase;
    mxObject: mendix.lib.MxObject;
    readOnly: boolean;
    style: string;
}

export interface ContainerProps extends WrapperProps {
    // Properties from Mendix modeler
    editable: "default" | "never";
    maximumStars: number;
    onChangeMicroflow: string;
    onChangeNanoflow: Nanoflow;
    rateAttribute: string;
    starSize: StarSize;
    starSizeCustom: number;
    widgetColor: WidgetColors;
}

interface Nanoflow {
    nanoflow: object[];
    paramsSpec: { Progress: string };
}
// tslint:disable max-length-line
export type WidgetColors = "widget" | "default" | "primary" | "success" | "info" | "warning" | "danger" | "inverse";
export type StarSize = "small" | "medium" | "large" | "custom";

interface ContainerState {
    initialRate: number;
}

export default class StarRatingContainer extends Component<ContainerProps, ContainerState> {
    private subscriptionHandles: number[];

    constructor(props: ContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.state = {
            initialRate: this.props.mxObject ? Number(this.props.mxObject.get(this.props.rateAttribute)) : 0
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.subscribe(this.props.mxObject);
    }

    render(): ReactNode {
        const alertMessage = StarRatingContainer.validateProps(this.props);
        if (!alertMessage) {
            const { mxObject } = this.props;
            const readOnly =
                this.props.editable === "never" ||
                (mxObject && mxObject.isReadonlyAttr(this.props.rateAttribute)) ||
                this.props.readOnly ||
                !mxObject;

            return createElement(
                "div",
                {
                    className: classNames("widget-star-rating", this.props.class),
                    style: StarRatingContainer.parseStyle(this.props.style)
                },
                createElement(StarRating, {
                    handleOnChange: this.handleOnChange,
                    initialRate: this.state.initialRate,
                    readOnly,
                    maximumStars: this.props.maximumStars,
                    starSize: this.props.starSize,
                    starSizeCustom: this.props.starSizeCustom,
                    widgetColor: this.props.widgetColor
                })
            );
        } else {
            return createElement(Alert, {
                bootstrapStyle: "danger",
                message: alertMessage,
                className: "widget-star-rating-alert"
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: ContainerProps): void {
        this.subscribe(nextProps.mxObject);
        this.updateRating(nextProps.mxObject);
    }

    componentWillUnmount(): void {
        this.unSubscribe();
    }

    private handleOnChange(rate: number): void {
        const { mxform, mxObject, onChangeMicroflow, onChangeNanoflow, rateAttribute } = this.props;
        if (mxObject) {
            mxObject.set(rateAttribute, Number(rate));
            if (onChangeMicroflow) {
                window.mx.ui.action(onChangeMicroflow, {
                    error: error =>
                        window.mx.ui.error(`Error while executing microflow: ${onChangeMicroflow}: ${error.message}`),
                    origin: mxform,
                    params: {
                        applyto: "selection",
                        guids: [mxObject.getGuid()]
                    }
                });
            }

            if (onChangeNanoflow.nanoflow) {
                const context = new mendix.lib.MxContext();
                context.setContext(mxObject.getEntity(), mxObject.getGuid());
                window.mx.data.callNanoflow({
                    context,
                    error: error =>
                        window.mx.ui.error(
                            `An error occurred while executing the on change nanoflow: ${error.message}`
                        ),
                    nanoflow: onChangeNanoflow,
                    origin: mxform
                });
            }
        }
    }

    private subscribe(contextObject?: mendix.lib.MxObject): void {
        this.unSubscribe();

        if (contextObject) {
            this.subscriptionHandles.push(
                window.mx.data.subscribe({
                    callback: () => this.updateRating(contextObject),
                    guid: contextObject.getGuid()
                })
            );

            this.subscriptionHandles.push(
                window.mx.data.subscribe({
                    attr: this.props.rateAttribute,
                    callback: () => this.updateRating(contextObject),
                    guid: contextObject.getGuid()
                })
            );
        }
    }

    private unSubscribe(): void {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];
    }

    private updateRating(mxObject: mendix.lib.MxObject): void {
        // bablablssc
        this.setState({
            initialRate: mxObject ? Number(mxObject.get(this.props.rateAttribute)) : 0
        });
    }

    static validateProps(props: ContainerProps): string {
        const errorMessage: string[] = [];
        if (props.maximumStars < 1) {
            errorMessage.push("- Number of stars should be greater than Zero (0)");
        }
        if (errorMessage.length) {
            errorMessage.unshift("Configuration Error: ");
        }
        return errorMessage.join("\n");
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
            console.error("Failed to parse style", style, error);
        }

        return {};
    }
}
