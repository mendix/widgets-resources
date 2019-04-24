import { actionValue, EditableValueBuilder } from "@native-components/util-widgets/test";
import { createElement } from "react";
import { RNCameraProps } from "react-native-camera";
import { render, RenderAPI } from "react-native-testing-library";

import { BarcodeScanner, Props } from "../BarcodeScanner";
import { RNCamera } from "./__mocks__/RNCamera";

jest.mock("react-native-camera", () => require.requireActual("./__mocks__/RNCamera"));

describe("BarcodeScanner", () => {
    let defaultProps: Props;

    beforeEach(() => {
        defaultProps = {
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
    const RNCameraInstance = component.getByType(RNCamera);
    const instanceProps: RNCameraProps = RNCameraInstance.props;

    instanceProps.onBarCodeRead!({
        data: barcode,
        type: "qr",
        bounds: [{ x: "", y: "" }, { x: "", y: "" }]
    });
}
