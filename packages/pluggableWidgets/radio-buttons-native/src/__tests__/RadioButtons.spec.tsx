import { createElement } from "react";
import { actionValue, EditableValueBuilder } from "@mendix/piw-utils-internal";
import { RadioButtons, props } from "../RadioButtons";
import { fireEvent, render } from "@testing-library/react-native";

const enumValues = ["firstItem", "secondItem"];

function getEnumValueTestId(index: number): string {
    return `radio-button-${enumValues[index]}`;
}

describe("Radio buttons", () => {
    let defaultProps: props;
    beforeEach(() => {
        defaultProps = {
            enum: new EditableValueBuilder<string>()
                .withUniverse(...enumValues)
                .withValue(enumValues[0])
                .build(),
            name: "radio-buttons-test",
            orientation: "vertical",
            style: [],
            onChange: actionValue()
        };
    });
    it("render vertical radio buttons correctly", () => {
        const component = render(<RadioButtons {...defaultProps} orientation="vertical" />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("render horizontal radio buttons correctly", () => {
        const component = render(<RadioButtons {...defaultProps} orientation="horizontal" />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("works correctly without options", () => {
        defaultProps.enum = new EditableValueBuilder<string>().build();
        const component = render(<RadioButtons {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("render disabled radio buttons correctly", () => {
        defaultProps.enum = new EditableValueBuilder<string>()
            .withUniverse(...enumValues)
            .isReadOnly()
            .build();
        const component = render(<RadioButtons {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("call set value when active radio button changes", () => {
        const component = render(<RadioButtons {...defaultProps} />);
        fireEvent.press(component.getByTestId(getEnumValueTestId(1)));
        expect(defaultProps.enum.setValue).toHaveBeenCalledWith(enumValues[1]);
    });
    it("doesn't call set value when active radio button pressed", () => {
        const component = render(<RadioButtons {...defaultProps} />);
        fireEvent.press(component.getByTestId(getEnumValueTestId(0)));
        expect(defaultProps.enum.setValue).not.toHaveBeenCalled();
    });
    it("value changes when not active radio button pressed", () => {
        const component = render(<RadioButtons {...defaultProps} />);
        fireEvent.press(component.getByTestId(getEnumValueTestId(1)));
        expect(defaultProps.enum.value).toBe(enumValues[1]);
    });
    it("on change event triggered when active radio button changes", () => {
        const component = render(<RadioButtons {...defaultProps} />);
        fireEvent.press(component.getByTestId(getEnumValueTestId(1)));
        expect(defaultProps.onChange?.execute).toHaveBeenCalled();
    });
});
