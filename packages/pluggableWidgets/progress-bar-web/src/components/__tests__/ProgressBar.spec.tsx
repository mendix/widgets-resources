import { Alert } from "@widgets-resources/piw-utils";
import { mount, ReactWrapper, shallow } from "enzyme";
import { createElement, CSSProperties, FunctionComponent } from "react";
import { ProgressBar, ProgressBarProps } from "../ProgressBar";

const RandomComponent: FunctionComponent<any> = () => <div>This is a random component</div>;

describe("Progress bar", () => {
    function getProgressBarStyle(progressBar: ReactWrapper<ProgressBarProps>): CSSProperties | undefined {
        return progressBar.find(".progress-bar").prop("style");
    }
    const progress = 23;
    const maximumValue = 100;
    const onClickSpy = jest.fn();

    it("has progress bar structure", () => {
        const progressBar = shallow(
            <ProgressBar
                currentValue={progress}
                minValue={0}
                maxValue={maximumValue}
                onClick={onClickSpy}
                label={`${progress}%`}
                class=""
            />
        );
        expect(progressBar).toMatchSnapshot();
    });

    it("should show positive progress", () => {
        const progressBar = mount(
            <ProgressBar
                currentValue={progress}
                minValue={0}
                maxValue={maximumValue}
                onClick={onClickSpy}
                label={`${progress}%`}
                class=""
            />
        );

        expect(getProgressBarStyle(progressBar)).toEqual({ width: "23%" });
    });

    it("should call the onClick handler when the progress bar is clicked on", () => {
        const progressBar = mount(
            <ProgressBar
                currentValue={progress}
                minValue={0}
                maxValue={maximumValue}
                onClick={onClickSpy}
                label={`${progress}%`}
                class=""
            />
        );
        const progressElement = progressBar.find(".progress");
        expect(progressElement.hasClass("widget-progress-bar-clickable")).toBe(true);
        progressElement.simulate("click");
        expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    it("should properly handle a different range", () => {
        const progressBar = mount(
            <ProgressBar
                currentValue={progress}
                minValue={20}
                maxValue={30}
                onClick={onClickSpy}
                label={`${progress}%`}
                class=""
            />
        );

        // 23 on a range from 20 to 30 is 30% progress.
        expect(getProgressBarStyle(progressBar)).toEqual({ width: "30%" });
    });

    it("should clamp a current value lower than the minimum value to 0% progress", () => {
        const progressBar = mount(
            <ProgressBar
                currentValue={-20}
                minValue={0}
                maxValue={100}
                onClick={onClickSpy}
                label={`${progress}%`}
                class=""
            />
        );

        expect(getProgressBarStyle(progressBar)).toEqual({ width: "0%" });
    });

    it("should clamp a current value higher than the maximum value to 100% progress", () => {
        const progressBar = mount(
            <ProgressBar
                currentValue={110}
                minValue={0}
                maxValue={100}
                onClick={onClickSpy}
                label={`${progress}%`}
                class=""
            />
        );

        expect(getProgressBarStyle(progressBar)).toEqual({ width: "100%" });
    });

    it("should not be clickable when there is no onClick handler provided", () => {
        const progressBar = mount(
            <ProgressBar
                currentValue={50}
                minValue={0}
                maxValue={100}
                onClick={undefined}
                label={`${progress}%`}
                class=""
            />
        );
        expect(progressBar.find(".progress").hasClass("widget-progress-bar-clickable")).toBe(false);
    });

    describe("should show a runtime error Alert", () => {
        it("when the current value is lower than the minimum value", () => {
            const progressBar = mount(
                <ProgressBar
                    currentValue={-20}
                    minValue={0}
                    maxValue={100}
                    onClick={onClickSpy}
                    label={`${progress}%`}
                    class=""
                />
            );
            const alert = progressBar.find(Alert);
            expect(alert).toHaveLength(1);
            expect(alert.text()).toBe(
                "Error in progress bar values: The progress value is lower than the minimum value."
            );
        });

        it("when the current value is higher than the maximum value", () => {
            const progressBar = mount(
                <ProgressBar
                    currentValue={110}
                    minValue={0}
                    maxValue={100}
                    onClick={onClickSpy}
                    label={`${progress}%`}
                    class=""
                />
            );
            const alert = progressBar.find(Alert);
            expect(alert).toHaveLength(1);
            expect(alert.text()).toBe(
                "Error in progress bar values: The progress value is higher than the maximum value."
            );
        });

        it("when the range of the progress bar is negative", () => {
            const progressBar = mount(
                <ProgressBar
                    currentValue={50}
                    minValue={40}
                    maxValue={30}
                    onClick={onClickSpy}
                    label={`${progress}%`}
                    class=""
                />
            );
            const alert = progressBar.find(Alert);
            expect(alert).toHaveLength(1);
            expect(alert.text()).toBe(
                "Error in progress bar values: The maximum value is lower than the minimum value."
            );
        });
    });

    describe("the label of the progressbar", () => {
        it("should accept static text", () => {
            const progressBar = mount(
                <ProgressBar
                    currentValue={30}
                    minValue={0}
                    maxValue={100}
                    onClick={onClickSpy}
                    label="This is your progress"
                    class=""
                />
            );
            expect(progressBar.text()).toBe("This is your progress");
        });

        it("should accept a component", () => {
            const progressBar = mount(
                <ProgressBar
                    currentValue={30}
                    minValue={0}
                    maxValue={100}
                    onClick={onClickSpy}
                    label={<RandomComponent />}
                    class=""
                />
            );
            expect(progressBar.find(RandomComponent)).toHaveLength(1);
            expect(progressBar.text()).toContain("This is a random component");
        });

        it("should accept nothing", () => {
            const progressBar = mount(
                <ProgressBar currentValue={30} minValue={0} maxValue={100} onClick={onClickSpy} label={null} class="" />
            );
            expect(progressBar.text()).toHaveLength(0);
        });
    });
});
