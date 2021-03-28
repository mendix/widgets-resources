import { dynamicValue } from "@mendix/piw-utils-internal";
import { Big } from "big.js";
import { createElement } from "react";
import { Text } from "react-native";
import { Circle } from "react-native-progress";
import { render } from "react-native-testing-library";

import { ProgressCircle, Props } from "../ProgressCircle";

describe("ProgressCircle", () => {
    it("renders", () => {
        const component = render(<ProgressCircle {...createProps(50, 0, 100)} />);
        expect(component.toJSON()).toMatchSnapshot();
        expect(component.UNSAFE_getByType(Circle).props.progress).toBe(0.5);
    });

    it("renders no progress with undefined values", () => {
        const component = render(<ProgressCircle {...createProps()} circleText="none" />);
        expect(component.UNSAFE_getByType(Circle).props.progress).toBe(0);
        expect(component.UNSAFE_getByType(Text).props.children).toBe(
            `No minimum value provided.
No maximum value provided.
No current value provided.`
        );
    });

    it("renders no progress and an error when minimum equals maximum", () => {
        const component = render(<ProgressCircle {...createProps(50, 50, 50)} circleText="none" />);
        expect(component.UNSAFE_getByType(Circle).props.progress).toBe(0);
        expect(component.UNSAFE_getByType(Text).props.children).toBe(
            "The minimum value must be equal or less than the maximum value."
        );
    });

    it("renders no progress and an error when the value is less than the minimum", () => {
        const component = render(<ProgressCircle {...createProps(-50, 0, 100)} circleText="none" />);
        expect(component.UNSAFE_getByType(Circle).props.progress).toBe(0);
        expect(component.UNSAFE_getByType(Text).props.children).toBe(
            "The current value must be equal or greater than the minimum value."
        );
    });

    it("renders no progress and an error when the value is greater than the maximum", () => {
        const component = render(<ProgressCircle {...createProps(150, 0, 100)} circleText="none" />);
        expect(component.UNSAFE_getByType(Circle).props.progress).toBe(0);
        expect(component.UNSAFE_getByType(Text).props.children).toBe(
            "The current value must be equal or less than the maximum value."
        );
    });

    it("renders correct progress with decimal values", () => {
        const component = render(<ProgressCircle {...createProps(2.5, 0, 10)} />);
        expect(component.UNSAFE_getByType(Circle).props.progress).toBe(0.25);
    });

    it("renders correct progress with negative values", () => {
        const component = render(<ProgressCircle {...createProps(-30, -100, 0)} />);
        expect(component.UNSAFE_getByType(Circle).props.progress).toBe(0.7);
    });

    it("renders custom text", () => {
        const component = render(
            <ProgressCircle
                {...createProps(50, 0, 100)}
                circleText={"customText"}
                customText={dynamicValue("Custom")}
            />
        );
        expect(component.UNSAFE_getByType(Text).props.children).toBe("Custom");
    });

    it("renders empty custom text", () => {
        const component = render(
            <ProgressCircle {...createProps(50, 0, 100)} circleText={"customText"} customText={dynamicValue()} />
        );
        expect(component.UNSAFE_getByType(Text).props.children).toBe("");
    });

    it("renders no text", () => {
        const component = render(<ProgressCircle {...createProps(50, 0, 100)} circleText={"none"} />);
        expect(component.UNSAFE_queryByType(Text)).toBeNull();
    });
});

function createProps(progressValue?: number, minimumValue?: number, maximumValue?: number): Props {
    return {
        name: "progress-circle-test",
        style: [],
        circleText: "percentage",
        progressValue: dynamicValue(progressValue != null ? new Big(progressValue) : undefined),
        minimumValue: dynamicValue(minimumValue != null ? new Big(minimumValue) : undefined),
        maximumValue: dynamicValue(maximumValue != null ? new Big(maximumValue) : undefined)
    };
}
