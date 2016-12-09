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

    beforeEach(() => {
        sliderProps = {
            enabled: true,
            isChecked: true,
            onClick: () => { console.log("clicked"); }
        };
        createAndFindElements(sliderProps);
    });

    it("renders structure correctly", () => {
        // toBeElement & toMatchStructure were returning unexpected errors
        expect(slider.children().length).toBe(2);
        expect(slider.children().first().type()).toBe("input");
        expect(slider.childAt(1).type()).toBe("div");

        expect(checkbox.props().type).toBe("checkbox");
        expect(checkbox.hasClass("enabled")).toBe(true);
        expect(checkbox.props().checked).toBe(true);

        expect(label.hasClass("enabled")).toBe(true);
        expect(typeof label.props().onClick).toBe("function");
    });

    describe("that is checked", () => {
        beforeEach(() => {
            sliderProps = {
                enabled: true,
                isChecked: true,
                onClick: () => {
                    sliderProps.isChecked = false;
                    slider.setProps(sliderProps);
                    checkbox = slider.find("input.widget-boolean-slider-checkbox");
                }
            };
            createAndFindElements(sliderProps);
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
                    checkbox = slider.find("input.widget-boolean-slider-checkbox");
                }
            };
            createAndFindElements(sliderProps);
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
                    checkbox = slider.find("input.widget-boolean-slider-checkbox");
                }
            };
            createAndFindElements(sliderProps);
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
                    onClick: () => { console.log("clicked"); }
                };
                createAndFindElements(sliderProps);
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
                    checkbox = slider.find("input.widget-boolean-slider-checkbox");
                }
            };
            createAndFindElements(sliderProps);
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
                    onClick: () => { console.log("clicked"); }
                };
                createAndFindElements(sliderProps);
            });

            it("renders a checkbox that is also unchecked", () => {
                expect(checkbox.props().checked).toBe(false);
            });
        });
    });

    describe("that has an error", () => {
        beforeEach(() => {
            sliderProps = {
                enabled: false,
                hasError: true,
                isChecked: false,
                onClick: () => { console.log("clicked"); }
            };
            createAndFindElements(sliderProps, errorNode);
        });

        it("has the class has-error", () => {
            expect(slider.hasClass("has-error")).toBe(true);
        });

        it("shows the supplied error", () => {
            expect(slider.childAt(2)).toBeElement(errorNode);
        });
    });

    describe("that has no error", () => {
        beforeEach(() => {
            sliderProps = {
                enabled: false,
                hasError: false,
                isChecked: false,
                onClick: () => { console.log("clicked"); }
            };
            createAndFindElements(sliderProps, errorNode);
        });

        it("does not have the class has-error", () => {
            expect(slider.hasClass("has-error")).toBe(false);
        });

        it("does not show any error", () => {
            expect(slider.childAt(2).type()).toBe(null);
        });
    });
});
