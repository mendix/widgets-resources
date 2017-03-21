import { Component, createElement } from "react";
import { Alert } from "./Alert";
import { StarRating } from "./StarRating";

interface StarRatingContainerProps {
    // Properties from Mendix modeler
    rateAttribute: string;
    campaignEntity: string;
    rateEntity: string;
    rateType: "average" | "rating";
    onChangeMicroflow: string;
    averageAttribute: string;
    mxObject: mendix.lib.MxObject;
    readOnly: boolean;
}

class StarRatingContainer extends Component<StarRatingContainerProps, { alertMessage?: string, initialRate: number }> {
    private subscriptionHandles: number[];
    private ownerReference = "";

    constructor(props: StarRatingContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.ownerReference = "System.owner";
        this.state = { alertMessage: this.validateProps(), initialRate: 0 };
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    render() {
        if (this.state.alertMessage) {
            return createElement(Alert as any, { message: this.state.alertMessage });
        } else {
            return createElement(StarRating, {
                handleOnChange: this.handleOnChange,
                initialRate: this.state.initialRate,
                onChangeMicroflow: this.props.onChangeMicroflow,
                ownerGuid: this.props.mxObject
                    ? this.props.mxObject.get(this.ownerReference) as string
                    : undefined,
                rateType: this.props.rateType,
                readOnly: this.props.readOnly
            });
        }
    }

    componentWillReceiveProps(nextProps: StarRatingContainerProps) {
        this.subscribe(nextProps.mxObject);
        this.fetchData(nextProps.mxObject);
    }

    componentWillUnmount() {
        this.unSubscribe();
    }

    private handleOnChange(rate: number) {
        if (this.props.mxObject) {
            this.props.mxObject.set(this.props.rateAttribute, rate);
            if (this.props.onChangeMicroflow) {
                this.executeMicroflow(this.props.mxObject.getGuid(), this.props.onChangeMicroflow);
            }
        }
    }

    private executeMicroflow(mendixGuid: string, microflow: string) {
        window.mx.ui.action(microflow, {
            error: error =>
                this.setState({
                    alertMessage: `An error occurred while executing microflow: ${error} `
                }),
            params: {
                applyto: "selection",
                guids: [ mendixGuid ]
            }
        });
    }

    private validateProps(): string {
        const errorMessage: string[] = [];
        if (this.props.mxObject) {
            // tslint:disable-next-line:max-line-length
            if ((this.props.rateType === "average") && this.props.mxObject.getEntity() !== this.props.campaignEntity.split("/")[1]) {
                errorMessage.push(" - For rate type 'average', the contextObject should be campaign entity");
            }
            if ((this.props.rateType === "rating") && this.props.mxObject.getEntity() !== this.props.rateEntity) {
                // tslint:disable-next-line:max-line-length
                errorMessage.push(` - For rate type 'Rating', the contextObject be rate entity '${this.props.rateEntity}'`);
            }
            if (this.props.rateType === "rating" && !this.props.mxObject.isReference(this.ownerReference)) {
                errorMessage.push(` - Context object has no User / Owner association to it`);
            }
            if (errorMessage.length) {
                errorMessage.unshift("Configuration Error: ");
            }
        }
        return errorMessage.join("\n");
    }

    private subscribe(contextObject: mendix.lib.MxObject) {
        this.unSubscribe();

        if (contextObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: () => this.fetchData(contextObject),
                guid: contextObject.getGuid()
            }));
            [
                this.props.averageAttribute,
                this.props.rateAttribute
            ].forEach((attr) => this.subscriptionHandles.push(window.mx.data.subscribe({
                attr,
                callback: () => this.fetchData(contextObject), guid: contextObject.getGuid()
            })));
        }
    }

    private unSubscribe() {
        this.subscriptionHandles.forEach(handle => window.mx.data.unsubscribe(handle));
    }

    private fetchData(contextObject: mendix.lib.MxObject) {
        this.setState({
            initialRate: contextObject
                ? this.props.rateType === "average"
                    ? contextObject.get(this.props.averageAttribute) as number
                    : contextObject.get(this.props.rateAttribute) as number
                : 0
        });
    }
}

export { StarRatingContainer as default, StarRatingContainerProps };
