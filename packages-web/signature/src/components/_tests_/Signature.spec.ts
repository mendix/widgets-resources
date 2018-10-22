import { mount, shallow } from "enzyme";
import { createElement } from "react";

import { Alert } from "../Alert";
import { Signature, SignatureProps } from "../Signature";
import classNames = require("classnames");

describe("Siganture", () => {
    const renderCanvas = (props: SignatureProps) => shallow(createElement(Signature, props));
    const fullRenderCanvas = (props: SignatureProps) => mount(createElement(Signature, props));

    const defaultProps: SignatureProps = {
        height: 500,
        width: 500,
        gridColumnSize: 50,
        gridRowSize: 50,
        gridColor: "#777",
        gridBorder: 1,
        penType: "fountain",
        penColor: "#000",
        showGrid: true,
        onSignEndAction: jasmine.any(Function),
        alertMessage: "",
        saveGridToImage: false,
        heightUnit: "pixels",
        widthUnit: "percentage"
    };

    it("renders the structure correctly", () => {
        const canvasStyle = { width: defaultProps.width, height: defaultProps.height };
        const canvas = renderCanvas(defaultProps);

        expect(canvas).toBeElement(
            createElement("div", {},
                createElement(Alert, { bootstrapStyle: "danger" }, defaultProps.alertMessage),
                createElement("div", { className: "widget-signature-wrapper", style: canvasStyle },
                    createElement("canvas", {
                        className: "widget-Signature form-control mx-textarea-input mx-textarea signature-grid"
                    }),
                    createElement("canvas", {
                        className: "widget-Signature signature-capture-grid"
                    }),
                    createElement("canvas", {
                        className: classNames("widget-Signature", "signature-canvas", "disabled")
                    })
                ))
        );
    });

    it("with pixels renders the structure correctly", () => {
        const canvasProps: SignatureProps = {
            ...defaultProps,
            widthUnit: "pixels"
        };
        const canvas = renderCanvas(canvasProps);
        const canvasStyle = { width: defaultProps.width, height: defaultProps.height };

        expect(canvas).toBeElement(
            createElement("div", {},
                createElement(Alert, { bootstrapStyle: "danger" }, defaultProps.alertMessage),
                createElement("div", { className: "widget-signature-wrapper", style: canvasStyle },
                    createElement("canvas", {
                        className: "widget-Signature form-control mx-textarea-input mx-textarea signature-grid"
                    }),
                    createElement("canvas", {
                        className: "widget-Signature signature-capture-grid"
                    }),
                    createElement("canvas", {
                        className: classNames("widget-Signature", "signature-canvas", "disabled")
                    })
                ))
        );
    });

    it("with percentage of parent units renders the structure correctly", () => {
        const canvasProps: SignatureProps = {
            ...defaultProps,
            heightUnit: "percentageOfParent",
            widthUnit: "percentage"
        };
        const canvas = renderCanvas(canvasProps);
        const canvasStyle = { width: defaultProps.width, height: defaultProps.height };

        expect(canvas).toBeElement(
            createElement("div", {},
                createElement(Alert, { bootstrapStyle: "danger" }, defaultProps.alertMessage),
                createElement("div", { className: "widget-signature-wrapper", style: canvasStyle },
                    createElement("canvas", {
                        className: "widget-Signature form-control mx-textarea-input mx-textarea signature-grid"
                    }),
                    createElement("canvas", {
                        className: "widget-Signature signature-capture-grid"
                    }),
                    createElement("canvas", {
                        className: classNames("widget-Signature", "signature-canvas", "disabled")
                    })
                ))
        );
    });

    it("with percentage of width and height units renders the structure correctly", () => {
        const canvasProps: SignatureProps = {
            ...defaultProps,
            heightUnit: "percentageOfWidth",
            widthUnit: "percentage"
        };
        const canvas = renderCanvas(canvasProps);
        const canvasStyle = { width: defaultProps.width, height: defaultProps.height };

        expect(canvas).toBeElement(
            createElement("div", {},
                createElement(Alert, { bootstrapStyle: "danger" }, defaultProps.alertMessage),
                createElement("div", { className: "widget-signature-wrapper", style: canvasStyle },
                    createElement("canvas", {
                        className: "widget-Signature form-control mx-textarea-input mx-textarea signature-grid"
                    }),
                    createElement("canvas", {
                        className: "widget-Signature signature-capture-grid"
                    }),
                    createElement("canvas", {
                        className: classNames("widget-Signature", "signature-canvas", "disabled")
                    })
                ))
        );
    });

    it("renders grid if showGrid set", () => {
        const signaturePad = fullRenderCanvas(defaultProps);
        signaturePad.setProps({
            clearPad: true
        });
        const signaturePadInstance: any = signaturePad.instance();
        signaturePadInstance.canvasNode.height = 500;
        signaturePadInstance.canvasNode.width = 500;
        const drawGrid = spyOn(signaturePadInstance, "drawGrid").and.callThrough();
        signaturePadInstance.componentDidUpdate();

        expect(drawGrid).toHaveBeenCalled();
    });

    it("removes event listeners on unmounting", () => {
        const signaturePad = renderCanvas(defaultProps);
        const signaturePadInstance: any = signaturePad.instance();

        const componentWillUnmount = spyOn(signaturePadInstance, "componentWillUnmount").and.callThrough();
        signaturePad.unmount();

        expect(componentWillUnmount).toHaveBeenCalled();
    });

    xit("handles sign end action after user signing", () => {
        const signaturePad = renderCanvas(defaultProps);

        const signatureInstance: any = signaturePad.instance();
        const handleSignEnd = spyOn(signatureInstance, "handleSignEnd").and.callThrough();

        signaturePad.simulate("dblclick");

        expect(handleSignEnd).toHaveBeenCalled();
        dispatchEvent(event);
    });

    it("resizes the canvas on window resize", () => {
        const signaturePad = renderCanvas(defaultProps);
        const signatureInstance: any = signaturePad.instance();
        const resizeCanvas = spyOn(signatureInstance, "resizeCanvas").and.callThrough();

        signatureInstance.eventHandle = 1;
        signatureInstance.canvasNode = {
            parentElement: document.createElement("div") as any,
            getContext: document.createElement("canvas").getContext("2d") as any
        };

        window.dispatchEvent(new Event("resize"));

        setTimeout(() => {
            expect(resizeCanvas).toHaveBeenCalled();
        }, 1000);
    });
});
