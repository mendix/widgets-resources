import { shallow } from "enzyme";
import { createElement } from "react";
import { DatePicker } from "../DatePicker";

describe("Date picker component", () => {
    it("renders correctly", () => {
        const component = shallow(
            <DatePicker adjustable value={null} setValue={jest.fn()} dateFormat="dd/MM/yyyy" locale="nl-NL" />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly when is not adjustable", () => {
        const component = shallow(
            <DatePicker adjustable={false} value={null} setValue={jest.fn()} dateFormat="dd/MM/yyyy" locale="nl-NL" />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders correctly with different locale and date format", () => {
        const component = shallow(
            <DatePicker adjustable={false} value={null} setValue={jest.fn()} dateFormat="yyyy-MM-dd" locale="pt-BR" />
        );

        expect(component).toMatchSnapshot();
    });

    it("calls for setValue when value changes", () => {
        const setValue = jest.fn();
        const component = shallow(
            <DatePicker adjustable value={null} setValue={setValue} dateFormat="dd/MM/yyyy" locale="nl-NL" />
        );

        component.find("a").simulate("change", { target: { value: "01/12/2020" } });

        expect(setValue).toBeCalledTimes(1);
    });
});
