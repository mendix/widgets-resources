import { createElement } from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import Big from "big.js";

import { ActionValue } from "mendix";

import { BackgroundGradient, props } from "../BackgroundGradient";

describe("Background gradient", () => {
    let defaultProps: props;
    beforeEach(() => {
        defaultProps = {
            angle: 0,
            colorList: [
                { color: "#fff", offset: Big(0) },
                { color: "#000", offset: Big(1) }
            ],
            content: <Text>Test</Text>,
            name: "test",
            opacity: Big(1),
            style: []
        };
    });
    it("render background gradient correctly", () => {
        const component = render(<BackgroundGradient {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("call onClick when the container is pressed", () => {
        const actionExecution = jest.fn();
        const action: ActionValue = {
            canExecute: true,
            execute: actionExecution,
            isExecuting: false
        };
        const component = render(<BackgroundGradient {...defaultProps} onClick={action} />);
        const pressable = component.getByTestId("background-gradient-test");
        fireEvent.press(pressable);
        expect(actionExecution).toBeCalled();
    });
});
