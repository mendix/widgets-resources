import { shallow } from "enzyme";
import { createElement, DOM } from "react";

import * as Rating from "react-rating";
import { StarRating, StarRatingProps } from "../StarRating";

import { mockMendix, mockMx } from "tests/mocks/Mendix";

describe("StarRating", () => {

    let starProps: StarRatingProps;
    const renderStarRating = (props: StarRatingProps) => shallow(createElement(StarRating, props));
    const spyOnGet = (rateValue?: number, averageValue?: number) => {
        spyOn(starProps.contextObject, "get").and.callFake((attr: string) => {
            rateValue = rateValue || 2;
            averageValue = averageValue || 2.5;
            if (attr === "rateAttribute") {
                return rateValue;
            }
            if (attr === "averageAttribute") {
                return averageValue;
            }
            return undefined;
        });
    };

    beforeAll(() => {
        window.mx = mockMx;
        window.mendix = mockMendix;
    });

    beforeEach(() => {
        starProps = {
            averageAttribute: "averageAttribute",
            campaignEntity: "Reference/campaignEntity",
            onChangeMicroflow: "Microflow",
            rateAttribute: "rateAttribute",
            rateEntity: "rateEntity",
            rateType: "single",
            readOnly: true
        };
        starProps.contextObject = new mendix.lib.MxObject();
        spyOn(starProps.contextObject, "getEntity").and.callFake(() => {
            return starProps.rateType === "single" ? "rateEntity" : "campaignEntity";
        });
        spyOn(starProps.contextObject, "isReference").and.callFake((att: string) => (att === "System.owner"));
    });

    it("should render with rating structure", () => {
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
                    })
            )
        );
    });

    it("should render with whole numbers for 'single' rate-type", () => {
        spyOnGet();
        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().fractions).toBe(1);
    });

    it("should render with fractions for 'average' rate-type", () => {
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

});
