import { createElement } from "react";
import { render as renderEnzyme } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import { DatePicker } from "../DatePicker";
import ReactDOM from "react-dom";

describe("Date picker component", () => {
    beforeAll(() => {
        jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);

        // @ts-ignore
        jest.spyOn(ReactDOM, "createPortal").mockReturnValue((element, node) => {
            return element;
        });
    });

    it("renders correctly", () => {
        const component = renderEnzyme(
            <DatePicker adjustable value={null} setValue={jest.fn()} dateFormat="dd/MM/yyyy" locale="nl-NL" />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly when is not adjustable", () => {
        const component = renderEnzyme(
            <DatePicker adjustable={false} value={null} setValue={jest.fn()} dateFormat="dd/MM/yyyy" locale="nl-NL" />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with different locale and date format", () => {
        const component = renderEnzyme(
            <DatePicker adjustable={false} value={null} setValue={jest.fn()} dateFormat="yyyy-MM-dd" locale="pt-BR" />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with a11y properties", () => {
        const component = renderEnzyme(
            <DatePicker
                adjustable
                value={null}
                setValue={jest.fn()}
                dateFormat="yyyy-MM-dd"
                locale="pt-BR"
                screenReaderInputCaption="my input"
                screenReaderCalendarCaption="my calendar"
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("calls for setValue when value changes", async () => {
        const setValue = jest.fn();
        const component = render(
            <DatePicker
                adjustable
                value={null}
                setValue={setValue}
                dateFormat="dd/MM/yyyy"
                locale="nl-NL"
                placeholder="Placeholder"
            />
        );

        fireEvent.change(component.getByPlaceholderText("Placeholder"), { target: { value: "01/12/2020" } });

        expect(setValue).toBeCalledTimes(1);
    });
});
