// import { shallow } from "enzyme";
// import { createElement } from "react";

// import * as Rating from "react-rating";
// import { StarRating, StarRatingProps } from "../StarRating";


// describe("StarRating", () => {
//     const renderStarRating = (props: StarRatingProps) => shallow(createElement(StarRating, props));

//     const starProps: StarRatingProps = {
//         fractions: 1,
//         initialRate: 3,
//         isReadOnly: true,
//         onChange: jasmine.createSpy("onChange"),
//         rateType: "single",
//         start: 0,
//         step: 1,
//         stop: 5
//     };

//     it("should render with rating structure", () => {
//         const starRating = renderStarRating(starProps);

//         expect(starRating).toBeElement(
//             createElement(Rating, {
//                 empty: "glyphicon glyphicon-star-empty widget-star-rating widget-star-rating-empty",
//                 fractions: 1,
//                 full: "glyphicon glyphicon-star widget-star-rating widget-star-rating-full",
//                 initialRate: starProps.initialRate,
//                 onChange: starProps.onChange,
//                 placeholder: "glyphicon glyphicon-star widget-star-rating widget-star-rating-placeholder",
//                 readonly: starProps.isReadOnly,
//                 start: starProps.start,
//                 step: starProps.step,
//                 stop: starProps.stop
//                 })
//         );
//     });

//     it("should render with whole numbers for 'single' rate-type", () => {
//         starProps.fractions = 2;
//         starProps.rateType = "single";

//         const starRating = renderStarRating(starProps).find(Rating);

//         expect(starRating.props().fractions).toBe(1);
//     });

//     it("should render with whole numbers for 'overall' rate-type", () => {
//         starProps.fractions = 2;
//         starProps.rateType = "overall";

//         const starRating = renderStarRating(starProps).find(Rating);

//         expect(starRating.props().fractions).toBe(2);
//     });

// });
