import { shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";

import { ProgressBar, ProgressBarProps } from "../ProgressBar";

describe("Progress bar", () => {
    const renderWrapper = (props: ProgressBarProps): ShallowWrapper<ProgressBarProps, any> =>
        shallow(createElement(ProgressBar, props));
    const getProgressBar = (props: ProgressBarProps): any => renderWrapper(props).childAt(0);
    const progress = 23;
    const minimumValue = 0;
    const maximumValue = 100;
    const text = "test1";
    const onClickSpy = jest.fn();

    it("has progress bar structure", () => {
        const progressbar = shallow(
            createElement(ProgressBar, { minimumValue, maximumValue, onClickAction: onClickSpy, progress })
        );
        expect(progressbar).toMatchSnapshot();
    });

    it("should render positive progress", () => {
        const wrapper = renderWrapper({ minimumValue, maximumValue, progress: 200 });

        expect(wrapper.childAt(0).text()).toEqual(`${200}%`);
    });

    it("should render negative progress", () => {
        const wrapper = renderWrapper({ minimumValue, maximumValue, progress: -20 });

        expect(wrapper.childAt(0).text()).toEqual(`${-20}%`);
    });

    it("should render the progress label invalid when the maximum value is less than 1", () => {
        const progressbar = getProgressBar({ minimumValue, maximumValue: 0, progress }).childAt(0);

        expect(progressbar.text()).toEqual("Invalid");
    });

    it("should render the progress label from progress value when the display text is value", () => {
        const progressbar = getProgressBar({ minimumValue, maximumValue, progress, showContent: "value" }).childAt(0);

        expect(progressbar.text()).toEqual(`${progress}`);
    });

    // it("should render the progress label from a static value when the display text is static", () => {
    //     const progressbar = getProgressBar({
    //         maximumValue: 100,
    //         progress,
    //         showContent: "static",
    //         text: displayTextValue
    //     }).childAt(0);

    //     expect(progressbar.text()).toEqual(displayTextValue);
    // });

    it("should render the progress label from an attribute when the display text is attribute", () => {
        const progressbar = getProgressBar({
            minimumValue,
            maximumValue,
            progress,
            showContent: "text",
            text
        }).childAt(0);

        expect(progressbar.text()).toEqual(text);
    });

    it("should render the progress with no label when the display text is none", () => {
        const progressbar = getProgressBar({
            minimumValue,
            maximumValue,
            progress,
            showContent: "none"
        }).childAt(0);

        expect(progressbar.text()).toEqual("");
    });

    it("should not render the progress label when no progress value is specified", () => {
        const progressbar = getProgressBar({
            minimumValue,
            maximumValue
        }).childAt(0);

        expect(progressbar.text()).toEqual("");
    });

    it("should have the class widget-progress-bar-negative when the progress value is negative", () => {
        const progressbar = getProgressBar({
            minimumValue,
            maximumValue,
            progress: -20
        });

        expect(progressbar.childAt(0).hasClass("widget-progress-bar-negative")).toBe(true);
    });

    it("should have the class widget-progress-bar-text-contrast when progress is below the threshold", () => {
        const progressbar = getProgressBar({
            minimumValue,
            maximumValue,
            progress: 20
        });

        expect(progressbar.hasClass("widget-progress-bar-text-contrast")).toBe(true);
    });

    it("should not have the class widget-progress-bar-text-contrast when progress exceeds the threshold", () => {
        const progressbar = getProgressBar({
            minimumValue,
            maximumValue,
            progress: 80
        });

        expect(progressbar.hasClass("widget-progress-bar-text-contrast")).toBe(false);
    });

    describe("with bootstrap style", () => {
        it("default should have the class progress-bar-default", () => {
            const progressbar = getProgressBar({
                bootstrapStyle: "default",
                minimumValue,
                maximumValue,
                progress
            }).childAt(0);

            expect(progressbar.hasClass("progress-bar-default")).toBe(true);
        });

        it("success should have the class progress-bar-success", () => {
            const progressbar = getProgressBar({
                bootstrapStyle: "success",
                minimumValue,
                maximumValue,
                progress
            }).childAt(0);

            expect(progressbar.hasClass("progress-bar-success")).toBe(true);
        });

        it("info should have the class progress-bar-info", () => {
            const progressbar = getProgressBar({
                bootstrapStyle: "info",
                minimumValue,
                maximumValue,
                progress
            }).childAt(0);

            expect(progressbar.hasClass("progress-bar-info")).toBe(true);
        });

        it("warning should have the class progress-bar-warning", () => {
            const progressbar = getProgressBar({
                bootstrapStyle: "warning",
                minimumValue,
                maximumValue,
                progress
            }).childAt(0);

            expect(progressbar.hasClass("progress-bar-warning")).toBe(true);
        });

        it("danger should have the class progress-bar-danger", () => {
            const progressbar = getProgressBar({
                bootstrapStyle: "danger",
                minimumValue,
                maximumValue,
                progress
            }).childAt(0);

            expect(progressbar.hasClass("progress-bar-danger")).toBe(true);
        });
    });

    it("with no bootstrap style should have the class progress-bar-default", () => {
        const progressbar = getProgressBar({ minimumValue, maximumValue, progress }).childAt(0);

        expect(progressbar.hasClass("progress-bar-default")).toBe(true);
    });

    describe("of type", () => {
        it("default should not have the classes progress-bar-striped and active", () => {
            const progressbar = getProgressBar({ barType: "default", minimumValue, maximumValue, progress }).childAt(0);

            expect(progressbar.hasClass("progress-bar-striped")).toBe(false);
            expect(progressbar.hasClass("active")).toBe(false);
        });

        it("striped should have the class progress-bar-striped", () => {
            const progressbar = getProgressBar({ barType: "striped", minimumValue, maximumValue, progress }).childAt(0);

            expect(progressbar.hasClass("progress-bar-striped")).toBe(true);
        });

        it("animated should have the classes progress-bar-striped and active", () => {
            const progressbar = getProgressBar({ barType: "animated", minimumValue, maximumValue, progress }).childAt(
                0
            );

            expect(progressbar.hasClass("progress-bar-striped")).toBe(true);
            expect(progressbar.hasClass("active")).toBe(true);
        });
    });
});
