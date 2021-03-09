import { Alert } from "@widgets-resources/piw-utils";
import { mount, shallow } from "enzyme";
import * as ProgressbarJs from "progressbar.js";
import { createElement, FunctionComponent } from "react";
import { ProgressCircle } from "../ProgressCircle";

const mockedAnimate = jest.fn();
jest.mock("progressbar.js", () => ({
    Circle: jest.fn().mockImplementation(() => ({
        path: {
            className: {
                baseVal: ""
            }
        },
        trail: {
            className: {
                baseVal: ""
            }
        },
        animate: mockedAnimate
    }))
}));

describe("ProgressCircle", () => {
    const onClickSpy = jest.fn();

    it("renders the structure correctly", () => {
        expect(
            shallow(
                <ProgressCircle
                    currentValue={23}
                    minValue={0}
                    maxValue={100}
                    onClick={onClickSpy}
                    label="23%"
                    class=""
                />
            )
        ).toMatchSnapshot();
    });

    it("renders the progressbar.js Circle", () => {
        mount(
            <ProgressCircle currentValue={23} minValue={0} maxValue={100} onClick={onClickSpy} label="23%" class="" />
        );
        expect(ProgressbarJs.Circle).toHaveBeenCalled();
        expect(mockedAnimate).toHaveBeenCalledWith(0.23);
    });

    it("triggers an event when a clickable progress bar is clicked", () => {
        const progressCircle = mount(
            <ProgressCircle currentValue={23} minValue={0} maxValue={100} onClick={onClickSpy} label="23%" class="" />
        );
        progressCircle.find(".progress-circle-label-container").simulate("click");
        expect(onClickSpy).toHaveBeenCalled();
    });

    it("handles a different range", () => {
        const progressCircle = mount(
            <ProgressCircle currentValue={40} minValue={20} maxValue={100} onClick={undefined} label="25%" class="" />
        );
        // Value 40 on range 20 - 100 is 25%.
        expect(mockedAnimate).toHaveBeenCalledWith(0.25);
        expect(progressCircle.text()).toBe("25%");
    });

    it("clamps a current value lower than the minimum value to 0% progress", () => {
        const progressCircle = mount(
            <ProgressCircle currentValue={-20} minValue={20} maxValue={100} onClick={undefined} label="0%" class="" />
        );
        expect(mockedAnimate).toHaveBeenCalledWith(0);
        expect(progressCircle.text()).toContain("0%");
    });

    it("clamps a current value higher than the maximum value to 100% progress", () => {
        const progressCircle = mount(
            <ProgressCircle currentValue={102} minValue={20} maxValue={100} onClick={undefined} label="100%" class="" />
        );
        expect(mockedAnimate).toHaveBeenCalledWith(1);
        expect(progressCircle.text()).toContain("100%");
    });

    it("is not clickable when there is no onClick handler provided", () => {
        const progressCircle = mount(
            <ProgressCircle
                currentValue={-1}
                minValue={0}
                maxValue={100}
                onClick={undefined}
                label={undefined}
                class=""
            />
        );
        expect(
            progressCircle.find(".progress-circle-label-container").hasClass("widget-progress-circle-clickable")
        ).toBe(false);
    });

    describe("shows a runtime error Alert", () => {
        it("when the current value is lower than the minimum value", () => {
            const progressCircle = mount(
                <ProgressCircle
                    currentValue={-1}
                    minValue={0}
                    maxValue={100}
                    onClick={onClickSpy}
                    label={undefined}
                    class=""
                />
            );
            const alert = progressCircle.find(Alert);
            expect(alert).toHaveLength(1);
            expect(alert.text()).toBe(
                "Error in progress circle values: The progress value is lower than the minimum value."
            );
        });

        it("when the current value is higher than the maximum value", () => {
            const progressCircle = mount(
                <ProgressCircle
                    currentValue={200}
                    minValue={0}
                    maxValue={100}
                    onClick={onClickSpy}
                    label={undefined}
                    class=""
                />
            );
            const alert = progressCircle.find(Alert);
            expect(alert).toHaveLength(1);
            expect(alert.text()).toBe(
                "Error in progress circle values: The progress value is higher than the maximum value."
            );
        });

        it("when the range of the progress bar is negative", () => {
            const progressCircle = mount(
                <ProgressCircle
                    currentValue={50}
                    minValue={100}
                    maxValue={0}
                    onClick={onClickSpy}
                    label={undefined}
                    class=""
                />
            );
            const alert = progressCircle.find(Alert);
            expect(alert).toHaveLength(1);
            expect(alert.text()).toBe(
                "Error in progress circle values: The maximum value is lower than the minimum value."
            );
        });
    });

    describe("the label of the progressbar", () => {
        it("should accept static text", () => {
            const progressCircle = mount(
                <ProgressCircle
                    currentValue={50}
                    minValue={0}
                    maxValue={100}
                    onClick={onClickSpy}
                    label="This is a static text"
                    class=""
                />
            );
            expect(progressCircle.text()).toBe("This is a static text");
        });

        it("should accept a component", () => {
            const RandomComponent: FunctionComponent<any> = () => <div>This is a random component</div>;
            const progressCircle = mount(
                <ProgressCircle
                    currentValue={50}
                    minValue={0}
                    maxValue={100}
                    onClick={onClickSpy}
                    label={<RandomComponent />}
                    class=""
                />
            );
            expect(progressCircle.find(RandomComponent)).toHaveLength(1);
            expect(progressCircle.text()).toBe("This is a random component");
        });

        it("should accept nothing", () => {
            const progressCircle = mount(
                <ProgressCircle
                    currentValue={50}
                    minValue={0}
                    maxValue={100}
                    onClick={onClickSpy}
                    label={null}
                    class=""
                />
            );
            expect(progressCircle.text()).toHaveLength(0);
        });
    });
});
