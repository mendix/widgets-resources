// TODO: Remove this file or use it for later to improve the widget

import { Component, createElement, DOM } from "react";

import * as Rating from "react-rating";

export interface StarRatingProps {
    maxStars?: number;
    fullColor?: string;
    emptyColor?: string;
    activeRate?: number;
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
            empty: "glyphicon glyphicon-star-empty custom custom-empty",
            fractions: 2,
            full: "glyphicon glyphicon-star custom custom-full",
            initialRate: this.props.activeRate,
            onChange: this.props.onChange,
            readonly: this.props.isReadOnly,
            start: this.props.start,
            step: this.props.step,
            stop: this.props.maxStars
        });
    }
}
