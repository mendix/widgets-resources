import { Component, createElement, DOM } from "react";

import * as Rating from "react-rating";

export interface StarRatingProps {
    initialRate?: number;
    handleOnChange?: Function;
    onChangeMicroflow?: string;
    ownerGuid?: string;
    readOnly: boolean;
    rateType: "rating" | "average";
}

export class StarRating extends Component<StarRatingProps, {}> {
    private fractions: number;
    private start: number;
    private step: number;
    private stop: number;

    constructor(props: StarRatingProps) {
        super(props);

        this.fractions = props.rateType === "average" ? 2 : 1;
        this.start = 0;
        this.step = 1;
        this.stop = 5;
    }

    render() {
        const rateType = this.props.rateType;
        const readonly = this.props.readOnly || rateType === "average" || !(rateType === "rating"
            && this.props.ownerGuid === window.mx.session.getUserId());

        return DOM.div({ className: "widget-star-rating" },
            createElement(Rating, {
                empty: "glyphicon glyphicon-star-empty widget-star-rating-empty widget-star-rating-font",
                fractions: this.fractions,
                full: "glyphicon glyphicon-star widget-star-rating-full widget-star-rating-font",
                initialRate: this.getRate(),
                onChange: this.props.handleOnChange ? (rate: number) => this.onRate(rate) : undefined,
                placeholder: "glyphicon glyphicon-star widget-star-rating-placeholder widget-star-rating-font",
                readonly,
                start: this.start,
                step: this.step,
                stop: this.stop
            }));
    }

    private getRate() {
        const maximumValue = this.step * this.stop;
        if (this.props.initialRate) {
            if (this.props.initialRate > maximumValue) {
                return maximumValue;
            } else if (this.props.initialRate < this.start) {
                return this.start;
            }
            // This helps to round off to the nearest fraction.
            // eg fraction 2 or 0.5, rounds off a rate 1.4 to 1.5, 1.2 to 1.0
            return Math.round(this.props.initialRate * this.fractions) / this.fractions;
        }

        return 0;
    }

    private onRate(rate: number) {
        if (this.props.handleOnChange) {
            this.props.handleOnChange(rate);
        }
    }
}
