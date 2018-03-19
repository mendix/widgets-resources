import { mount, shallow } from "enzyme";
import { createElement } from "react";

import { SignatureCanvas, SignatureProps } from "../Signature";
import { Canvas } from "../canvas";
import { Image } from "../image";
import { Point } from "../point";
import { Bezier } from "../bezier";

describe("SignatureCanvas", () => {
    const renderCanvas = (props: SignatureProps) => shallow(createElement(SignatureCanvas, props));
    const fullRenderCanvas = (props: SignatureProps) => mount(createElement(SignatureCanvas, props));
    const defaultProps: SignatureProps = {
        height: 500,
        width: 500,
        gridx: 50,
        gridy: 50,
        gridColor: "#777",
        gridBorder: 1,
        penColor: "#000",
        maxWidth: "2.5",
        minWidth: "0.5",
        velocityFilterWeight: "0.7",
        showGrid: true,
        onClickAction: jasmine.any(Function),
        imageUrl: ""
    };

    it("renders the structure correctly", () => {
        const canvas = renderCanvas(defaultProps);
        canvas.state().isset = false;

        expect(canvas).toBeElement(
            createElement("div",
                { className: "widget-Signature signature-unset" },
                createElement(Canvas, {
                    gridx: defaultProps.gridx,
                    gridy: defaultProps.gridy,
                    height: defaultProps.height,
                    getItemNode: jasmine.any(Function),
                    gridBorder: defaultProps.gridBorder,
                    width: defaultProps.width
                }),
                createElement(Image, {
                    height: defaultProps.height,
                    width: defaultProps.width,
                    url: defaultProps.imageUrl
                }),
                createElement("span", {
                    className: "glyphicon glyphicon-save",
                    onClick: jasmine.any(Function),
                    style: { visibility: "visible" }
                }),
                createElement("button", {
                    style: { width: defaultProps.width }
                })
            )
        );
    });

    it("resets canvas when mounting", () => {
        const canvas = fullRenderCanvas(defaultProps);
        const canvasInstance = canvas.instance() as any;

        const resetCanvas = spyOn(canvasInstance, "resetCanvas").and.callThrough();
        canvasInstance.componentDidMount();

        expect(resetCanvas).toHaveBeenCalled();
    });

    it("resets canvas when reset button is clicked", () => {
        const canvas = fullRenderCanvas(defaultProps);
        const canvasInstance = canvas.instance() as any;

        const resetCanvas = spyOn(canvasInstance, "resetCanvas").and.callThrough();
        canvasInstance.eventResetClicked();

        expect(resetCanvas).toHaveBeenCalled();
    });

    it("renders a grid", () => {
        const canvas = renderCanvas(defaultProps);

        expect(canvas.find(Canvas).length).toBe(1);
    });

    it("begins drawing a curve", () => {
        const e: PointerEvent = {
            preventDefault: () => null
        } as any;

        const beginCurveSpy = spyOn(SignatureCanvas.prototype, "beginCurve" as any).and.callThrough();
        const canvasInstance = fullRenderCanvas(defaultProps);
        (canvasInstance.instance() as any).beginCurve(e);

        expect(beginCurveSpy).toHaveBeenCalled();
    });

    it("updates the curve", () => {
        const e: PointerEvent = {
            preventDefault: () => null
        } as any;

        const updateCurve = spyOn(SignatureCanvas.prototype, "updateCurve" as any).and.callThrough();
        const curveInstance = fullRenderCanvas(defaultProps);
        (curveInstance.instance() as any).updateCurve(e);

        expect(updateCurve).toHaveBeenCalled();
    });

    it("adds points to the grid", () => {
        const point = new Point(183, 89, 1520579234208);

        const addPoint = spyOn(SignatureCanvas.prototype, "addPoint" as any).and.callThrough();
        const addPointInstance = fullRenderCanvas(defaultProps);
        (addPointInstance.instance() as any).addPoint(point);

        expect(addPoint).toHaveBeenCalled();
    });

    it("adds a curve", () => {
        const startPoint = new Point(194, 89, 1520579234208);
        const control1 = new Point(194.25, 88.75, 1520579234208);
        const control2 = new Point(193.539428528519, 88.18904052933922, 1520579234208);
        const endPoint = new Point(194, 88, 1520579234208);
        const bezier = new Bezier(startPoint, control1, control2, endPoint);

        const addCurve = spyOn(SignatureCanvas.prototype, "addCurve" as any).and.callThrough();
        const addCurveInstance = fullRenderCanvas(defaultProps);
        (addCurveInstance.instance() as any).addCurve(bezier);

        expect(addCurve).toHaveBeenCalled();
    });

    it("ends curve", () => {
        const e: PointerEvent = {
            preventDefault: () => null
        } as any;

        const endCurve = spyOn(SignatureCanvas.prototype, "endCurve" as any).and.callThrough();
        const endCurveInstance = fullRenderCanvas(defaultProps);
        (endCurveInstance.instance() as any).endCurve(e);

        expect(endCurve).toHaveBeenCalled();
    });
});
