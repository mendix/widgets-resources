import { Component, createElement, DOM } from "react";

import * as Rating from "react-rating";

export interface StarRatingProps {
    maxStars?: number;
    fullColor?: string;
    emptyColor?: string;
    activeRate?: number;
    onClick?: () => void; // TODO for microflow, and page
    onChange?: (rate: number) => void; // TODO for microflow, and page
    isCampaign?: boolean;
    data?: any;
    isReadOnly?: boolean;
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
            start: 0,
            step: 1,
            stop: 5
        });
    }
}
