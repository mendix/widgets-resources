import { dynamicValue } from "@native-mobile-resources/util-widgets";
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
        expect(component.getByType(Bar).props.progress).toBe(0.5);
    });

    it("renders no progress with undefined values", () => {
        const component = render(<ProgressBar {...createProps()} />);
        expect(component.getByType(Bar).props.progress).toBe(0);
        expect(component.queryByType(Text)).toBeNull();
    });

    it("renders no progress and an error when minimum equals maxiumum", () => {
        const component = render(<ProgressBar {...createProps(50, 50, 50)} />);
        expect(component.getByType(Bar).props.progress).toBe(0);
        expect(component.getByType(Text).props.children).toBe(
            "The minimum value must be equal or less than the maximum value."
        );
    });

    it("renders no progress and an error when the value is less than the minium", () => {
        const component = render(<ProgressBar {...createProps(-50, 0, 100)} />);
        expect(component.getByType(Bar).props.progress).toBe(0);
        expect(component.getByType(Text).props.children).toBe(
            "The current value must be equal or greater than the minimum value."
        );
    });

    it("renders no progress and an error when the value is greater than the maximum", () => {
        const component = render(<ProgressBar {...createProps(150, 0, 100)} />);
        expect(component.getByType(Bar).props.progress).toBe(0);
        expect(component.getByType(Text).props.children).toBe(
            "The current value must be equal or less than the maximum value."
        );
    });

    it("renders correct progress with decimal values", () => {
        const component = render(<ProgressBar {...createProps(2.5, 0, 10)} />);
        expect(component.getByType(Bar).props.progress).toBe(0.25);
        expect(component.queryByType(Text)).toBeNull();
    });

    it("renders correct progress with negative values", () => {
        const component = render(<ProgressBar {...createProps(-30, -100, 0)} />);
        expect(component.getByType(Bar).props.progress).toBe(0.7);
        expect(component.queryByType(Text)).toBeNull();
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
