import * as classNames from "classnames";
import { Component, createElement, DOM } from "react";
import * as Rating from "react-rating";
import { widgetColors } from "./StarRatingContainer";

import "../ui/StarRating.scss";
// import "../ui/testingsassmeister.scss";

export interface StarRatingProps {
    className?: string;
    initialRate: number;
    handleOnChange?: (rate: number) => void;
    readOnly: boolean;
    maximumStars: number;
    style?: object;
    widgetColor: widgetColors;
}

export class StarRating extends Component<StarRatingProps, {}> {
    private start: number;
    private step: number;
    private stop: number;
    private fractions: number;

    constructor(props: StarRatingProps) {
        super(props);

        this.start = 0;
        this.step = 1;
        this.stop = this.props.maximumStars;
        this.onChange = this.onChange.bind(this);
    }

    render() {
        const { readOnly } = this.props;
        this.fractions = readOnly ? 2 : 1;
        this.stop = this.props.maximumStars;

        return DOM.div({ className: classNames("widget-star-rating", this.props.className), style: this.props.style },
            createElement(Rating, {
                empty: "glyphicon glyphicon-star-empty widget-star-rating-empty ",
                fractions: this.fractions,
                full: classNames("glyphicon", `glyphicon-star`,
                    { "widget-star-rating-full": this.props.widgetColor === "widget" },
                    { [`widget-star-rating-full-${this.props.widgetColor}`]: this.props.widgetColor !== "widget" }),
                initialRate: this.getRate(this.props),
                onChange: !readOnly ? this.onChange : undefined,
                readonly: readOnly,
                start: this.start,
                step: this.step,
                stop: this.stop
            })
        );
    }

    private getRate(props: StarRatingProps) {
        const maximumValue = this.step * this.stop;
        if (props.initialRate > maximumValue) {
            return maximumValue;
        } else if (props.initialRate < this.start) {
            return this.start;
        }
        // This helps to round off to the nearest fraction.
        // eg fraction 2 or 0.5, rounds off a rate 1.4 to 1.5, 1.2 to 1.0
        return Math.round(props.initialRate * this.fractions) / this.fractions as number;
    }

    private onChange(rate: number) {
        if (this.props.handleOnChange) {
            this.props.handleOnChange(Number(rate < 1 ? 1 : rate));
        }
    }
}
