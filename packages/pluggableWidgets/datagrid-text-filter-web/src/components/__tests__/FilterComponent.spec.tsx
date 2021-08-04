import { render, shallow } from "enzyme";
import { createElement } from "react";
import { FilterComponent } from "../FilterComponent";

jest.useFakeTimers();

describe("Filter component", () => {
    it("renders correctly", () => {
        const component = render(<FilterComponent adjustable defaultFilter="contains" delay={500} />);

        expect(component).toMatchSnapshot();
    });

    it("renders correctly when not adjustable by user", () => {
        const component = render(<FilterComponent adjustable={false} defaultFilter="contains" delay={500} />);

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with aria labels", () => {
        const component = render(
            <FilterComponent
                adjustable
                screenReaderButtonCaption="my label"
                screenReaderInputCaption="my label"
                defaultFilter="contains"
                delay={500}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("calls updateFilters when value changes", () => {
        const updateFiltersHandler = jest.fn();
        const component = shallow(
            <FilterComponent adjustable defaultFilter="contains" delay={500} updateFilters={updateFiltersHandler} />
        );

        const input = component.find("input");
        input.simulate("change", { target: { value: "test" } });

        expect(updateFiltersHandler).toBeCalled();
    });

    it("debounces calls for updateFilters when value changes", () => {
        const updateFiltersHandler = jest.fn();
        const component = shallow(
            <FilterComponent adjustable defaultFilter="contains" delay={500} updateFilters={updateFiltersHandler} />
        );

        // Initial call with default filter
        expect(updateFiltersHandler).toBeCalledTimes(1);

        const input = component.find("input");
        input.simulate("change", { target: { value: "test" } });
        jest.advanceTimersByTime(499);
        input.simulate("change", { target: { value: "test2" } });
        input.simulate("change", { target: { value: "test3" } });
        jest.advanceTimersByTime(500);

        expect(updateFiltersHandler).toBeCalledTimes(2);

        input.simulate("change", { target: { value: "test" } });
        jest.advanceTimersByTime(500);

        expect(updateFiltersHandler).toBeCalledTimes(3);
    });
});
