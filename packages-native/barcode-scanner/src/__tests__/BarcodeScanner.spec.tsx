import { actionValue, EditableValueBuilder } from "@native-mobile-resources/util-widgets";
import { createElement } from "react";
import { fireEvent, render, RenderAPI } from "react-native-testing-library";

import { BarcodeScanner, Props } from "../BarcodeScanner";
import { RNCamera } from "./__mocks__/RNCamera";

jest.mock("react-native-camera", () => require.requireActual("./__mocks__/RNCamera"));

describe("BarcodeScanner", () => {
    let defaultProps: Props;

    beforeEach(() => {
        defaultProps = {
            name: "barcode-scanner-test",
            style: [],
            barcode: new EditableValueBuilder<string>().build()
        };
    });

    it("renders", () => {
        const component = render(<BarcodeScanner {...defaultProps} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("sets a value and executes the on detect action when a new barcode is scanned", () => {
        const onDetectAction = actionValue();
        const component = render(<BarcodeScanner {...defaultProps} onDetect={onDetectAction} />);

        detectBarcode(component, "value");

        expect(defaultProps.barcode.setValue).toHaveBeenCalledWith("value");
        expect(onDetectAction.execute).toHaveBeenCalledTimes(1);

        detectBarcode(component, "value2");
        detectBarcode(component, "value2");
        detectBarcode(component, "value2");

        expect(defaultProps.barcode.setValue).toHaveBeenCalledWith("value2");
        expect(onDetectAction.execute).toHaveBeenCalledTimes(2);
    });
});

function detectBarcode(component: RenderAPI, barcode: string): void {
    fireEvent(component.getByType(RNCamera), "barCodeRead", {
        data: barcode,
        type: "qr",
        bounds: [{ x: "", y: "" }, { x: "", y: "" }]
    });
}
