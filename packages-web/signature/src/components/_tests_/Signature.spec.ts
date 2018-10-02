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
        gridx: 50,
        gridy: 50,
        gridColor: "#777",
        gridBorder: 1,
        penColor: "#000",
        maxLineWidth: 2.5,
        minLineWidth: 0.5,
        timeout: 3000,
        velocityFilterWeight: 0.7,
        showGrid: true,
        onSignEndAction: jasmine.any(Function),
        alertMessage: "",
        widthUnit: "percentage"
    };

    it("renders the structure correctly", () => {
        const canvas = renderCanvas(defaultProps);

        expect(canvas).toBeElement(
            createElement("div", { className: "widget-signature-wrapper", style: { width: defaultProps.width + "%" } },
                createElement("canvas", {
                    className: classNames("widget-Signature", "form-control mx-textarea-input mx-textarea",
                        { disabled: defaultProps.status === "disabled" }),
                    resize: true
                }),
                createElement("button", {
                    className: classNames("btn btn-default"),
                    style: { visibility:  "visible" },
                    onClick: jasmine.any(Function)
                }),
                createElement(Alert, { bootstrapStyle: "danger" }, defaultProps.alertMessage)
            )
        );
    });

    it("renders grid if showGrid set", () => {
        const signaturePad = fullRenderCanvas(defaultProps);
        const signaturePadInstance: any = signaturePad.instance();
        signaturePadInstance.height = 500;
        signaturePadInstance.width = 500;
        const drawGrid = spyOn(signaturePadInstance, "drawGrid").and.callThrough();
        signaturePadInstance.componentDidUpdate();

        expect(drawGrid).toHaveBeenCalled();
    });

    it("hides clear button when  signature pad is not editable", () => {
        const signaturePad = renderCanvas(defaultProps);
        signaturePad.setProps({ status: "disabled", widthUnit: "pixels" });

        expect(signaturePad).toBeElement(
            createElement("div", { className: "widget-signature-wrapper", style: { width: defaultProps.width + "px" } },
                createElement("canvas", {
                    className: classNames("widget-Signature", "form-control mx-textarea-input mx-textarea disabled"),
                    resize: true
                }),
                createElement("button", {
                    className: classNames("btn btn-default"),
                    style: { visibility:  "hidden" },
                    onClick: jasmine.any(Function)
                }),
                createElement(Alert, { bootstrapStyle: "danger" }, defaultProps.alertMessage)
            )
        );
    });

    xit("handles sign end action after user signing", () => {
        const signaturePad = renderCanvas(defaultProps);
        signaturePad.setProps({ onSignEndAction: jasmine.any(Function), heightUnit: "percentageOfParent" });
        const signatureInstance: any = signaturePad.instance();
        const handleSignEnd = spyOn(signatureInstance, "handleSignEnd").and.callThrough();

        signaturePad.simulate("dblclick");

        expect(handleSignEnd).toHaveBeenCalled();
        dispatchEvent(event);
    });

    it("resets canvas when reset button is clicked", () => {
        const customProps = { ...defaultProps, onSignEndAction: jasmine.any(Function) };
        const signaturePad = fullRenderCanvas(customProps);
        const canvasInstance: any = signaturePad.instance();

        const resetCanvas = spyOn(canvasInstance, "resetCanvas").and.callThrough();
        canvasInstance.componentDidUpdate();
        signaturePad.find("button").first().simulate("click");
        signaturePad.setProps({ heightUnit: "percentageOfWidth" });

        expect(resetCanvas).toHaveBeenCalledTimes(1);
    });

    xit("resizes the canvas on window resize", () => {
        const signaturePad = renderCanvas(defaultProps);
        const signatureInstance: any = signaturePad.instance();
        const resizeCanvas = spyOn(signatureInstance, "resizeCanvas").and.callThrough();

        signaturePad.setProps({ heightUnit: "pixels" });
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
