import { mount, shallow } from "enzyme";
import { createElement, DOM } from "react";

import * as Rating from "react-rating";

import { StarRating, StarRatingProps } from "../StarRating";

describe("StarRating", () => {
    let starProps: StarRatingProps;
    const renderStarRating = (props: StarRatingProps) => shallow(createElement(StarRating, props));

    beforeAll(() => {
        starProps = {
            fractions: 1,
            handleOnChange: jasmine.createSpy("onChange"),
            initialRate: 2,
            readOnly: false
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
                    readonly: starProps.readOnly,
                    start: 0,
                    step: 1,
                    stop: 5
                })
            )
        );
    });

    it("should render with whole numbers for the rating rate type", () => {
        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().fractions).toBe(1);
    });

    it("should render with fractions for the average rate type", () => {
        starProps.fractions = 2;

        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().fractions).toBe(2);
    });

    it("should render no stars with negative rating", () => {
        starProps.initialRate = -1;
        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().initialRate).toEqual(0);
    });

    it("should render max 5 stars for large positive rating", () => {
        starProps.initialRate = 100;

        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().initialRate).toEqual(5);
    });

    it("with onChange function should respond to change event", () => {
        const handleOnChange = jasmine.createSpy("onChange");
        const ratingProps: StarRatingProps = {
            fractions: 1,
            handleOnChange,
            initialRate: 2,
            readOnly: false
        };

        const starRating = mount(createElement(StarRating, ratingProps)).find(Rating);
            // renderStarRating(ratingProps).find(Rating);
        starRating.simulate("change", { target: { value: 4 } });

        expect(handleOnChange).toHaveBeenCalledWith(4);

    });

    // it("when disabled should not change on click", () => {
    //     const handleOnChange = jasmine.createSpy("onChange");
    //     const ratingProps: StarRatingProps = {
    //         fractions: 1,
    //         handleOnChange,
    //         initialRate: 2,
    //         readOnly: true
    //     };

    //     const starRating = renderStarRating(ratingProps).find(Rating);
    //     starRating.simulate("change", { target: { value: 4 } });

    //     expect(handleOnChange).toHaveBeenCalledTimes(0);
    // });

});
