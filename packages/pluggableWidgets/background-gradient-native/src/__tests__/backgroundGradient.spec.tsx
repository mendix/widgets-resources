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
            colorList: [
                { color: "#fff", offset: Big(0) },
                { color: "#000", offset: Big(1) }
            ],
            content: <Text>Test</Text>,
            name: "test",
            style: []
        };
    });
    it("render background gradient correctly", () => {
        const component = render(<BackgroundGradient {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("should throw error when colorList is empty", () => {
        defaultProps = {
            ...defaultProps,
            colorList: []
        };
        expect(() => render(<BackgroundGradient {...defaultProps} />)).toThrowError();
    });
    it("render background gradient with custom style", () => {
        defaultProps = {
            ...defaultProps,
            colorList: [],
            style: [
                {
                    container: {},
                    colorList: [
                        { color: "#fff", offset: Big(0) },
                        { color: "#000", offset: Big(1) }
                    ]
                }
            ]
        };
        const component = render(<BackgroundGradient {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("render background gradient with one color", () => {
        defaultProps = {
            ...defaultProps,
            colorList: [{ color: "#fff", offset: Big(0) }]
        };
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
        const pressable = component.getByTestId("test");
        fireEvent.press(pressable);
        expect(actionExecution).toBeCalled();
    });
});
