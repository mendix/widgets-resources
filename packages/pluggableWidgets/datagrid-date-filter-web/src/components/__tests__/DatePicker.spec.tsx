import { render, shallow } from "enzyme";
import { createElement } from "react";
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
        const component = render(
            <DatePicker adjustable value={null} setValue={jest.fn()} dateFormat="dd/MM/yyyy" locale="nl-NL" />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly when is not adjustable", () => {
        const component = render(
            <DatePicker adjustable={false} value={null} setValue={jest.fn()} dateFormat="dd/MM/yyyy" locale="nl-NL" />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with different locale and date format", () => {
        const component = render(
            <DatePicker adjustable={false} value={null} setValue={jest.fn()} dateFormat="yyyy-MM-dd" locale="pt-BR" />
        );

        expect(component).toMatchSnapshot();
    });

    it("calls for setValue when value changes", () => {
        const setValue = jest.fn();
        const component = shallow(
            <DatePicker adjustable value={null} setValue={setValue} dateFormat="dd/MM/yyyy" locale="nl-NL" />
        );

        component.find("r").simulate("change", { target: { value: "01/12/2020" } });

        expect(setValue).toBeCalledTimes(1);
    });
});
