// TODO: Improve the tests using root StarRatings

import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import * as Rating from "react-rating";

import { StarRating, StarRatingProps } from "../StarRating";

describe("StarRating", () => {
    const renderStarRating = (props: StarRatingProps) => shallow(createElement(StarRating, props));
    const fullColor = "#0000FF";
    const emptyColor = "#FFFFFF";
    const maxStars = 6;
    const activeRate = 2;
    const isReadOnly = true;
    const empty = "glyphicon glyphicon-star-empty custom custom-empty";
    const full = "glyphicon glyphicon-star custom custom-full";

    it("renders the structure correctly", () => {
        const starRating = renderStarRating({ fullColor, emptyColor });

        expect(starRating).toBeElement(
            createElement(Rating, {
                empty,
                fractions: activeRate,
                full
            })
        );
    });

    it("sets the rating value", () => {
        const starRating = renderStarRating({ fullColor, emptyColor, activeRate, maxStars, isReadOnly }).find(Rating);

        expect(starRating.prop("initialRate")).toBe(activeRate);
    });

    it("updates the rating value when the values are changed", () => {
        //
    });

    describe("should render as readonly", () => {
        it("when show total is false", () => {
            //
        });

        it("when user is not vote owner", () => {
            //
        });

    });

    describe("with step", () => {
        it("not specified renders empty ui", () => {
            //
        });

        it("stop  equal or less than 0 shows invalid", () => {
            //
        });

        it("less than 0 show empty ui", () => {
            //
        });

        it("greater than the maximum show maximum", () => {
            //
        });
    });

    describe("color", () => {
        it("should be red color is red", () => {
            // Fix me
        });

        it("should not be red when color not red", () => {
            // Fix me
        });
    });

    describe("symbol", () => {
        it("should be star if set style is star", () => {
            // Fix me
        });

        it("should not be star if set style is not star", () => {
            // Fix me
        });
    });

    describe("with an onClick microflow set", () => {
        it("executes the microflow when a rating is clicked", () => {
            //
        });

        it("microflow selected it shows an error in configuration", () => {
            //
        });

        it("invalid microflow shows an error when a rating is clicked", () => {
            //
        });
    });

    describe("with an onClick show page set", () => {
        it("opens the page when a rating is clicked", () => {
            //
        });

        it("without a page selected it shows an error in configuration", () => {
            //
        });
    });

    describe("without a on click", () => {
        it("should not respond on user click", () => {
            //
        });
    });

});
