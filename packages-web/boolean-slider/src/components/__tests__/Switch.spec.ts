import { ShallowWrapper, shallow } from "enzyme";
import { DOM, createElement } from "react";

import { Slider, SliderProps } from "../Switch";
import { Alert } from "../Alert";

describe("Switch", () => {
    let slider: ShallowWrapper<SliderProps, any>;
    let checkbox: ShallowWrapper<any, any>;
    let label: ShallowWrapper<any, any>;
    const createAndFindElements = (props: SliderProps) => {
        slider = shallow(createElement(Slider, props));
        checkbox = slider.find(".widget-switch-checkbox");
        label = slider.find(".widget-switch-btn");
    };
    const createProps = (props: Partial<SliderProps>): SliderProps => {
        props.onClick = jasmine.createSpy("onClick");
        props.isChecked = typeof props.isChecked !== "undefined" ? props.isChecked : true;
        props.status = props.status || "enabled";
        return props as SliderProps;
    };

    it("should render the full slider structure", () => {
        createAndFindElements(createProps({}));

        expect(slider).toBeElement(
            DOM.div({ className: "widget-switch" },
                DOM.input({
                    checked: true,
                    className: "widget-switch-checkbox enabled",
                    readOnly: true,
                    type: "checkbox"
                }),
                DOM.div({
                    className: "widget-switch-btn enabled",
                    onClick: jasmine.any(Function) as any
                }),
                createElement(Alert)
            )
        );
    });

    describe("that is true", () => {
        it("should be checked", () => {
            createAndFindElements(createProps({}));

            expect(checkbox.props().checked).toBe(true);
        });
    });

    describe("that is false", () => {
        it("should be unchecked", () => {
            createAndFindElements(createProps({ isChecked: false }));

            expect(checkbox.props().checked).toBe(false);
        });
    });

    describe("that is enabled", () => {
        it("should have the enabled class", () => {
            createAndFindElements(createProps({}));

            expect(checkbox.hasClass("enabled")).toBe(true);
            expect(label.hasClass("enabled")).toBe(true);
        });

        it("should handle click event", () => {
            const props = createProps({});
            createAndFindElements(props);

            label.simulate("click");

            expect(props.onClick).toHaveBeenCalled();
        });
    });

    describe("that is disabled", () => {
        it("should not have the enabled class", () => {
            createAndFindElements(createProps({ status: "disabled" }));

            expect(checkbox.hasClass("enabled")).toBe(false);
            expect(label.hasClass("enabled")).toBe(false);
        });

        it("should not handle a click event", () => {
            const props = createProps({ status: "disabled" });
            createAndFindElements(props);

            label.simulate("click");

            expect(props.onClick).not.toHaveBeenCalled();
        });
    });

    describe("without a context", () => {
        it("should have the no-slider class", () => {
            createAndFindElements(createProps({
                isChecked: false,
                status: "no-context"
            }));

            expect(label).toHaveClass("no-slider");
        });

        it("should not handle a click event", () => {
            const props = createProps({ status: "no-context" });
            createAndFindElements(props);

            label.simulate("click");

            expect(props.onClick).not.toHaveBeenCalled();
        });
    });

    describe("that has an error", () => {
        it("should render the structure with an error alert", () => {
            const props = createProps({
                alertMessage: "This is an error",
                isChecked: false
            });
            createAndFindElements(props);

            expect(slider).toBeElement(
                DOM.div({ className: "widget-switch has-error" },
                    DOM.input({
                        checked: false,
                        className: "widget-switch-checkbox enabled",
                        readOnly: true,
                        type: "checkbox"
                    }),
                    DOM.div({
                        className: "widget-switch-btn enabled",
                        onClick: jasmine.any(Function) as any
                    }),
                    createElement(Alert as any, { message: props.alertMessage })
                )
            );
        });
    });
});
