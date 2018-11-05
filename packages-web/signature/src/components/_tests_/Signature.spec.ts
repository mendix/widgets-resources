import { mount, shallow } from "enzyme";
import { createElement } from "react";

import { Alert } from "../Alert";
import { Signature, SignatureProps } from "../Signature";

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
        widthUnit: "percentage",
        clearPad: false
    };
    const canvasStyle = { width: defaultProps.width, height: defaultProps.height };

    it("renders the structure correctly", () => {
        const canvas = renderCanvas(defaultProps);

        expect(canvas).toBeElement(
            createElement("div", {},
                createElement(Alert, { bootstrapStyle: "danger" }, defaultProps.alertMessage),
                createElement("div", { className: "widget-signature-wrapper", style: canvasStyle },
                    createElement("canvas", {
                        className: "widget-Signature form-control mx-textarea-input mx-textarea signature-grid"
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

        expect(canvas).toBeElement(
            createElement("div", {},
                createElement(Alert, { bootstrapStyle: "danger" }, defaultProps.alertMessage),
                createElement("div", { className: "widget-signature-wrapper", style: canvasStyle },
                    createElement("canvas", {
                        className: "widget-Signature form-control mx-textarea-input mx-textarea signature-grid"
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

        expect(canvas).toBeElement(
            createElement("div", {},
                createElement(Alert, { bootstrapStyle: "danger" }, defaultProps.alertMessage),
                createElement("div", { className: "widget-signature-wrapper", style: canvasStyle },
                    createElement("canvas", {
                        className: "widget-Signature form-control mx-textarea-input mx-textarea signature-grid"
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

        expect(canvas).toBeElement(
            createElement("div", {},
                createElement(Alert, { bootstrapStyle: "danger" }, defaultProps.alertMessage),
                createElement("div", { className: "widget-signature-wrapper", style: canvasStyle },
                    createElement("canvas", {
                        className: "widget-Signature form-control mx-textarea-input mx-textarea signature-grid"
                    })
                ))
        );
    });

    it("renders grid if showGrid is set to true", () => {
        const signaturePad = fullRenderCanvas(defaultProps);
        signaturePad.setProps({
            clearPad: true
        });
        const signaturePadInstance: any = signaturePad.instance();
        signaturePadInstance.canvasNode.height = 500;
        signaturePadInstance.canvasNode.width = 500;

        expect(signaturePad.state("isGridDrawn")).toBe(true);
    });

    it("removes event listeners on unmounting", () => {
        const signaturePad = renderCanvas(defaultProps);
        const signaturePadInstance: any = signaturePad.instance();

        const componentWillUnmount = spyOn(signaturePadInstance, "componentWillUnmount").and.callThrough();
        signaturePad.unmount();

        expect(componentWillUnmount).toHaveBeenCalled();
    });

    it("resizes the canvas on window resize", (done) => {
        const signaturePad = fullRenderCanvas(defaultProps);
        const signatureInstance: any = signaturePad.instance();
        const resizeCanvas = spyOn(signatureInstance, "resizeCanvas").and.callThrough();

        signatureInstance.eventHandle = 1;

        window.dispatchEvent(new Event("resize"));

        setTimeout(() => {
            expect(resizeCanvas).toHaveBeenCalled();
            done();
        }, 1000);
    });
});
