import { shallow } from "enzyme";
import { createElement } from "react";
import { FilterSelector } from "../FilterSelector";

describe("Filter selector", () => {
    it("renders correctly", () => {
        const component = shallow(<FilterSelector defaultFilter="equal" onChange={jest.fn()} name="test" />);

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with aria-label", () => {
        const component = shallow(
            <FilterSelector ariaLabel="my label" defaultFilter="equal" onChange={jest.fn()} name="test" />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with another default filter", () => {
        const component = shallow(<FilterSelector defaultFilter="equal" onChange={jest.fn()} name="test" />);

        expect(component).toMatchSnapshot();
    });

    it("calls onChange when type changes", () => {
        const onChange = jest.fn();
        const component = shallow(<FilterSelector defaultFilter="equal" onChange={onChange} name="test" />);

        const button = component.find("button");
        button.simulate("click");
        const lis = component.find("li");

        expect(lis.at(0)).toBeDefined();
        lis.at(0).simulate("click");

        expect(onChange).toBeCalled();
        expect(onChange).toBeCalledWith("greater");

        lis.at(1).simulate("click");
        expect(onChange).toBeCalledWith("greaterEqual");
    });
});
