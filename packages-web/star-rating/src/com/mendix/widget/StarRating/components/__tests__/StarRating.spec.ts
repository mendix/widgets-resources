// TODO: Improve the tests using root StarRatings

import { shallow } from "enzyme";
import { createElement, DOM } from "react";

import * as Rating from "react-rating";

import { StarRating, StarRatingProps } from "../StarRating";


describe("StarRating", () => {
    const renderStarRating = (props: StarRatingProps) => shallow(createElement(StarRating, props));

    const starProps: StarRatingProps = {
        fractions: 1,
        initialRate: 3,
        isReadOnly: true,
        rateType: "single",
        start: 0,
        step: 1,
        stop: 5
    };

    it("renders the structure correctly", () => {
        const starRating = renderStarRating(starProps);

        expect(starRating.get(0).props.full)
            .toBe("glyphicon glyphicon-star widget-starrating widget-starrating-full");
        expect(starRating.get(0).props.empty)
            .toBe("glyphicon glyphicon-star-empty widget-starrating widget-starrating-empty");
        expect(starRating.get(0).props.placeholder)
            .toBe("glyphicon glyphicon-star widget-starrating widget-starrating-placeholder");
        expect(starRating.get(0).props.readonly).toBe(true);
        expect(starRating.get(0).props.initialRate).toBe(3);
    });

    it("receives an onChange function", () => {
        const onChangeSpy = jasmine.createSpy("onChange");
        const onClickSpy = jasmine.createSpy("onClick");
        starProps.onChange = onChangeSpy;

        const starRating = renderStarRating(starProps);

        expect(starRating.get(0).props.onChange).toBe(onChangeSpy);
        expect(starRating.get(0).props.onClick).toBe(onClickSpy);

    });

    describe("single", () => {
        it("should render with whole numbers not fraction", () => {
            starProps.rateType = "single";
            starProps.fractions = 2;

            const starRating = renderStarRating(starProps).find(Rating);

            expect(starRating.get(0).props.fraction).toBe(1);
        });
    });

});
