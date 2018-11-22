import { mount, shallow } from "enzyme";
import { createElement } from "react";
import ReactResizeDetector from "react-resize-detector";

import { Alert } from "../Alert";
import { Signature, SignatureProps } from "../Signature";
import { SizeContainer } from "../SizeContainer";
import { Grid } from "../Grid";

describe("Signature", () => {
    const renderCanvas = (props: SignatureProps) => shallow(createElement(Signature, props));
    const fullRenderCanvas = (props: SignatureProps) => mount(createElement(Signature, props));

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

        expect(canvas).toBeElement(
            createElement(SizeContainer, {
                ...defaultProps,
                className: "widget-signature custom-class",
                classNameInner: "widget-signature-wrapper form-control mx-textarea-input mx-textarea",
                style: defaultProps.wrapperStyle
            },
                createElement(Alert, { bootstrapStyle: "danger" }, defaultProps.alertMessage),
                createElement(Grid, { ...defaultProps }),
                createElement("canvas", { className: "widget-signature-canvas" }),
                createElement(ReactResizeDetector))
        );
    });

    it("renders the signature pad with options", () => {
        const canvas = fullRenderCanvas(defaultProps);
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
