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
    it("render correctly", () => {
        const component = render(<BackgroundGradient {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("render with undefined opacity", () => {
        defaultProps = {
            ...defaultProps,
            style: [{ container: {}, opacity: undefined }]
        };
        const component = render(<BackgroundGradient {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("render with undefined angle", () => {
        defaultProps = {
            ...defaultProps,
            style: [{ container: {}, angle: undefined }]
        };
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
    it("should trow error when opacity is not a number", () => {
        defaultProps = {
            ...defaultProps,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            style: [{ container: {}, opacity: "test" }]
        };
        expect(() => render(<BackgroundGradient {...defaultProps} />)).toThrowError();
    });
    it("should trow error when angle is not a number", () => {
        defaultProps = {
            ...defaultProps,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            style: [{ container: {}, angle: "test" }]
        };
        expect(() => render(<BackgroundGradient {...defaultProps} />)).toThrowError();
    });
    it("is should console warn when opacity is not between 0 and 100", () => {
        defaultProps = {
            ...defaultProps,
            style: [{ container: {}, opacity: 101 }]
        };
        const spy = jest.spyOn(console, "warn");
        render(<BackgroundGradient {...defaultProps} />);
        expect(spy).toHaveBeenCalled();
    });
    it("render background gradient with custom style", () => {
        defaultProps = {
            ...defaultProps,
            colorList: [],
            style: [
                {
                    angle: 0,
                    opacity: 100,
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
