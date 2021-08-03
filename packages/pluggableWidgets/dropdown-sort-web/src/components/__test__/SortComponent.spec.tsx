import { render, shallow } from "enzyme";
import { createElement } from "react";
import { SortComponent, SortOption } from "../SortComponent";

const defaultOptions: SortOption[] = [
    { caption: "1", value: "_1" },
    { caption: "2", value: "_2" },
    { caption: "3", value: "_3" }
];

describe("Sort selector", () => {
    describe("renders correctly", () => {
        it("with options", () => {
            const component = render(<SortComponent options={defaultOptions} />);

            expect(component).toMatchSnapshot();
        });
        it("with no options", () => {
            const component = render(<SortComponent options={[]} />);

            expect(component).toMatchSnapshot();
        });
        it("with ariaLabel", () => {
            const component = render(<SortComponent options={defaultOptions} ariaLabel="my label" />);

            expect(component).toMatchSnapshot();
        });
        it("with emptyOptioncaption", () => {
            const component = render(<SortComponent options={defaultOptions} emptyOptionCaption={"find me"} />);

            expect(component).toMatchSnapshot();
            expect(component.find("input").first().prop("placeholder")).toBe("find me");
        });
    });
    it("selects default option", () => {
        const defaultOption = defaultOptions[0];
        const component = shallow(<SortComponent options={defaultOptions} defaultOption={defaultOption} />);

        const input = component.find("input").first();

        expect(input.prop("value")).toBe(defaultOption.caption);
    });

    describe("when value changes", () => {
        it("calls updateFilters when value changes", () => {
            const updateSortHandler = jest.fn();
            const component = shallow(<SortComponent options={defaultOptions} updateSort={updateSortHandler} />);

            const input = component.find("input");
            input.simulate("click");

            const item = component.find("li").first();
            item.simulate("click");

            expect(updateSortHandler).toBeCalled();
        });
        it("shows selected option on input value", () => {
            const defaultOption = defaultOptions[1];
            const component = shallow(<SortComponent options={defaultOptions} defaultOption={defaultOption} />);

            const input = component.find("input");
            input.simulate("click");

            expect(component.find("input").first().prop("value")).toBe(defaultOption.caption);

            const item = component.find("li").last(); // [cap 3: val:_3]
            item.simulate("click");

            expect(component.find("input").first().prop("value")).toBe(defaultOptions[2].caption);
        });
    });
});
