import { createElement } from "react";
import { actionValue, EditableValueBuilder } from "@mendix/piw-utils-internal";
import { StarRatingContainerProps } from "../../../typings/StarRatingProps";
import { Big } from "big.js";
import { mount, shallow } from "enzyme";
import { StarRating } from "../../StarRating";
import { Rating } from "../Rating";

describe("Rating Container", () => {
    const createProps = (props?: Partial<StarRatingContainerProps>): StarRatingContainerProps => {
        const defaultProps: StarRatingContainerProps = {
            class: "",
            name: "rating",
            tabIndex: 0,
            ratingAttribute: new EditableValueBuilder<Big>().withValue(new Big(5)).build(),
            animation: true,
            maximumValue: 5
        };

        return { ...defaultProps, ...props };
    };

    it("renders correctly the structure", () => {
        const rating = shallow(<StarRating {...createProps()} />);
        expect(rating).toMatchSnapshot();
    });

    it("renders correctly the structure without animation", () => {
        const rating = shallow(<StarRating {...createProps()} animation={false} />);
        expect(rating).toMatchSnapshot();
    });

    it("renders correctly the structure when disabled", () => {
        const rating = shallow(
            <StarRating
                {...createProps({
                    ratingAttribute: new EditableValueBuilder<Big>().withValue(new Big(1)).isReadOnly().build()
                })}
            />
        );
        expect(rating).toMatchSnapshot();
    });

    it("triggers correctly on change action", () => {
        const onChange = actionValue();
        const ratingWrapper = mount(<StarRating {...createProps({ onChange })} />);
        const rating = ratingWrapper.find(Rating);
        const options = rating.find("div.rating-item");
        options.at(0).simulate("click");

        expect(onChange.execute).toBeCalled();
    });
});
