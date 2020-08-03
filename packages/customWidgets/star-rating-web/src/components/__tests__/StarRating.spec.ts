import { ShallowWrapper, shallow } from "enzyme";
import { CSSProperties, createElement } from "react";

import Rating from "react-rating";

import { StarRating, StarRatingProps } from "../StarRating";
// import { StarSize, WidgetColors } from "../StarRatingContainer";

describe("StarRating", () => {
    let starProps: StarRatingProps;
    // let emptyStar: React.ReactElement<any>;
    // let fullStar: React.ReactElement<any>;

    const renderStarRating = (props: StarRatingProps): ShallowWrapper<StarRatingProps, any> => {
        // const customStyle: CSSProperties = props.starSize === "custom" ? { fontSize: `${props.starSizeCustom}px` } : {};

        // emptyStar = createElement("span", {
        //     className:
        //         "glyphicon glyphicon-star-empty widget-star-rating-empty " +
        //         `widget-star-rating-font-${props.starSize}`,
        //     style: customStyle
        // });

        // fullStar = createElement("span", {
        //     className:
        //         `glyphicon glyphicon-star widget-star-rating-font-${props.starSize} ` +
        //         `widget-star-rating-full-${props.widgetColor}`,
        //     style: customStyle
        // });

        return shallow(createElement(StarRating, props));
    };

    beforeAll(() => {
        starProps = {
            handleOnChange: jasmine.createSpy("onChange"),
            initialRate: 2,
            maximumStars: 5,
            readOnly: false,
            starSize: "medium",
            starSizeCustom: 50,
            widgetColor: "widget"
        };
    });

    // it("should render with a rating structure", () => {
    // TODO use snapshot
    //     const starRating = renderStarRating(starProps);

    //     expect(starRating).toBeElement(
    //         createElement(Rating, {
    //             empty: emptyStar,
    //             fractions: 1,
    //             full: fullStar,
    //             initialRate: 2,
    //             onChange: jasmine.any(Function) as any,
    //             readonly: starProps.readOnly,
    //             start: 0,
    //             step: 1,
    //             stop: 5
    //         })
    //     );
    // });

    it("should render with whole numbers for the rating rate type", () => {
        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().fractions).toBe(1);
    });

    it("should render with fractions if readOnly is true", () => {
        starProps.readOnly = true;

        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().fractions).toBe(2);
    });

    it("should render no stars with negative rating", () => {
        starProps.initialRate = -1;
        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().initialRate).toEqual(0);
    });

    it("should render max stars for large positive rating", () => {
        starProps.initialRate = 100;

        const starRating = renderStarRating(starProps).find(Rating);

        expect(starRating.props().initialRate).toEqual(starProps.maximumStars);
    });

    describe("of star size", () => {
        it("'large', should render with class 'widget-star-rating-font-large'", () => {
            starProps.starSize = "large";
            const starRating = renderStarRating(starProps).find(Rating);
            const shallowEmptyStar = shallow(starRating.props().empty as React.ReactElement<any>);

            expect(shallowEmptyStar.hasClass("widget-star-rating-font-large")).toBe(true);
        });

        it("'custom', should render with expected size", () => {
            starProps.starSize = "custom";
            starProps.starSizeCustom = 60;

            const starRating = renderStarRating(starProps).find(Rating);
            const shallowEmptyStar = shallow(starRating.props().empty as React.ReactElement<any>);

            expect((shallowEmptyStar.props().style as CSSProperties).fontSize).toEqual(`${starProps.starSizeCustom}px`);
        });
    });
});
