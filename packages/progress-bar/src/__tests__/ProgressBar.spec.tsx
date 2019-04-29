import { dynamicValue } from "@native-mobile-resources/util-widgets/test";
import { Big } from "big.js";
import { createElement } from "react";
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
    });

    it("renders no progress when min and max are the same", () => {
        const component = render(<ProgressBar {...createProps(50, 50, 50)} />);
        expect(component.getByType(Bar).props.progress).toBe(0);
    });

    it("renders correct progress with decimal values", () => {
        const component = render(<ProgressBar {...createProps(2.5, 0, 10)} />);
        expect(component.getByType(Bar).props.progress).toBe(0.25);
    });

    it("renders correct progress with negative values", () => {
        const component = render(<ProgressBar {...createProps(-30, -100, 0)} />);
        expect(component.getByType(Bar).props.progress).toBe(0.7);
    });
});

function createProps(progressValue?: number, minimumValue?: number, maximumValue?: number): Props {
    return {
        style: [],
        progressValue: dynamicValue(progressValue != null ? new Big(progressValue) : undefined),
        minimumValue: dynamicValue(minimumValue != null ? new Big(minimumValue) : undefined),
        maximumValue: dynamicValue(maximumValue != null ? new Big(maximumValue) : undefined)
    };
}
