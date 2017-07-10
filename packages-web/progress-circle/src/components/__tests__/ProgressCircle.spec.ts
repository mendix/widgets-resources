import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import * as progressbar from "progressbar.js";

import { BootstrapStyle, ProgressCircle, ProgressCircleProps } from "../ProgressCircle";
import { Alert } from "../Alert";

describe("ProgressCircle", () => {
    let progressCircle: progressbar.Circle;
    const renderProgressCircle = (props: ProgressCircleProps) => shallow(createElement(ProgressCircle, props));
    const newCircleInstance = (props: ProgressCircleProps) => renderProgressCircle(props).instance() as ProgressCircle;
    const Circle = progressbar.Circle;
    const positiveValueColor: BootstrapStyle = "primary";
    const spyOnCircle = () =>
        spyOn(progressbar, "Circle").and.callFake(() => {
            progressCircle = new Circle(document.createElement("div"), {
                strokeWidth: 6,
                trailWidth: 6
            });
            spyOn(progressCircle, "animate").and.callThrough();

            return progressCircle;
        });

    it("renders the structure correctly", () => {
        const progress = renderProgressCircle({ value: 60, positiveValueColor });

        expect(progress).toBeElement(
            DOM.div({ className: "widget-progress-circle" },
                createElement(Alert),
                DOM.div({ className: "h2" })
            )
        );
    });

    it("creates a progress circle", () => {
        spyOnCircle();
        const progress = newCircleInstance({ value: 80 });

        progress.componentDidMount();

        expect(progressbar.Circle).toHaveBeenCalled();
    });

    it("sets the progress percentage", () => {
        spyOn(progressbar.Circle.prototype, "setText").and.callThrough();
        const setText = progressbar.Circle.prototype.setText as jasmine.Spy;
        spyOnCircle();

        const progress = newCircleInstance({ animate: false, value: 80 });
        progress.componentDidMount();

        expect(setText).toHaveBeenCalled();
    });

    it("updates the progress percentage when the values are changed", () => {
        spyOn(progressbar.Circle.prototype, "setText").and.callThrough();
        const setText = progressbar.Circle.prototype.setText as jasmine.Spy;
        spyOnCircle();

        const progress = renderProgressCircle({ value: 80 });
        const progressInstance = progress.instance() as ProgressCircle;
        progressInstance.componentDidMount();
        progress.setProps({ value: 60 });

        expect(setText).toHaveBeenCalledTimes(2);
    });

    it("destroys progress circle on unmount", () => {
        spyOn(progressbar.Circle.prototype, "destroy").and.callThrough();
        const destroy = progressbar.Circle.prototype.destroy as jasmine.Spy;
        spyOnCircle();

        const progress = newCircleInstance({ value: 80 });
        progress.componentDidMount();
        progress.componentWillUnmount();

        expect(destroy).toHaveBeenCalled();
    });

    it("renders a circle with the text -- when no value is specified", () => {
        spyOnCircle();

        const progress = newCircleInstance({ value: undefined });
        progress.componentDidMount();

        expect(progressCircle.text.textContent).toBe("--");
    });

    it("renders a circle with the text set to Invalid when the maximum value is less than 1", () => {
        spyOnCircle();

        const progress = newCircleInstance({
            animate: false,
            maximumValue: -1,
            value: 80
        });
        progress.componentDidMount();

        expect(progressCircle.text.textContent).toBe("Invalid");
    });

    it("renders a circle with negative values when the value is less than zero", () => {
        spyOnCircle();

        const progress = newCircleInstance({ animate: false, value: -200 });
        progress.componentDidMount();

        expect(progressCircle.text.textContent).toBe("-200%");
    });

    it("renders a circle with text greater than 100% when the value is greater than the maximum", () => {
        spyOnCircle();

        const progress = newCircleInstance({ value: 180 });
        progress.componentDidMount();

        expect(progressCircle.text.textContent).toBe("180%");
        expect(progressCircle.animate).toHaveBeenCalledWith(1);
    });

    it("has the class widget-progress-circle-alert when the maximum value is less than one", () => {
        const progress = renderProgressCircle({ value: 20, maximumValue: 0 });

        expect(progress.find(".widget-progress-circle-alert").length).toBe(1);
    });

    it("has the class h3 when the text style is small", () => {
        const progress = renderProgressCircle({ textSize: "h3", value: 20 });

        expect(progress.find(".h3").length).toBe(1);
    });

    it("has the class h2 when the text styles is medium", () => {
        const progress = renderProgressCircle({ textSize: "h2", value: 20 });

        expect(progress.find(".h2").length).toBe(1);
    });

    it("has the class h1 when the text style is large", () => {
        const progress = renderProgressCircle({ textSize: "h1", value: 20 });

        expect(progress.find(".h1").length).toBe(1);
    });

    afterAll(() => {
        window.mx = undefined as any;
        window.mendix = undefined as any;
    });
});
