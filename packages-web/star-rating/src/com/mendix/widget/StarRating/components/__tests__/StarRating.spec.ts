import { shallow } from "enzyme";
import { createElement, DOM } from "react";

import * as Rating from "react-rating";
import { Alert } from "../Alert";
import { StarRating, StarRatingProps } from "../StarRating";


describe("StarRating", () => {
    let starProps: StarRatingProps;
    const renderStarRating = (props: StarRatingProps) => shallow(createElement(StarRating, props));

    beforeEach(() => {
        starProps = {
            initialRate: 2,
            rateType: "rating",
            readOnly: true
        };
    });

    it("should render with a rating structure", () => {
        const starRating = renderStarRating(starProps);

        expect(starRating).toBeElement(
            DOM.div({ className: "widget-star-rating" },
                createElement(Rating, {
                    empty: "glyphicon glyphicon-star-empty widget-star-rating-empty widget-star-rating-font",
                    fractions: 1,
                    full: "glyphicon glyphicon-star widget-star-rating-full widget-star-rating-font",
                    initialRate: 2,
                    onChange: jasmine.any(Function) as any,
                    placeholder: "glyphicon glyphicon-star widget-star-rating-placeholder widget-star-rating-font",
                    readonly: starProps.readOnly,
                    start: 0,
                    step: 1,
                    stop: 5
                }),
                createElement(Alert)
            )
        );
    });

    it("should render with whole numbers for the rating rate type", () => {
        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().fractions).toBe(1);
    });

    it("should render with fractions for the average rate type", () => {
        starProps.rateType = "average";

        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().fractions).toBe(2);
    });

    it("should render with negative rating", () => {
        starProps.initialRate = -1;
        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().initialRate).toEqual(0);
    });

    it("should render with large positive rating", () => {
        starProps.initialRate = 100;

        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().initialRate).toEqual(5);
    });

    it("should render alert", () => {
        starProps.configurationError = "missing microflow";

        const starRating = renderStarRating(starProps);

        expect(starRating).toBeElement(
            DOM.div({ className: "widget-star-rating" },
                    createElement(Alert, { message: starProps.configurationError })));
    });

});
