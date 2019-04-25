import { dynamicValue } from "@native-components/util-widgets/test";
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
        const component = render(<ProgressCircle {...createProps()} />);
        expect(component.getByType(Circle).props.progress).toBe(0);
    });

    it("renders no progress when min and max are the same", () => {
        const component = render(<ProgressCircle {...createProps(50, 50, 50)} />);
        expect(component.getByType(Circle).props.progress).toBe(0);
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
                customText={dynamicValue("Custom")}
            />
        );
        expect(component.getByType(Text).props.children).toBe("Custom");
    });

    it("renders empty custom text", () => {
        const component = render(
            <ProgressCircle {...createProps(50, 0, 100)} circleText={"customText"} customText={dynamicValue()} />
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
        style: [],
        circleText: "percentage",
        progressValue: dynamicValue(progressValue != null ? new Big(progressValue) : undefined),
        minimumValue: dynamicValue(minimumValue != null ? new Big(minimumValue) : undefined),
        maximumValue: dynamicValue(maximumValue != null ? new Big(maximumValue) : undefined)
    };
}
