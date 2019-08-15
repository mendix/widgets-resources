import { shallow } from "enzyme";
import { createElement } from "react";

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

        expect(progress.getElement()).toEqual(
            createElement(
                "div",
                { className: "widget-progress-circle" },
                createElement(Alert, { bootstrapStyle: "danger" }),
                createElement("div", { className: "h2" })
            )
        );
    });

    it("creates a progress circle", () => {
        spyOnCircle();
        const progress = newCircleInstance({ value: 80, circleThickness: 50 });

        progress.componentDidMount();

        expect(progressbar.Circle).toHaveBeenCalled();
    });

    it("sets the progress percentage", () => {
        spyOn(progressbar.Circle.prototype, "setText").and.callThrough();
        const setText = progressbar.Circle.prototype.setText as jasmine.Spy;
        spyOnCircle();

        const progress = newCircleInstance({ animate: false, value: 80, displayText: "percentage" });
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

    it("recreates the progress circle when the circle thickness values are changed", () => {
        spyOn(progressbar.Circle.prototype, "destroy").and.callThrough();
        const destroy = progressbar.Circle.prototype.destroy as jasmine.Spy;
        spyOnCircle();

        const progress = renderProgressCircle({ value: 80, circleThickness: 50 });
        const progressInstance = progress.instance() as ProgressCircle;
        progressInstance.componentDidMount();
        progressInstance.componentWillReceiveProps({ circleThickness: 10 });

        expect(destroy).toHaveBeenCalled();
        expect(progressbar.Circle).toHaveBeenCalledTimes(2);
    });

    it("updates the alert mesaage when there is a new alert message", () => {
        spyOnCircle();

        const progress = renderProgressCircle({
            alertMessage: "on click microflow is required",
            maximumValue: undefined,
            value: 80
        });
        const progressInstance = progress.instance() as ProgressCircle;
        progressInstance.componentDidMount();
        progressInstance.componentWillReceiveProps({ value: 60, alertMessage: "" });

        expect(progress.state().alertMessage).toEqual("");
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

    describe("renders a circle with", () => {
        it("no text when display text is none", () => {
            spyOnCircle();

            const progress = newCircleInstance({ value: 50, displayText: "none" });
            progress.componentDidMount();

            expect(progressCircle.text.textContent).toBe("");
        });

        it("only the value when display text is value", () => {
            spyOnCircle();

            const progress = newCircleInstance({ value: 10, displayText: "value" });
            progress.componentDidMount();

            expect(progressCircle.text.textContent).not.toContain("%");
        });

        it("the text -- when no value is specified", () => {
            spyOnCircle();

            const progress = newCircleInstance({ value: undefined });
            progress.componentDidMount();

            expect(progressCircle.text.textContent).toBe("--");
        });

        it("the text set to Invalid when the maximum value is less than 1", () => {
            spyOnCircle();

            const progress = newCircleInstance({
                animate: false,
                displayText: "percentage",
                maximumValue: -1,
                value: 80
            });
            progress.componentDidMount();

            expect(progressCircle.text.textContent).toBe("Invalid");
        });

        it("negative values when the value is less than zero", () => {
            spyOnCircle();

            const progress = newCircleInstance({ animate: false, value: -200 });
            progress.componentDidMount();

            expect(progressCircle.text.textContent).toBe("-200%");
        });

        it("text greater than 100% when the value is greater than the maximum", () => {
            spyOnCircle();

            const progress = newCircleInstance({ value: 180 });
            progress.componentDidMount();

            expect(progressCircle.text.textContent).toBe("180%");
            expect(progressCircle.animate).toHaveBeenCalledWith(1);
        });
    });

    describe("has the class", () => {
        it("widget-progress-circle-alert when the maximum value is less than one", () => {
            const progress = renderProgressCircle({ value: 20, maximumValue: 0 });

            expect(progress.find(".widget-progress-circle-alert")).toHaveLength(1);
        });

        it("mx-text when the text style is text", () => {
            const progress = renderProgressCircle({ textSize: "text", value: 20 });

            expect(progress.find(".mx-text")).toHaveLength(1);
        });

        it("of type heading when the text style is of type heading", () => {
            const progress = renderProgressCircle({ textSize: "h1", value: 20 });

            expect(progress.find(".h1")).toHaveLength(1);
        });
    });
});
