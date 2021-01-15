import { actionValue, EditableValueBuilder } from "@widgets-resources/piw-utils";
import { createElement } from "react";
import { fireEvent, render, RenderAPI } from "react-native-testing-library";

import { BarcodeScanner, Props, throttle } from "../BarcodeScanner";
import { RNCamera } from "./__mocks__/RNCamera";

jest.mock("react-native-camera", () => jest.requireActual("./__mocks__/RNCamera"));

jest.useFakeTimers();

describe("BarcodeScanner", () => {
    let defaultProps: Props;

    beforeEach(() => {
        defaultProps = {
            showAnimatedLine: false,
            showMask: false,
            name: "barcode-scanner-test",
            style: [],
            barcode: new EditableValueBuilder<string>().build()
        };
    });

    it("renders", () => {
        const component = render(<BarcodeScanner {...defaultProps} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with mask", () => {
        const component = render(<BarcodeScanner {...defaultProps} showMask />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with mask with animated line", () => {
        const component = render(<BarcodeScanner {...defaultProps} showMask showAnimatedLine />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("sets a value and executes the on detect action when a new barcode is scanned", async () => {
        const onDetectAction = actionValue();
        const component = render(<BarcodeScanner {...defaultProps} onDetect={onDetectAction} />);

        detectBarcode(component, "value");
        jest.advanceTimersByTime(2000);

        expect(defaultProps.barcode.setValue).toHaveBeenCalledWith("value");
        expect(onDetectAction.execute).toHaveBeenCalledTimes(1);

        detectBarcode(component, "value1");
        jest.advanceTimersByTime(100);
        detectBarcode(component, "value2");
        // Events are not fired immediately by testing-library, so firing with 1999 will be already too late for the previous action
        jest.advanceTimersByTime(1800);
        detectBarcode(component, "value3");

        jest.advanceTimersByTime(2000);

        expect(defaultProps.barcode.setValue).toHaveBeenCalledWith("value1");
        expect(onDetectAction.execute).toHaveBeenCalledTimes(2);

        detectBarcode(component, "value2");
        detectBarcode(component, "value3");
        detectBarcode(component, "value4");

        jest.advanceTimersByTime(2000);

        expect(defaultProps.barcode.setValue).toHaveBeenCalledWith("value2");
        expect(onDetectAction.execute).toHaveBeenCalledTimes(3);
    });

    describe("throttling", () => {
        const func: (...args: any) => void = jest.fn();
        const args = ["argument", { prop: "arguments" }];

        it("should execute function in correct time intervals", () => {
            const throttleFunc = throttle(func, 100);

            throttleFunc(...args);
            expect(func).toHaveBeenCalledTimes(1);
            jest.advanceTimersByTime(100);
            throttleFunc(...args);
            jest.advanceTimersByTime(99);
            throttleFunc(...args);
            throttleFunc(...args);
            expect(func).toHaveBeenCalledTimes(2);
            jest.advanceTimersByTime(100);
            expect(func).toHaveBeenCalledTimes(2);
        });
    });
});

function detectBarcode(component: RenderAPI, barcode: string): void {
    fireEvent(component.UNSAFE_getByType(RNCamera), "barCodeRead", {
        data: barcode,
        type: "qr",
        bounds: [
            { x: "", y: "" },
            { x: "", y: "" }
        ]
    });
}
