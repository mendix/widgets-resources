import { Component, createElement, DOM } from "react";

import * as Rating from "react-rating";
import { Alert } from "./Alert";

export interface StarRatingProps {
    campaignEntity: string;
    contextObject?: mendix.lib.MxObject;
    initialRate?: number;
    onChangeMicroflow?: string;
    readOnly: boolean;
    rateType: "single" | "average";
    rateEntity: string;
    rateAttribute: string;
    averageAttribute: string;
}

export interface StarRatingState {
    errorMessage: string;
}

export class StarRating extends Component<StarRatingProps, StarRatingState> {
    private fractions = 1;
    private contextObject: mendix.lib.MxObject | undefined;
    private rateType: string;
    private campaignEntity: string;
    private ownerReference = "System.owner";
    private start: number;
    private step: number;
    private stop: number;

    constructor(props: StarRatingProps) {
        super(props);
        this.state = { errorMessage: "" };
        this.fractions = 2;
        this.start = 0;
        this.step = 1;
        this.stop = 5;
    }

    render() {
        this.contextObject = this.props.contextObject || undefined;
        this.rateType = this.props.rateType;
        this.campaignEntity = this.props.campaignEntity.split("/")[1];

        if (this.hasValidConfig(this.props)) {
            this.fractions = this.rateType === "average" ? this.fractions : 1;
            const readonly = this.props.readOnly || !(this.contextObject && this.rateType === "single"
                && this.contextObject.get(this.ownerReference) === window.mx.session.getUserId());

            return DOM.div({ className: "widget-starrating" },
                createElement(Rating, {
                    empty: "glyphicon glyphicon-star-empty widget-star-rating widget-star-rating-empty",
                    fractions: this.fractions,
                    full: "glyphicon glyphicon-star widget-star-rating widget-star-rating-full",
                    initialRate: this.getRate(),
                    onChange:  (rate: number) => this.submitData(rate),
                    placeholder: "glyphicon glyphicon-star widget-star-rating widget-star-rating-placeholder",
                    readonly,
                    start: this.start,
                    step: this.step,
                    stop: this.stop
                }),
                createElement(Alert, { message: this.state.errorMessage }));
        } else {
            return createElement(Alert, { message: this.state.errorMessage });
        }
    }

    private getRate() {
        // The contextObject entityType for "average" is different from that of "single"
        // InitialRate for rateType "average" comes from averageAttribute on campaignEntity
        // InitialRate for rateType "single" comes from rateAttribute on rateEntity
        const initialRate = this.contextObject
            ? this.props.rateType === "average"
                ? this.contextObject.get(this.props.averageAttribute) as number
                : this.contextObject.get(this.props.rateAttribute) as number
            : 0 ;

        const maximumValue = this.step * this.stop;
        if (initialRate > maximumValue) {
            return maximumValue;
        } else if (initialRate < this.start) {
            return this.start;
        } else {
            // This helps to round off to the nearest fraction.
            // eg fraction 2 or 0.5, rounds off a rate 1.4 to 1.5, 1.2 to 1.0
            return Math.round(initialRate * this.fractions) / this.fractions;
        }
    }

    private submitData(rate: number) {
        if (this.contextObject) {
            this.contextObject.set(this.props.rateAttribute, rate);
            if (this.props.onChangeMicroflow) {
                this.executeMicroflow(this.contextObject.getGuid(), this.props.onChangeMicroflow);
            }
        }
    }

    private executeMicroflow(mendixGUID: string, microflow: string) {
        window.mx.ui.action(microflow, {
            error: (error: Error) =>
                this.setState({ errorMessage: `Error while executing microflow: ${microflow}: ${error.message}` }),
            params: {
                applyto: "selection",
                guids: [ mendixGUID ]
            }
        });
    }

    private hasValidConfig(props: StarRatingProps ) {
        const errorMessage: string[] = [];

        if (!this.contextObject) {
            return true;
        }
        if ((this.rateType === "average") && this.contextObject.getEntity() !== this.campaignEntity) {
            errorMessage.push(" - For rate type 'average', the contextObject should be campaign entity");
        }
        if ((this.rateType === "single") && this.contextObject.getEntity() !== this.props.rateEntity) {
            errorMessage.push(` - For rate type 'Single', the contextObject be rate entity '${this.props.rateEntity}'`);
        }
        if (this.rateType === "single" && !this.contextObject.isReference(this.ownerReference)) {
            errorMessage.push(` - Context object has no User / Owner association to it`);
        }

        if (errorMessage.length) {
            errorMessage.unshift("Configuration Error: ");
            this.state.errorMessage = errorMessage.join("\n");
        }
        return !errorMessage.length;
    }
}
