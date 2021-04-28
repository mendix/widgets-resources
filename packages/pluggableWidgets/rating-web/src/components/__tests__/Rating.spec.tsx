import { createElement } from "react";
import { mount, shallow } from "enzyme";
import { Rating, RatingProps } from "../Rating";

describe("Rating", () => {
    const defaultProps: RatingProps = {
        className: "",
        animated: true,
        disabled: false,
        emptyIcon: <div className="empty" />,
        fullIcon: <div className="full" />,
        value: 0,
        onChange: undefined,
        maximumValue: 5,
        style: undefined
    };

    it("renders correctly the structure", () => {
        const rating = shallow(<Rating {...defaultProps} />);
        expect(rating).toMatchSnapshot();
    });

    it("renders correctly the structure when disabled", () => {
        const rating = shallow(<Rating {...defaultProps} disabled />);
        expect(rating).toMatchSnapshot();
    });

    it("renders correctly the structure without animations", () => {
        const rating = shallow(<Rating {...defaultProps} animated={false} />);
        expect(rating).toMatchSnapshot();
    });

    it("renders correctly the structure with custom class", () => {
        const rating = shallow(<Rating {...defaultProps} className="my-custom-class" />);
        expect(rating).toMatchSnapshot();
    });

    it("renders the correct amount of items", () => {
        const rating = mount(<Rating {...defaultProps} maximumValue={2} />);
        expect(rating.find(".rating-item")).toHaveLength(2);
    });

    it("renders the correct amount of items when value is superior to maximumValue", () => {
        const rating = mount(<Rating {...defaultProps} maximumValue={2} value={5} />);
        expect(rating.find(".rating-item")).toHaveLength(2);
        expect(rating.find("div.full")).toHaveLength(2);
    });

    describe("with events", () => {
        it("triggers the event with correct value on click", () => {
            const onChange = jest.fn();
            const rating = mount(<Rating {...defaultProps} onChange={onChange} />);
            const options = rating.find(".rating-item");
            options.at(0).simulate("click");
            expect(onChange).toHaveBeenCalled();
            expect(onChange).toHaveBeenCalledWith(1);
        });

        it("cleans the value when clicking twice at same value", () => {
            const onChange = jest.fn();
            const rating = mount(<Rating {...defaultProps} onChange={onChange} />);
            const options = rating.find(".rating-item");
            options.at(1).simulate("click");
            expect(onChange).toHaveBeenCalledWith(2);
            // As the property is being managed from the outer component, we need to force the property to update to the new value
            rating.setProps({ value: 2 });
            options.at(1).simulate("click");
            expect(onChange).toHaveBeenCalledWith(0);
        });

        it("triggers the event with correct value on space key down", () => {
            const onChange = jest.fn();
            const rating = mount(<Rating {...defaultProps} onChange={onChange} />);
            const options = rating.find(".rating-item");
            options.at(0).simulate("keydown", { key: " " });
            expect(onChange).toHaveBeenCalled();
            expect(onChange).toHaveBeenCalledWith(1);
        });

        it("triggers the event with correct value on enter key down", () => {
            const onChange = jest.fn();
            const rating = mount(<Rating {...defaultProps} onChange={onChange} />);
            const options = rating.find(".rating-item");
            options.at(2).simulate("keydown", { key: "Enter" });
            expect(onChange).toHaveBeenCalled();
            expect(onChange).toHaveBeenCalledWith(3);
        });

        it("doesn't trigger any event when disabled", () => {
            const onChange = jest.fn();
            const rating = mount(<Rating {...defaultProps} disabled onChange={onChange} />);
            const options = rating.find(".rating-item");
            options.at(1).simulate("keydown", { key: "Enter" });
            expect(onChange).toHaveBeenCalledTimes(0);
            options.at(2).simulate("keydown", { key: " " });
            expect(onChange).toHaveBeenCalledTimes(0);
            options.at(3).simulate("click");
            expect(onChange).toHaveBeenCalledTimes(0);
        });
    });
});
