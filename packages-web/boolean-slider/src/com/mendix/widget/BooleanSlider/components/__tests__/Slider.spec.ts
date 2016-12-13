import { ShallowWrapper, shallow } from "enzyme";
import { DOM, createElement } from "react";

import { Slider, SliderProps } from "../Slider";

describe("Slider", () => {
    let slider: ShallowWrapper<SliderProps, any>;
    let sliderProps: SliderProps;
    let checkbox: ShallowWrapper<any, any>;
    let label: ShallowWrapper<any, any>;
    const errorNode = DOM.div(null, "This is an error");
    const createAndFindElements = (props: SliderProps, alert?: React.DOMElement<any, any>) => {
        slider = shallow(createElement(Slider, props, alert));
        checkbox = slider.find(".widget-boolean-slider-checkbox");
        label = slider.find(".widget-boolean-slider-btn");
    };

    it("should render the full slider structure", () => {
        createAndFindElements({
            isChecked: true,
            status: "enabled"
        });

        expect(slider).toBeElement(
            DOM.div({ className: "widget-boolean-slider" },
                DOM.input({
                    checked: true,
                    className: "widget-boolean-slider-checkbox enabled",
                    readOnly: true,
                    type: "checkbox"
                }),
                DOM.div({
                    className: "widget-boolean-slider-btn enabled",
                    onClick: jasmine.any(Function) as any
                })
            )
        );
    });

    describe("that is true", () => {
        it("should be checked", () => {
            createAndFindElements({
                isChecked: true,
                status: "enabled"
            });

            expect(checkbox.props().checked).toBe(true);
        });
    });

    describe("that is false", () => {
        it("should be unchecked", () => {
            createAndFindElements({
                isChecked: false,
                status: "enabled"
            });

            expect(checkbox.props().checked).toBe(false);
        });
    });

    describe("that is enabled", () => {
        it("should have the enabled class", () => {
            createAndFindElements({
                isChecked: true,
                status: "enabled"
            });

            expect(checkbox.hasClass("enabled")).toBe(true);
            expect(label.hasClass("enabled")).toBe(true);
        });

        it("should handle click event", () => {
            const onClick = jasmine.createSpy("onClick");
            createAndFindElements({
                isChecked: true,
                onClick,
                status: "enabled"
            });

            label.simulate("click");

            expect(onClick).toHaveBeenCalled();
        });
    });

    describe("that is disabled", () => {
        it("should not have the enabled class", () => {
            createAndFindElements({
                status: "disabled",
                isChecked: true
            });

            expect(checkbox.hasClass("enabled")).toBe(false);
            expect(label.hasClass("enabled")).toBe(false);
        });

        it("should not handle a click event", () => {
            const onClick = jasmine.createSpy("onClick");
            createAndFindElements({
                status: "disabled",
                isChecked: true,
                onClick
            });

            label.simulate("click");

            expect(onClick).not.toHaveBeenCalled();
        });
    });

    describe("without a context", () => {
        it("should have the no-slider class", () => {
            createAndFindElements({
                isChecked: false,
                status: "no-context"
            });

            expect(label).toHaveClass("no-slider");
        });

        it("should not handle a click event", () => {
            const onClick = jasmine.createSpy("onClick");
            createAndFindElements({
                isChecked: true,
                onClick,
                status: "no-context"
            });

            label.simulate("click");

            expect(onClick).not.toHaveBeenCalled();
        });
    });

    describe("that has an error", () => {
        beforeEach(() => {
            sliderProps = {
                status: "enabled",
                hasError: true,
                isChecked: false
            };
            createAndFindElements(sliderProps, errorNode);
        });

        it("should have the class has-error", () => {
            expect(slider.hasClass("has-error")).toBe(true);
        });

        it("should show the supplied error", () => {
            expect(slider.childAt(2)).toBeElement(errorNode);
        });
    });

    describe("that has no error", () => {
        beforeEach(() => {
            sliderProps = {
                status: "enabled",
                hasError: false,
                isChecked: false,
                onClick: () => { console.log("clicked"); }
            };
            createAndFindElements(sliderProps, errorNode);
        });

        it("should not have the class has-error", () => {
            expect(slider.hasClass("has-error")).toBe(false);
        });

        it("should not show any error message", () => {
            expect(slider.childAt(2).type()).toBe(null);
        });
    });
});
