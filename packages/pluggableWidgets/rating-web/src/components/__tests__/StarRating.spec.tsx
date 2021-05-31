import { createElement } from "react";
import { actionValue, EditableValueBuilder } from "@mendix/piw-utils-internal";
import { StarRatingContainerProps } from "../../../typings/StarRatingProps";
import { Big } from "big.js";
import { mount, shallow } from "enzyme";
import { StarRating } from "../../StarRating";
import { Rating } from "../Rating";

describe("Rating Container", () => {
    const defaultProps: StarRatingContainerProps = {
        class: "",
        name: "rating",
        tabIndex: 0,
        rateAttribute: new EditableValueBuilder<Big>().withValue(new Big(5)).build(),
        animation: true,
        maximumStars: 5
    };

    it("renders correctly the structure", () => {
        const rating = shallow(<StarRating {...defaultProps} />);
        expect(rating).toMatchSnapshot();
    });

    it("renders correctly the structure without animation", () => {
        const rating = shallow(<StarRating {...defaultProps} animation={false} />);
        expect(rating).toMatchSnapshot();
    });

    it("renders correctly the structure when disabled", () => {
        const rating = shallow(
            <StarRating
                {...defaultProps}
                rateAttribute={new EditableValueBuilder<Big>().withValue(new Big(1)).isReadOnly().build()}
            />
        );
        expect(rating).toMatchSnapshot();
    });

    describe("with events", () => {
        it("triggers correctly on change action", () => {
            const onChange = actionValue();
            const ratingWrapper = mount(<StarRating {...defaultProps} onChange={onChange} />);
            const rating = ratingWrapper.find(Rating);
            const options = rating.find("div.rating-item");
            options.at(0).simulate("click");

            expect(onChange.execute).toHaveBeenCalled();
        });

        it("defines correct values to attribute on change action", () => {
            const ratingAttribute = new EditableValueBuilder<Big>().withValue(new Big(0)).build();
            const ratingWrapper = mount(<StarRating {...defaultProps} rateAttribute={ratingAttribute} />);
            const rating = ratingWrapper.find(Rating);
            const options = rating.find("div.rating-item");
            options.at(0).simulate("click");

            expect(ratingAttribute.setValue).toHaveBeenCalled();
            expect(ratingAttribute.setValue).toHaveBeenCalledWith(new Big(1));
        });

        it("doesnt call setValue when value is read only", () => {
            const ratingAttribute = new EditableValueBuilder<Big>().withValue(new Big(1)).isReadOnly().build();
            const ratingWrapper = mount(<StarRating {...defaultProps} rateAttribute={ratingAttribute} />);
            const rating = ratingWrapper.find(Rating);
            const options = rating.find("div.rating-item");
            options.at(0).simulate("click");

            expect(ratingAttribute.setValue).toHaveBeenCalledTimes(0);
        });

        it("doesnt trigger on change action when attribute is read only", () => {
            const onChange = actionValue();
            const ratingWrapper = mount(
                <StarRating
                    {...defaultProps}
                    rateAttribute={new EditableValueBuilder<Big>().withValue(new Big(1)).isReadOnly().build()}
                />
            );
            const rating = ratingWrapper.find(Rating);
            const options = rating.find("div.rating-item");
            options.at(0).simulate("click");

            expect(onChange.execute).toHaveBeenCalledTimes(0);
        });
    });
});
