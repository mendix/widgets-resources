import { actionValue, EditableValueBuilder } from "@mendix/piw-utils-internal";
import { createElement } from "react";
import { Text } from "react-native";
import { fireEvent, render } from "react-native-testing-library";

import { Props, ToggleButtons } from "../ToggleButtons";

describe("ToggleButtons", () => {
    let defaultProps: Props;

    beforeEach(() => {
        defaultProps = {
            name: "toggle-buttons-test",
            style: [],
            enum: new EditableValueBuilder<string>().withUniverse("a", "b").withValue("a").build(),
            editable: "default"
        };
    });

    it("renders", () => {
        const component = render(<ToggleButtons {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders captions", () => {
        const component = render(<ToggleButtons {...defaultProps} />);

        const textComponents = component.UNSAFE_getAllByType(Text);
        expect(textComponents).toHaveLength(2);
        expect(textComponents[0].props.children).toEqual("Formatted a");
        expect(textComponents[1].props.children).toEqual("Formatted b");
    });

    it("renders a validation message", () => {
        const value = new EditableValueBuilder<string>().withUniverse("a", "b").withValidation("Invalid").build();
        const component = render(<ToggleButtons {...defaultProps} enum={value} />);

        expect(component.getByText("Invalid")).toBeDefined();
    });

    it("sets the value when pressed and executes the on change action", () => {
        const onChangeAction = actionValue();
        const component = render(<ToggleButtons {...defaultProps} onChange={onChangeAction} />);

        fireEvent.press(component.getByText("Formatted b"));

        expect(defaultProps.enum.setValue).toHaveBeenCalledWith("b");
        expect(onChangeAction.execute).toHaveBeenCalledTimes(1);
    });

    it("ignores pressing the active value", () => {
        const onChangeAction = actionValue();
        const component = render(<ToggleButtons {...defaultProps} onChange={onChangeAction} />);

        fireEvent.press(component.getByText("Formatted a"));

        expect(defaultProps.enum.setValue).not.toHaveBeenCalled();
    });

    it("ignores pressing when non editable", () => {
        const readonlyEnum = new EditableValueBuilder<string>()
            .withUniverse("a", "b")
            .withValue("a")
            .isReadOnly()
            .build();
        const component = render(<ToggleButtons {...defaultProps} enum={readonlyEnum} editable={"never"} />);

        fireEvent.press(component.getByText("Formatted b"));

        expect(defaultProps.enum.setValue).not.toHaveBeenCalled();
    });
});
