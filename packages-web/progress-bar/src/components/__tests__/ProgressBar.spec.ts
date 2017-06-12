import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { ProgressBar, ProgressBarProps } from "../ProgressBar";
import { Alert } from "../Alert";

describe("Progress bar", () => {
    const renderWrapper = (props: ProgressBarProps) => shallow(createElement(ProgressBar, props));
    const getProgressbar = (props: ProgressBarProps) => renderWrapper(props).childAt(0);
    const progress = 23;
    const maximumValue = 100;
    const onClickSpy = jasmine.createSpy("onClick");

    it("has progress bar structure", () => {
        const progressbar = shallow(createElement(ProgressBar, { maximumValue, onClickAction: onClickSpy, progress }));

        expect(progressbar).toBeElement(
            DOM.div({ className: "widget-progress-bar" },
                DOM.div(
                    {
                        className: "progress widget-progress-bar-text-contrast widget-progress-bar-clickable",
                        onClick: jasmine.any(Function) as any
                    },
                    DOM.div({ className: "progress-bar progress-bar-default", style: { width: jasmine.any(String) } },
                        jasmine.any(String) as any
                    )
                ),
                createElement(Alert)
            )
        );
    });

    it("should render positive progress", () => {
        const wrapper = renderWrapper({ maximumValue, progress: 200 });

        expect(wrapper.childAt(0).text()).toEqual(`${200}%`);
    });

    it("should render negative progress", () => {
        const wrapper = renderWrapper({ maximumValue, progress: -20 });

        expect(wrapper.childAt(0).text()).toEqual(`${-20}%`);
    });

    it("should render the progress label invalid when the maximum value is less than 1", () => {
        const progressbar = getProgressbar({ maximumValue: 0, progress }).childAt(0);

        expect(progressbar.text()).toEqual("Invalid");
    });

    it("should not render the progress label when no progress value is specified", () => {
        const progressbar = getProgressbar({ maximumValue }).childAt(0);

        expect(progressbar.text()).toEqual("");
    });

    it("should have the class widget-progress-bar-negative when the progress value is negative", () => {
        const progressbar = getProgressbar({ maximumValue, progress: -20 });

        expect(progressbar.childAt(0).hasClass("widget-progress-bar-negative")).toBe(true);
    });

    it("should have the class widget-progress-bar-text-contrast when progress is below the threshold", () => {
        const progressbar = getProgressbar({ maximumValue, progress: 20 });

        expect(progressbar.hasClass("widget-progress-bar-text-contrast")).toBe(true);
    });

    it("should not have the class widget-progress-bar-text-contrast when progress exceeds the threshold", () => {
        const progressbar = getProgressbar({ maximumValue, progress: 80 });

        expect(progressbar.hasClass("widget-progress-bar-text-contrast")).toBe(false);
    });

    describe("with bootstrap style", () => {
        it("default should have the class progress-bar-default", () => {
            const progressbar = getProgressbar({ bootstrapStyle: "default", maximumValue, progress }).childAt(0);

            expect(progressbar.hasClass("progress-bar-default")).toBe(true);
        });

        it("success should have the class progress-bar-success", () => {
            const progressbar = getProgressbar({ bootstrapStyle: "success", maximumValue, progress }).childAt(0);

            expect(progressbar.hasClass("progress-bar-success")).toBe(true);
        });

        it("info should have the class progress-bar-info", () => {
            const progressbar = getProgressbar({ bootstrapStyle: "info", maximumValue, progress }).childAt(0);

            expect(progressbar.hasClass("progress-bar-info")).toBe(true);
        });

        it("warning should have the class progress-bar-warning", () => {
            const progressbar = getProgressbar({ bootstrapStyle: "warning", maximumValue, progress }).childAt(0);

            expect(progressbar.hasClass("progress-bar-warning")).toBe(true);
        });

        it("danger should have the class progress-bar-danger", () => {
            const progressbar = getProgressbar({ bootstrapStyle: "danger", maximumValue, progress }).childAt(0);

            expect(progressbar.hasClass("progress-bar-danger")).toBe(true);
        });
    });

    it("with no bootstrap style should have the class progress-bar-default", () => {
        const progressbar = getProgressbar({ maximumValue, progress }).childAt(0);

        expect(progressbar.hasClass("progress-bar-default")).toBe(true);
    });

    describe("of type", () => {
        it("default should not have the classes progress-bar-striped and active", () => {
            const progressbar = getProgressbar({ barType: "default", maximumValue, progress }).childAt(0);

            expect(progressbar.hasClass("progress-bar-striped")).toBe(false);
            expect(progressbar.hasClass("active")).toBe(false);
        });

        it("striped should have the class progress-bar-striped", () => {
            const progressbar = getProgressbar({ barType: "striped", maximumValue, progress }).childAt(0);

            expect(progressbar.hasClass("progress-bar-striped")).toBe(true);
        });

        it("animated should have the classes progress-bar-striped and active", () => {
            const progressbar = getProgressbar({ barType: "animated", maximumValue, progress }).childAt(0);

            expect(progressbar.hasClass("progress-bar-striped")).toBe(true);
            expect(progressbar.hasClass("active")).toBe(true);
        });
    });
});
