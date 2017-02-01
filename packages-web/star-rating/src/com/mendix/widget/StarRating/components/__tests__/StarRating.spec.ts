import { shallow } from "enzyme";
import { createElement, DOM } from "react";

import * as Rating from "react-rating";
import { Alert } from "../Alert";
import { StarRating, StarRatingProps } from "../StarRating";

import { mockMendix, mockMx } from "tests/mocks/Mendix";

describe("StarRating", () => {
    let starProps: StarRatingProps;
    const renderStarRating = (props: StarRatingProps) => shallow(createElement(StarRating, props));
    const spyOnGet = (rateValue?: number, averageValue?: number) => {
        spyOn(starProps.contextObject, "get").and.callFake((attr: string) => {
            if (attr === "rateAttribute") {
                return rateValue || 2;
            }
            if (attr === "averageAttribute") {
                return averageValue || 2.5;
            }
            return undefined;
        });
    };
    const defaultMx = window.mx;
    const defaultMendix = window.mendix;

    beforeAll(() => {
        window.mx = mockMx;
        window.mendix = mockMendix;
    });

    beforeEach(() => {
        starProps = {
            averageAttribute: "averageAttribute",
            campaignEntity: "Reference/campaignEntity",
            contextObject: new mendix.lib.MxObject(),
            onChangeMicroflow: "Microflow",
            rateAttribute: "rateAttribute",
            rateEntity: "rateEntity",
            rateType: "single",
            readOnly: true
        };
        spyOn(starProps.contextObject, "getEntity").and.callFake(() => {
            return starProps.rateType === "single" ? "rateEntity" : "campaignEntity";
        });
        spyOn(starProps.contextObject, "isReference").and.callFake((att: string) => (att === "System.owner"));
    });

    it("should render with a rating structure", () => {
        spyOnGet();

        const starRating = renderStarRating(starProps);

        expect(starRating).toBeElement(
            DOM.div({ className: "widget-starrating" },
                createElement(Rating, {
                    empty: "glyphicon glyphicon-star-empty widget-star-rating widget-star-rating-empty",
                    fractions: 1,
                    full: "glyphicon glyphicon-star widget-star-rating widget-star-rating-full",
                    initialRate: 2,
                    onChange: jasmine.any(Function),
                    placeholder: "glyphicon glyphicon-star widget-star-rating widget-star-rating-placeholder",
                    readonly: starProps.readOnly,
                    start: 0,
                    step: 1,
                    stop: 5
                }),
                createElement(Alert)
            )
        );
    });

    it("should render with whole numbers for the single rate type", () => {
        spyOnGet();

        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().fractions).toBe(1);
    });

    it("should render with fractions for the average rate type", () => {
        starProps.rateType = "average";
        spyOnGet();

        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().fractions).toBe(2);
    });

    it("should render without a contextObject", () => {
        starProps.contextObject = undefined;

        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().initialRate).toEqual(0);
    });

    it("should render with negative rating", () => {
        spyOnGet(-1);

        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().initialRate).toEqual(0);
    });

    it("should render with large positive rating", () => {
        spyOnGet(100);

        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().initialRate).toEqual(5);
    });

    afterAll(() => {
        window.mx = defaultMx;
        window.mendix = defaultMendix;
    });
});
