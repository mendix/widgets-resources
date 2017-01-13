import { Component, DOM, createElement } from "react";

import * as Rating from "react-rating";

export interface StarRatingProps {
    maxStars?: string;
    fullColor?: string;
    emptyColor?: string;
    activeRate?: number;
    onClick?: () => void; //TODO for microflow, and page
    onChange?: (rate: number) => void; //TODO for microflow, and page
    isCampaign?: boolean;
    data?:any;
    isReadOnly?: boolean;
}

export class StarRating extends Component<StarRatingProps, {}> {
    private stars: Element[];
    render() {
        return createElement(Rating, this.getProps());
    }

    private getProps(): RateProps {
        return {
            initialRate: this.props.activeRate,
            empty: "glyphicon glyphicon-star-empty custom custom-empty", 
            full: "glyphicon glyphicon-star custom custom-full",
            readonly: this.props.isReadOnly,
            fractions: 2,
            onChange: this.props.onChange
        }
    }
}