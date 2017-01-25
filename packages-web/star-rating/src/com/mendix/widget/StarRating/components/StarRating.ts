import { Component, createElement } from "react";

import * as Rating from "react-rating";

export interface StarRatingProps {
    fractions?: number;
    fullColor?: string;
    emptyColor?: string;
    initialRate?: number;
    onChange?: (rate: number) => void;
    onClick?: (rate: number) => void;
    placeholder?: string;
    isReadOnly?: boolean;
    start?: number;
    step?: number;
    stop?: number;
    rateType?: "single" | "overall";
}

export class StarRating extends Component<StarRatingProps, {}> {
    private fractions: number;

    render() {
        this.fractions = this.props.rateType === "overall" ? this.props.fractions : 1;
        return createElement(Rating, {
            empty: "glyphicon glyphicon-star-empty widget-star-rating widget-star-rating-empty",
            fractions: this.fractions,
            full: "glyphicon glyphicon-star widget-star-rating widget-star-rating-full",
            initialRate: this.getRate(),
            onChange: this.props.onChange,
            placeholder: "glyphicon glyphicon-star widget-star-rating widget-star-rating-placeholder",
            readonly: this.props.isReadOnly,
            start: this.props.start,
            step: this.props.step,
            stop: this.props.stop
        });
    }
    private getRate() {
        const maximumValue = this.props.step * this.props.stop;
        if (this.props.initialRate > maximumValue) {
            return maximumValue;
        } else if (this.props.initialRate < this.props.start) {
            return this.props.start;
        } else {
            return Math.round(this.props.initialRate * this.fractions) / this.fractions;
        }
    }
}
