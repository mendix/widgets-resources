import { shallow } from "enzyme";
import { createElement } from "react";
import { FilterComponent } from "../FilterComponent";

jest.useFakeTimers();

describe("Filter component", () => {
    it("renders correctly", () => {
        const component = shallow(
            <FilterComponent adjustable defaultFilter="equal" delay={500} filterDispatcher={jest.fn()} />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly when not adjustable by user", () => {
        const component = shallow(
            <FilterComponent adjustable={false} defaultFilter="equal" delay={500} filterDispatcher={jest.fn()} />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with aria labels", () => {
        const component = shallow(
            <FilterComponent
                adjustable
                defaultFilter="equal"
                delay={500}
                filterDispatcher={jest.fn()}
                screenReaderButtonCaption="my label"
                screenReaderInputCaption="my label"
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("calls filterDispatcher when value changes", () => {
        const filterDispatcher = jest.fn();
        const component = shallow(
            <FilterComponent defaultFilter="equal" adjustable delay={500} filterDispatcher={filterDispatcher} />
        );

        const input = component.find("input");
        input.simulate("change", { target: { value: "test" } });

        expect(filterDispatcher).toBeCalled();
    });

    it("debounces calls for filterDispatcher when value changes with numbers", () => {
        const filterDispatcher = jest.fn();
        const component = shallow(
            <FilterComponent defaultFilter="equal" adjustable delay={500} filterDispatcher={filterDispatcher} />
        );

        // Initial call with default filter
        expect(filterDispatcher).toBeCalledTimes(1);

        const input = component.find("input");
        input.simulate("change", { target: { value: "0" } });
        jest.advanceTimersByTime(499);
        input.simulate("change", { target: { value: "1" } });
        input.simulate("change", { target: { value: "2" } });
        jest.advanceTimersByTime(500);

        expect(filterDispatcher).toBeCalledTimes(2);

        input.simulate("change", { target: { value: "3" } });
        jest.advanceTimersByTime(500);

        expect(filterDispatcher).toBeCalledTimes(3);
    });

    it("debounces calls for filterDispatcher when value changes with decimals", () => {
        const filterDispatcher = jest.fn();
        const component = shallow(
            <FilterComponent adjustable defaultFilter="equal" delay={500} filterDispatcher={filterDispatcher} />
        );

        // Initial call with default filter
        expect(filterDispatcher).toBeCalledTimes(1);

        const input = component.find("input");
        input.simulate("change", { target: { value: "0.0" } });
        jest.advanceTimersByTime(499);
        input.simulate("change", { target: { value: "1.7" } });
        input.simulate("change", { target: { value: "4" } });
        jest.advanceTimersByTime(500);

        expect(filterDispatcher).toBeCalledTimes(2);

        input.simulate("change", { target: { value: "6.8" } });
        jest.advanceTimersByTime(500);

        expect(filterDispatcher).toBeCalledTimes(3);
    });

    it("debounces calls for filterDispatcher when value changes with invalid input", () => {
        const filterDispatcher = jest.fn();
        const component = shallow(
            <FilterComponent adjustable defaultFilter="equal" delay={500} filterDispatcher={filterDispatcher} />
        );

        // Initial call with default filter
        expect(filterDispatcher).toBeCalledTimes(1);

        const input = component.find("input");
        input.simulate("change", { target: { value: "test1" } });
        jest.advanceTimersByTime(499);
        input.simulate("change", { target: { value: "test2" } });
        input.simulate("change", { target: { value: "test3" } });
        jest.advanceTimersByTime(500);

        // Consecutive invalid numbers wont call useState with empty value twice
        // this is why we expect func to be called 1 time
        expect(filterDispatcher).toBeCalledTimes(1);

        input.simulate("change", { target: { value: "test4" } });
        jest.advanceTimersByTime(500);

        expect(filterDispatcher).toBeCalledTimes(1);
    });
});
