import { dynamicValue } from "@native-mobile-resources/util-widgets";
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
        expect(component.getByType(Circle).props.progress).toBe(0.5);
    });

    it("renders no progress with undefined values", () => {
        const component = render(<ProgressCircle {...createProps()} circleText="none" />);
        expect(component.getByType(Circle).props.progress).toBe(0);
        expect(component.queryByType(Text)).toBeNull();
    });

    it("renders no progress and an error when minimum equals maxiumum", () => {
        const component = render(<ProgressCircle {...createProps(50, 50, 50)} circleText="none" />);
        expect(component.getByType(Circle).props.progress).toBe(0);
        expect(component.getByType(Text).props.children).toBe(
            "The minimum value must be equal or less than the maximum value."
        );
    });

    it("renders no progress and an error when the value is less than the minium", () => {
        const component = render(<ProgressCircle {...createProps(-50, 0, 100)} circleText="none" />);
        expect(component.getByType(Circle).props.progress).toBe(0);
        expect(component.getByType(Text).props.children).toBe(
            "The current value must be equal or greater than the minimum value."
        );
    });

    it("renders no progress and an error when the value is greater than the maximum", () => {
        const component = render(<ProgressCircle {...createProps(150, 0, 100)} circleText="none" />);
        expect(component.getByType(Circle).props.progress).toBe(0);
        expect(component.getByType(Text).props.children).toBe(
            "The current value must be equal or less than the maximum value."
        );
    });

    it("renders correct progress with decimal values", () => {
        const component = render(<ProgressCircle {...createProps(2.5, 0, 10)} />);
        expect(component.getByType(Circle).props.progress).toBe(0.25);
    });

    it("renders correct progress with negative values", () => {
        const component = render(<ProgressCircle {...createProps(-30, -100, 0)} />);
        expect(component.getByType(Circle).props.progress).toBe(0.7);
    });

    it("renders custom text", () => {
        const component = render(
            <ProgressCircle
                {...createProps(50, 0, 100)}
                circleText={"customText"}
                customText={dynamicValue(false, "Custom")}
            />
        );
        expect(component.getByType(Text).props.children).toBe("Custom");
    });

    it("renders empty custom text", () => {
        const component = render(
            <ProgressCircle
                {...createProps(50, 0, 100)}
                circleText={"customText"}
                customText={dynamicValue<string>(true)}
            />
        );
        expect(component.getByType(Text).props.children).toBe("");
    });

    it("renders no text", () => {
        const component = render(<ProgressCircle {...createProps(50, 0, 100)} circleText={"none"} />);
        expect(component.queryByType(Text)).toBeNull();
    });
});

function createProps(progressValue?: number, minimumValue?: number, maximumValue?: number): Props {
    return {
        name: "progress-circle-test",
        style: [],
        circleText: "percentage",
        progressValue: progressValue != null ? dynamicValue(false, new Big(progressValue)) : dynamicValue<Big>(true),
        minimumValue: minimumValue != null ? dynamicValue(false, new Big(minimumValue)) : dynamicValue<Big>(true),
        maximumValue: maximumValue != null ? dynamicValue(false, new Big(maximumValue)) : dynamicValue<Big>(true)
    };
}
