import { dynamicValue } from "@widgets-resources/piw-utils";
import { Big } from "big.js";
import { createElement } from "react";
import { Text } from "react-native";
import { Bar } from "react-native-progress";
import { render } from "react-native-testing-library";

import { ProgressBar, Props } from "../ProgressBar";

describe("ProgressBar", () => {
    it("renders", () => {
        const component = render(<ProgressBar {...createProps(50, 0, 100)} />);
        expect(component.toJSON()).toMatchSnapshot();
        expect(component.UNSAFE_getByType(Bar).props.progress).toBe(0.5);
    });

    it("renders progress bar with minimum value with undefined values", () => {
        const component = render(<ProgressBar {...createProps()} />);
        expect(component.UNSAFE_getByType(Bar).props.progress).toBe(0);
        expect(component.UNSAFE_queryByType(Text)).toBeDefined();
    });

    it("renders progress bar with minimum value when minimum equals maximum", () => {
        const component = render(<ProgressBar {...createProps(50, 50, 50)} />);
        expect(component.UNSAFE_getByType(Bar).props.progress).toBe(0);
    });

    it("renders progress bar with minimum value when the value is less than the minimum", () => {
        const component = render(<ProgressBar {...createProps(-50, 0, 100)} />);
        expect(component.UNSAFE_getByType(Bar).props.progress).toBe(0);
    });

    it("renders progress bar with max value when the value is greater than maximum", () => {
        const component = render(<ProgressBar {...createProps(150, 0, 100)} />);
        expect(component.UNSAFE_getByType(Bar).props.progress).toBe(1);
    });

    it("renders correct progress with decimal values", () => {
        const component = render(<ProgressBar {...createProps(2.5, 0, 10)} />);
        expect(component.UNSAFE_getByType(Bar).props.progress).toBe(0.25);
        expect(component.UNSAFE_queryByType(Text)).toBeNull();
    });

    it("renders correct progress with negative values", () => {
        const component = render(<ProgressBar {...createProps(-30, -100, 0)} />);
        expect(component.UNSAFE_getByType(Bar).props.progress).toBe(0.7);
        expect(component.UNSAFE_queryByType(Text)).toBeNull();
    });
});

function createProps(progressValue?: number, minimumValue?: number, maximumValue?: number): Props {
    return {
        name: "progress-bar-test",
        style: [],
        progressValue: dynamicValue(progressValue != null ? new Big(progressValue) : undefined),
        minimumValue: dynamicValue(minimumValue != null ? new Big(minimumValue) : undefined),
        maximumValue: dynamicValue(maximumValue != null ? new Big(maximumValue) : undefined)
    };
}
