import { shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";

import { Signature, SignatureProps } from "../Signature";

describe("Signature", () => {
    const renderCanvas = (props: SignatureProps): ShallowWrapper<SignatureProps, any> =>
        shallow(createElement(Signature, props));

    const defaultProps: SignatureProps = {
        heightUnit: "percentageOfWidth",
        height: 50,
        widthUnit: "percentage",
        width: 100,
        className: "custom-class",
        gridCellWidth: 50,
        gridCellHeight: 50,
        gridBorderColor: "#777",
        gridBorderWidth: 1,
        penType: "fountain",
        penColor: "#000",
        showGrid: true,
        alertMessage: "",
        readOnly: false,
        clearSignature: false,
        wrapperStyle: {}
    };

    it("renders the structure correctly", () => {
        const canvas = renderCanvas(defaultProps);

        expect(canvas).toMatchSnapshot();
    });

    it("renders the signature pad with options", () => {
        const canvas = renderCanvas(defaultProps);
        canvas.setProps({
            clearSignature: true,
            readOnly: true
        });
        const canvasInstance: any = canvas.instance();
        canvasInstance.canvasNode = document.createElement("canvas");
        const signaturePadOptions = spyOn(canvasInstance, "signaturePadOptions").and.callThrough();
        canvasInstance.componentDidMount();
        expect(signaturePadOptions).toHaveBeenCalled();
    });
});
