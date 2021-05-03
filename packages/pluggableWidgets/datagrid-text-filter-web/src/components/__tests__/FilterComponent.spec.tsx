import { shallow } from "enzyme";
import { createElement } from "react";
import { FilterComponent } from "../FilterComponent";

jest.useFakeTimers();

describe("Filter component", () => {
    it("renders correctly", () => {
        const component = shallow(
            <FilterComponent adjustable defaultFilter="contains" delay={500} filterDispatcher={jest.fn()} />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly when not adjustable by user", () => {
        const component = shallow(
            <FilterComponent adjustable={false} defaultFilter="contains" delay={500} filterDispatcher={jest.fn()} />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with aria labels", () => {
        const component = shallow(
            <FilterComponent
                adjustable
                screenReaderButtonCaption="my label"
                screenReaderInputCaption="my label"
                defaultFilter="contains"
                delay={500}
                filterDispatcher={jest.fn()}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("calls filterDispatcher when value changes", () => {
        const filterDispatcher = jest.fn();
        const component = shallow(
            <FilterComponent adjustable defaultFilter="contains" delay={500} filterDispatcher={filterDispatcher} />
        );

        const input = component.find("input");
        input.simulate("change", { target: { value: "test" } });

        expect(filterDispatcher).toBeCalled();
    });

    it("debounces calls for filterDispatcher when value changes", () => {
        const filterDispatcher = jest.fn();
        const component = shallow(
            <FilterComponent adjustable defaultFilter="contains" delay={500} filterDispatcher={filterDispatcher} />
        );

        // Initial call with default filter
        expect(filterDispatcher).toBeCalledTimes(1);

        const input = component.find("input");
        input.simulate("change", { target: { value: "test" } });
        jest.advanceTimersByTime(499);
        input.simulate("change", { target: { value: "test2" } });
        input.simulate("change", { target: { value: "test3" } });
        jest.advanceTimersByTime(500);

        expect(filterDispatcher).toBeCalledTimes(2);

        input.simulate("change", { target: { value: "test" } });
        jest.advanceTimersByTime(500);

        expect(filterDispatcher).toBeCalledTimes(3);
    });
});
