import { mount, shallow } from "enzyme";
import { createElement } from "react";
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

    it("triggers the event with correct value on click", () => {
        const onChange = jest.fn();
        const rating = mount(<Rating {...defaultProps} onChange={onChange} />);
        const options = rating.find(".rating-item");
        options.at(0).simulate("click");
        expect(onChange).toBeCalled();
        expect(onChange).toBeCalledWith(1);
    });

    it("cleans the value when clicking twice at same value", () => {
        const onChange = jest.fn();
        const rating = mount(<Rating {...defaultProps} onChange={onChange} />);
        const options = rating.find(".rating-item");
        options.at(1).simulate("click");
        expect(onChange).toBeCalledWith(2);
        options.at(1).simulate("click");
        expect(onChange).toBeCalledWith(0);
    });

    it("triggers the event with correct value on space key down", () => {
        const onChange = jest.fn();
        const rating = mount(<Rating {...defaultProps} onChange={onChange} />);
        const options = rating.find(".rating-item");
        options.at(0).simulate("keydown", { key: " " });
        expect(onChange).toBeCalled();
        expect(onChange).toBeCalledWith(1);
    });

    it("triggers the event with correct value on enter key down", () => {
        const onChange = jest.fn();
        const rating = mount(<Rating {...defaultProps} onChange={onChange} />);
        const options = rating.find(".rating-item");
        options.at(2).simulate("keydown", { key: "Enter" });
        expect(onChange).toBeCalled();
        expect(onChange).toBeCalledWith(3);
    });
});
