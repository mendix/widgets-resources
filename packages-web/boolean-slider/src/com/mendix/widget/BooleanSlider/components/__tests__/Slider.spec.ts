import { ShallowWrapper, shallow } from "enzyme";
import { DOM, createElement } from "react";

import { Slider, SliderProps } from "../Slider";

describe("Slider", () => {

    let slider: ShallowWrapper<SliderProps, any>;
    let sliderProps: SliderProps;
    let checkbox: ShallowWrapper<any, any>;
    let label: ShallowWrapper<any, any>;

    beforeEach(() => {
        sliderProps = {
            enabled: true,
            isChecked: true,
            onClick: () => { console.log("clicked"); },
            widgetId: "slider"
        };
        slider = shallow(createElement(Slider, sliderProps));
        checkbox = slider.find("input.mx-toggle");
        label = slider.find("label.mx-toggle-btn");
    });

    it("renders structure correctly", () => {
        // toBeElement & toMatchStructure were returning unexpected errors
        expect(slider.children().length).toBe(2);
        expect(slider.children().first().type()).toBe("input");
        expect(slider.childAt(1).type()).toBe("label");

        expect(checkbox.props().type).toBe("checkbox");
        expect(checkbox.props().id).toBe("mx-toggle-" + sliderProps.widgetId);
        expect(checkbox.hasClass("enabled")).toBe(true);
        expect(checkbox.props().checked).toBe(true);

        expect(label.props().htmlFor).toBe("mx-toggle-" + sliderProps.widgetId);
        expect(label.hasClass("enabled")).toBe(true);
        expect(typeof label.props().onClick).toBe("function");

        // expect(slider).toBeElement(
        //     DOM.div({ className: classNames("mx-boolean-slider", { "has-error": sliderProps.hasError }) },
        //         DOM.input({
        //             checked: sliderProps.isChecked,
        //             className: classNames("mx-toggle", { enabled: sliderProps.enabled }),
        //             id: "mx-toggle-" + sliderProps.widgetId,
        //             readOnly: true,
        //             type: "checkbox"
        //         }),
        //         DOM.label({
        //             className: classNames("mx-toggle-btn", { enabled: sliderProps.enabled }),
        //             htmlFor: "mx-toggle-" + sliderProps.widgetId,
        //             onClick: sliderProps.enabled ? (event: any) => sliderProps.onClick(true) : null
        //         }),
        //         sliderProps.children
        //     )
        // );
    });

    it("has the class mx-boolean-slider", () => {
        expect(slider.hasClass("mx-boolean-slider")).toBe(true);
    });

    describe("that is checked", () => {

        beforeEach(() => {
            sliderProps = {
                enabled: true,
                isChecked: true,
                onClick: () => {
                    sliderProps.isChecked = false;
                    slider.setProps(sliderProps);
                    checkbox = slider.find("input.mx-toggle");
                },
                widgetId: "slider"
            };
            slider = shallow(createElement(Slider, sliderProps));
            checkbox = slider.find("input.mx-toggle");
            label = slider.find("label.mx-toggle-btn");
        });

        it("renders a checkbox that is also checked", () => {
            expect(checkbox.props().checked).toBe(true);
        });

        it("gets unchecked when clicked", () => {
            label.simulate("click");

            expect(checkbox.props().checked).toBe(false);
        });
    });

    describe("that is unchecked", () => {

        beforeEach(() => {
            sliderProps = {
                enabled: true,
                isChecked: false,
                onClick: () => {
                    sliderProps.isChecked = true;
                    slider.setProps(sliderProps);
                    checkbox = slider.find("input.mx-toggle");
                },
                widgetId: "slider"
            };
            slider = shallow(createElement(Slider, sliderProps));
            checkbox = slider.find("input.mx-toggle");
            label = slider.find("label.mx-toggle-btn");
        });

        it("renders a checkbox that is also unchecked", () => {
            expect(checkbox.props().checked).toBe(false);
        });

        it("can be checked when clicked", () => {
            label.simulate("click");

            expect(checkbox.props().checked).toBe(true);
        });
    });

    describe("that is enabled", () => {

        beforeEach(() => {
            sliderProps = {
                enabled: true,
                isChecked: true,
                onClick: () => {
                    sliderProps.isChecked = !sliderProps.isChecked;
                    slider.setProps(sliderProps);
                    checkbox = slider.find("input.mx-toggle");
                },
                widgetId: "slider"
            };
            slider = shallow(createElement(Slider, sliderProps));
            checkbox = slider.find("input.mx-toggle");
            label = slider.find("label.mx-toggle-btn");
        });

        it("has the class enabled", () => {
            expect(checkbox.hasClass("enabled")).toBe(true);
            expect(label.hasClass("enabled")).toBe(true);
        });

        it("is toggled when clicked", () => {
            label.simulate("click");

            expect(checkbox.props().checked).toBe(false);

            label.simulate("click");

            expect(checkbox.props().checked).toBe(true);
        });

        describe("and unchecked", () => {

            beforeEach(() => {
                sliderProps = {
                    enabled: true,
                    hasError: false,
                    isChecked: false,
                    onClick: () => { console.log("clicked"); },
                    widgetId: "slider"
                };
                slider = shallow(createElement(Slider, sliderProps));
                checkbox = slider.find("input.mx-toggle");
            });

            it("renders a checkbox that is also unchecked", () => {
                expect(checkbox.props().checked).toBe(false);
            });
        });
    });

    describe("that is disabled", () => {

        beforeEach(() => {
            sliderProps = {
                enabled: false,
                isChecked: true,
                onClick: () => {
                    sliderProps.isChecked = !sliderProps.isChecked;
                    slider.setProps(sliderProps);
                    checkbox = slider.find("input.mx-toggle");
                },
                widgetId: "slider"
            };
            slider = shallow(createElement(Slider, sliderProps));
            checkbox = slider.find("input.mx-toggle");
            label = slider.find("label.mx-toggle-btn");
        });

        it("does not have the class enabled", () => {
            expect(checkbox.hasClass("enabled")).toBe(false);
            expect(label.hasClass("enabled")).toBe(false);
        });

        it("is not toggled when clicked", () => {
            label.simulate("click");

            expect(checkbox.props().checked).toBe(true);

            label.simulate("click");

            expect(checkbox.props().checked).toBe(true);
        });

        describe("and unchecked", () => {

            beforeEach(() => {
                sliderProps = {
                    enabled: false,
                    hasError: false,
                    isChecked: false,
                    onClick: () => { console.log("clicked"); },
                    widgetId: "slider"
                };
                slider = shallow(createElement(Slider, sliderProps));
                checkbox = slider.find("input.mx-toggle");
            });

            it("renders a checkbox that is also unchecked", () => {
                expect(checkbox.props().checked).toBe(false);
            });
        });
    });

    describe("that has an error", () => {
        const errorNode = DOM.div(null, "This is an error");

        beforeEach(() => {
            sliderProps = {
                enabled: false,
                hasError: true,
                isChecked: false,
                onClick: () => { console.log("clicked"); },
                widgetId: "slider"
            };
            slider = shallow(createElement(Slider, sliderProps, errorNode));
            checkbox = slider.find("input.mx-toggle");
        });

        it("has the class has-error", () => {
            expect(slider.hasClass("has-error")).toBe(true);
        });

        it("shows the supplied error", () => {
            expect(slider.childAt(2)).toBeElement(errorNode);
        });
    });

    describe("that has no error", () => {
        const errorNode = DOM.div(null, "This is an error");

        beforeEach(() => {
            sliderProps = {
                enabled: false,
                hasError: false,
                isChecked: false,
                onClick: () => { console.log("clicked"); },
                widgetId: "slider"
            };
            slider = shallow(createElement(Slider, sliderProps, errorNode));
            checkbox = slider.find("input.mx-toggle");
        });

        it("does not have the class has-error", () => {
            expect(slider.hasClass("has-error")).toBe(false);
        });

        it("does not show any error", () => {
            expect(slider.childAt(2).type()).toBe(null);
        });
    });
});
