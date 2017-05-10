import { Component, createElement } from "react";
import { StarRating } from "./StarRating";

interface WrapperProps {
    class?: string;
    mxObject?: mendix.lib.MxObject;
    style?: string;
}

export interface ContainerProps extends WrapperProps {
    editable: "default" | "never";
    mxObject: mendix.lib.MxObject;
    viewAverage: boolean;
    readOnly: boolean;
    // Properties from Mendix modeler
    rateAttribute: string;
    onChangeMicroflow: string;
}

interface ContainerState {
    initialRate: number;
}

export default class StarRatingContainer extends Component<ContainerProps, ContainerState> {
    private subscriptionHandles: number[];
    private ownerReference = "";

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
        const { mxObject } = this.props;
        const readOnly = this.props.editable === "never"
            || (mxObject && mxObject.isReadonlyAttr(this.props.rateAttribute)) || this.props.readOnly;

        return createElement(StarRating, {
            className: this.props.class,
            fractions: readOnly ? 2 : 1,
            handleOnChange: !readOnly ? this.handleOnChange : undefined,
            initialRate: this.state.initialRate,
            readOnly,
            style: StarRatingContainer.parseStyle(this.props.style)
        });
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
            mxObject.set(rateAttribute, rate);
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
