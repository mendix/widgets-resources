import { Component, createElement, DOM } from "react";

import * as Rating from "react-rating";
import { Alert } from "./Alert";

export interface StarRatingProps {
    initialRate?: number;
    handleOnChange?: Function;
    onRateMicroflow?: string;
    ownerGUID?: string;
    readOnly: boolean;
    rateType: "rating" | "average";
    configurationError?: string;
}

export interface StarRatingState {
    errorMessage: string;
}

export class StarRating extends Component<StarRatingProps, StarRatingState> {
    private fractions: number;
    private rateType: string;
    private start: number;
    private step: number;
    private stop: number;

    constructor(props: StarRatingProps) {
        super(props);

        this.state = { errorMessage: "" };
    }

    render() {
        this.fractions = 2;
        this.start = 0;
        this.step = 1;
        this.stop = 5;
        this.rateType = this.props.rateType;

        if (!this.props.configurationError) {
            this.fractions = this.rateType === "average" ? this.fractions : 1;
            const readonly = this.props.readOnly || this.rateType === "average" || !(this.rateType === "rating"
                && this.props.ownerGUID === window.mx.session.getUserId());

            return DOM.div({ className: "widget-starrating" },
                createElement(Rating, {
                    empty: "glyphicon glyphicon-star-empty widget-star-rating widget-star-rating-empty",
                    fractions: this.fractions,
                    full: "glyphicon glyphicon-star widget-star-rating widget-star-rating-full",
                    initialRate: this.getRate(),
                    onChange: this.props.handleOnChange ? (rate: number) => this.onRate(rate) : undefined,
                    placeholder: "glyphicon glyphicon-star widget-star-rating widget-star-rating-placeholder",
                    readonly,
                    start: this.start,
                    step: this.step,
                    stop: this.stop
                }),
                createElement(Alert, { message: this.state.errorMessage }));
        } else {
            return createElement(Alert, { message: this.props.configurationError });
        }
    }

    private getRate() {
        const { initialRate } = this.props;
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
    private onRate(rate: number) {
        if (this.props.handleOnChange) {
            const microflow = this.props.onRateMicroflow;
            this.props.handleOnChange(rate, (error: Error) => { // this function is bound to the component's context
                this.setState({ errorMessage: `Error while executing microflow: ${microflow}: ${error.message}` });
            });
        }
    }
}
