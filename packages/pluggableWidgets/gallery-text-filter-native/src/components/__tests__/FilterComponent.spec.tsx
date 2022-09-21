import { createElement } from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FilterComponent, { FilterComponentProps } from "../FilterComponent";
import { defaultGalleryTextFilterStyle } from "../../ui/Styles";

const defaultProps: FilterComponentProps = {
    delay: 500,
    name: "test",
    styles: defaultGalleryTextFilterStyle
};

jest.useFakeTimers();

describe("Filter component", () => {
    it("renders correctly", () => {
        const component = render(<FilterComponent {...defaultProps} />);
        expect(component).toMatchSnapshot();
    });

    it("calls updateFilters when value changes", () => {
        const updateFiltersHandler = jest.fn();
        const component = render(<FilterComponent {...defaultProps} updateFilters={updateFiltersHandler} />);

        const input = component.getByTestId(`${defaultProps.name}-text-input`);
        fireEvent.changeText(input, "test");
        jest.advanceTimersByTime(500);

        expect(updateFiltersHandler).toHaveBeenCalledWith("test");
    });

    it("debounces calls for updateFilters when value changes", () => {
        const updateFiltersHandler = jest.fn();
        const component = render(<FilterComponent {...defaultProps} updateFilters={updateFiltersHandler} />);

        // Initial call with default filter
        expect(updateFiltersHandler).toBeCalledTimes(1);

        const input = component.getByTestId(`${defaultProps.name}-text-input`);
        fireEvent.changeText(input, "test");
        jest.advanceTimersByTime(499);
        fireEvent.changeText(input, "test2");
        fireEvent.changeText(input, "test3");
        jest.advanceTimersByTime(500);

        expect(updateFiltersHandler).toBeCalledTimes(2);

        fireEvent.changeText(input, "test");
        jest.advanceTimersByTime(500);

        expect(updateFiltersHandler).toBeCalledTimes(3);
    });

    it("clear input value when press the clear text button", () => {
        const component = render(<FilterComponent {...defaultProps} />);
        const input = component.getByTestId(`${defaultProps.name}-text-input`);
        fireEvent.changeText(input, "test");
        jest.advanceTimersByTime(500);
        expect(input.props.value).toBe("test");
        const clearButton = component.getByTestId(`${defaultProps.name}-clear-text-button`);
        fireEvent.press(clearButton);
        expect(input.props.value).toBe("");
    });
});
