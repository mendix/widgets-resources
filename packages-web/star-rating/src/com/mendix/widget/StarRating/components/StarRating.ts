// TODO: Remove this file or use it for later to improve the widget

import { Component, createElement, DOM } from "react";

import * as Rating from "react-rating";

export interface StarRatingProps {
    maximumStars?: number;
    fractions?: number;
    fullColor?: string;
    emptyColor?: string;
    initialRate?: number;
    onChange?: (rate: number) => void;
    isCampaign?: boolean;
    isReadOnly?: boolean;
    start?: number;
    step?: number;
    stop?: number;
}

export class StarRating extends Component<StarRatingProps, {}> {
    private stars: Element[];
    render() {
        return createElement(Rating, {
            empty: "glyphicon glyphicon-star-empty widget-starrating widget-starrating-empty",
            fractions: this.props.fractions,
            full: "glyphicon glyphicon-star widget-starrating widget-starrating-full",
            initialRate: this.getRate(),
            onChange: this.props.onChange,
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
            return Math.round(this.props.initialRate * this.props.fractions) / this.props.fractions;
        }
    }
}
