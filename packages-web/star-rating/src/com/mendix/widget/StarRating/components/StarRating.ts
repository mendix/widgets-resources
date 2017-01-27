import { Component, createElement } from "react";

import * as Rating from "react-rating";
import { Alert } from "./Alert";

export interface StarRatingProps {
    campaignEntity?: string;
    contextObject?: mendix.lib.MxObject;
    fractions?: number;
    initialRate?: number;
    onChangeMicroflow?: string;
    placeholder?: string;
    readOnly?: boolean;
    start?: number;
    step?: number;
    stop?: number;
    rateType?: "single" | "overall";
    rateEntity?: string;
    rateAttribute?: string;
    averageAttribute?: string;
}

export class StarRating extends Component<StarRatingProps, {}> {
    static defaultProps: StarRatingProps = {
        fractions: 2,
        start: 0,
        step: 1,
        stop: 5
    };
    private fractions: number;
    private contextObject: mendix.lib.MxObject;
    private rateType: string;
    private campaignEntity: string;
    private ownerReference: string = "System.owner";
    private errorMessage: string;

    componentDidMount() {
       // this.campaignEntity = this.props.campaignEntity.split("/")[1];
    }
    render() {
        this.fractions = this.props.fractions;
        this.contextObject = this.props.contextObject;
        this.rateType = this.props.rateType;
        this.campaignEntity = this.props.campaignEntity.split("/")[1];
        if (this.hasValidConfig(this.props)) {
            this.fractions = this.rateType === "overall" ? this.fractions : 1;
            const readonly = this.props.readOnly || !(this.contextObject && this.rateType === "single"
                && this.contextObject.get(this.ownerReference) === window.mx.session.getUserId());
            return createElement(Rating, {
                empty: "glyphicon glyphicon-star-empty widget-star-rating widget-star-rating-empty",
                fractions: this.fractions,
                full: "glyphicon glyphicon-star widget-star-rating widget-star-rating-full",
                initialRate: this.getRate(),
                onChange:  (rate: number) => this.submitData(rate),
                placeholder: "glyphicon glyphicon-star widget-star-rating widget-star-rating-placeholder",
                readonly,
                start: this.props.start,
                step: this.props.step,
                stop: this.props.stop
            });
        } else {
            // should return alert component
            return createElement(Alert, { message: this.errorMessage });
        }
    }

    private getRate() {
        const initialRate = this.contextObject
            ? this.props.rateType === "overall"
                ? this.contextObject.get(this.props.averageAttribute) as number
                : this.contextObject.get(this.props.rateAttribute) as number
            : 0 ;

        const maximumValue = this.props.step * this.props.stop;
        if (initialRate > maximumValue) {
            return maximumValue;
        } else if (initialRate < this.props.start) {
            return this.props.start;
        } else {
            // This helps to round off to the nearest fraction.
            // eg fraction 2 or 0.5, rounds off a rate 1.4 to 1.5 
            return Math.round(initialRate * this.fractions) / this.fractions;
        }
    }

    private submitData(rate: number) {
        this.contextObject.set(this.props.rateAttribute, rate);
        if (this.props.onChangeMicroflow) {
            this.executeMicroflow(this.contextObject.getGuid(), this.props.onChangeMicroflow);
        }
    }

    private executeMicroflow(mendixGUID: string, microflow: string) {
        window.mx.ui.action(microflow, {
            error: (error: Error) =>
                window.mx.ui.error(`Error while executing microflow: ${microflow}: ${error.message}`),
            params: {
                applyto: "selection",
                guids: [ mendixGUID ]
            }
        });
    }

    private hasValidConfig(props: StarRatingProps ) {
        const errorMessage: string[] = [];

        if (!this.contextObject) {
            return true; // incase there's no contextObject
        }
        if ((this.rateType === "overall") && this.contextObject.getEntity() !== this.campaignEntity) {
            errorMessage.push(" - For rate type 'Overall', the contextObject should be campaign entity");
        }
        if ((this.rateType === "single") && this.contextObject.getEntity() !== this.props.rateEntity) {
            errorMessage.push(` - For rate type 'Single', the contextObject be rate entity '${this.props.rateEntity}'`);
        }
        if (this.rateType === "single" && !this.contextObject.isReference(this.ownerReference)) {
            errorMessage.push(` - Context object has no User / Owner association to it`);
        }

        if (errorMessage.length) {
            errorMessage.unshift("Configuration Error: ");
            this.errorMessage = errorMessage.join("\n");
        }
        return !errorMessage.length;
    }
}
