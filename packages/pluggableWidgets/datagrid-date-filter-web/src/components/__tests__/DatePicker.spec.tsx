import { createElement } from "react";
import { render as renderEnzyme } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import { DatePicker } from "../DatePicker";
import ReactDOM from "react-dom";
import { doubleMonthOrDayWhenSingle } from "../../utils/utils";

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
            <DatePicker adjustable setValue={jest.fn()} dateFormat="dd/MM/yyyy" locale="nl-NL" />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly when is not adjustable", () => {
        const component = renderEnzyme(
            <DatePicker adjustable={false} setValue={jest.fn()} dateFormat="dd/MM/yyyy" locale="nl-NL" />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with different locale and date format", () => {
        const component = renderEnzyme(
            <DatePicker adjustable={false} setValue={jest.fn()} dateFormat="yyyy-MM-dd" locale="pt-BR" />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with a11y properties", () => {
        const component = renderEnzyme(
            <DatePicker
                adjustable
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
                setValue={setValue}
                dateFormat="dd/MM/yyyy"
                locale="nl-NL"
                placeholder="Placeholder"
            />
        );

        fireEvent.change(component.getByPlaceholderText("Placeholder"), { target: { value: "01/12/2020" } });

        expect(setValue).toBeCalledTimes(1);
    });

    it("calls for setRangeValues when value changes", async () => {
        const setRangeValues = jest.fn();
        const component = render(
            <DatePicker
                adjustable
                setValue={jest.fn()}
                setRangeValues={setRangeValues}
                dateFormat="dd/MM/yyyy"
                enableRange
                locale="nl-NL"
                placeholder="Placeholder"
            />
        );

        fireEvent.change(component.getByPlaceholderText("Placeholder"), {
            // Trick to trigger events (Should be dd/MM/yyyy - dd/MM/yyyy) but the library does not validate values coming from the input. That's why it is readonly when running on the browser.
            target: { value: "01/12/2020" }
        });
        expect(setRangeValues).toBeCalledTimes(1);
    });

    test.each([
        ["d/m/yyyy", "dd/m/yyyy"],
        ["dd/m/yyyy", "dd/m/yyyy"],
        ["d/MM/yyyy", "dd/MM/yyyy"],
        ["d-m-yyyy", "dd-m-yyyy"],
        ["d-mm-yyyy", "dd-mm-yyyy"],
        ["d-M-yyyy", "dd-MM-yyyy"],
        ["d-MM-yyyy", "dd-MM-yyyy"],
        ["dd-m-yyyy", "dd-m-yyyy"],
        ["dd-mm-yyyy", "dd-mm-yyyy"],
        ["dd-M-yyyy", "dd-MM-yyyy"],
        ["dd-MM-yyyy", "dd-MM-yyyy"],
        ["dd/MM/yyyy", "dd/MM/yyyy"],
        ["d/MM/yyyy", "dd/MM/yyyy"],
        ["d/M/yyyy", "dd/MM/yyyy"],
        ["dd/M/yyyy", "dd/MM/yyyy"],
        ["dd/m/yyyy", "dd/m/yyyy"],
        ["dd/mm/yyyy", "dd/mm/yyyy"],
        ["yyyy-MM-dd", "yyyy-MM-dd"],
        ["yyyy-MM-d", "yyyy-MM-dd"],
        ["yyyy-m-d", "yyyy-m-dd"],
        ["yyyy-mm-dd", "yyyy-mm-dd"],
        ["yyyy-mm-d", "yyyy-mm-dd"],
        ["yyyy.MM.dd", "yyyy.MM.dd"],
        ["yyyy.M.d", "yyyy.MM.dd"],
        ["yyyy.MM.d", "yyyy.MM.dd"],
        ["yyyy.m.dd", "yyyy.m.dd"],
        ["yyyy.M.dd", "yyyy.MM.dd"],
        ["yyyy.mm.dd", "yyyy.mm.dd"],
        ["yyyy.mm.d", "yyyy.mm.dd"],
        ["yyyyMMdd", "yyyyMMdd"],
        ["yyyyMdd", "yyyyMMdd"],
        ["dMMyyyy", "ddMMyyyy"],
        ["ddMMyyyy", "ddMMyyyy"],
        ["ddMyyyy", "ddMMyyyy"]
    ])("expect for input %p output to be %p", (input, expected) => {
        expect(doubleMonthOrDayWhenSingle(input)).toStrictEqual(expected);
    });
});
