import { shallow } from "enzyme";
import { createElement } from "react";
import { FilterSelector } from "../FilterSelector";

const options = [
    { value: "contains", label: "Contains" },
    { value: "startsWith", label: "Starts with" },
    { value: "endsWith", label: "Ends with" },
    { value: "greater", label: "Greater than" },
    { value: "greaterEqual", label: "Greater than or equal" },
    { value: "equal", label: "Equal" },
    { value: "notEqual", label: "Not equal" },
    { value: "smaller", label: "Smaller than" },
    { value: "smallerEqual", label: "Smaller than or equal" }
];

describe("Filter selector", () => {
    it("renders correctly", () => {
        const component = shallow(
            <FilterSelector defaultFilter="contains" onChange={jest.fn()} name="test" options={options} />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with filter selectors open", () => {
        const onClickProps = { preventDefault: jest.fn(), stopPropagation: jest.fn() };
        const onChange = jest.fn();
        const component = shallow(
            <FilterSelector defaultFilter="contains" onChange={onChange} name="test" options={options} />
        );

        const button = component.find("button");
        button.simulate("click", onClickProps);

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with aria-label", () => {
        const component = shallow(
            <FilterSelector
                ariaLabel="my label"
                defaultFilter="contains"
                onChange={jest.fn()}
                name="test"
                options={options}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with another default filter", () => {
        const component = shallow(
            <FilterSelector defaultFilter="equal" onChange={jest.fn()} name="test" options={options} />
        );

        expect(component).toMatchSnapshot();
    });

    it("calls onChange when type changes", () => {
        const onClickProps = { preventDefault: jest.fn(), stopPropagation: jest.fn() };
        const onChange = jest.fn();
        const component = shallow(
            <FilterSelector defaultFilter="contains" onChange={onChange} name="test" options={options} />
        );

        const button = component.find("button");
        button.simulate("click", onClickProps);
        const lis = component.find("li");

        expect(lis.at(0)).toBeDefined();
        lis.at(0).simulate("click", onClickProps);

        expect(onChange).toBeCalled();
        expect(onChange).toBeCalledWith("contains");

        lis.at(1).simulate("click", onClickProps);
        expect(onChange).toBeCalledWith("startsWith");
    });
});
