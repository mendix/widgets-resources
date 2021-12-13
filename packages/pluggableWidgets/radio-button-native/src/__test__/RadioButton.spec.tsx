import { createElement } from "react";
import { Text } from "react-native";
import { EditableValueBuilder, actionValue } from "@mendix/piw-utils-internal";
import { render, fireEvent } from "@testing-library/react-native";

import { RadioButton, Props } from "../RadioButton";
import { defaultRadioButtonStyle } from "../ui/Styles";

const name = "radioButton1";
const createProps = (props?: Partial<Props>): Props => {
    const style = props?.style ?? {};
    const defaultProps: Props = {
        name,
        style: [{ ...defaultRadioButtonStyle, ...style }],
        orientation: "vertical",
        enum: new EditableValueBuilder<string>().withUniverse("a", "b").withValue("a").build()
    };

    return { ...defaultProps, ...props };
};

describe("RadioButton", () => {
    it("renders with default styles", () => {
        const props = createProps();
        const component = render(<RadioButton {...props} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders captions", () => {
        const props = createProps();
        const component = render(<RadioButton {...props} />);

        const textComponents = component.UNSAFE_getAllByType(Text);
        expect(textComponents).toHaveLength(2);
        expect(textComponents[0].props.children).toEqual("Formatted a");
        expect(textComponents[1].props.children).toEqual("Formatted b");
    });

    it("renders vertical", () => {
        const props = createProps({
            orientation: "vertical"
        });

        const component = render(<RadioButton {...props} />);

        expect(component.getByTestId(`${name}$wrapper`).props.style).toEqual(
            expect.arrayContaining([expect.objectContaining({ flexDirection: "column" })])
        );
    });

    it("renders horizontal", () => {
        const props = createProps({
            orientation: "horizontal"
        });

        const component = render(<RadioButton {...props} />);

        expect(component.getByTestId(`${name}$wrapper`).props.style).toEqual(
            expect.arrayContaining([expect.objectContaining({ flexDirection: "row" })])
        );
    });

    it("ignores pressing the active value", () => {
        const props = createProps({
            onChangeAction: actionValue()
        });
        const component = render(<RadioButton {...props} />);

        fireEvent.press(component.getByText("Formatted a"));

        expect(props.enum.setValue).not.toHaveBeenCalled();
    });

    it("ignores pressing when non editable", () => {
        const props = createProps({
            enum: new EditableValueBuilder<string>().withUniverse("a", "b").withValue("a").isReadOnly().build()
        });

        const component = render(<RadioButton {...props} />);

        fireEvent.press(component.getByText("Formatted b"));

        expect(props.enum.setValue).not.toHaveBeenCalled();
    });

    it("ignores pressing when not available", () => {
        const props = createProps({
            enum: new EditableValueBuilder<string>().withUniverse("a", "b").withValue("a").isUnavailable().build()
        });

        const component = render(<RadioButton {...props} />);

        fireEvent.press(component.getByText("Formatted b"));

        expect(props.enum.setValue).not.toHaveBeenCalled();
    });

    it("sets the value when pressed and executes the on change action", () => {
        const props = createProps({
            onChangeAction: actionValue()
        });

        const component = render(<RadioButton {...props} />);

        fireEvent.press(component.getByText("Formatted b"));

        expect(props.enum.setValue).toHaveBeenCalledWith("b");
        expect(props.onChangeAction?.execute).toHaveBeenCalledTimes(1);
    });
});
