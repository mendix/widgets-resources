import { ShallowWrapper, shallow } from "enzyme";
import { DOM, createElement } from "react";

import { Switch, SwitchProps } from "../Switch";
import { Alert } from "../Alert";

describe("Switch", () => {
    let switchWrapper: ShallowWrapper<SwitchProps, any>;
    let checkbox: ShallowWrapper<any, any>;
    let switchButtonWrapper: ShallowWrapper<any, any>;
    let switchButton: ShallowWrapper<any, any>;
    const createAndFindElements = (props: SwitchProps) => {
        switchWrapper = shallow(createElement(Switch, props));
        checkbox = switchWrapper.find(".widget-switch-checkbox");
        switchButtonWrapper = switchWrapper.find(".widget-switch-btn-wrapper");
        switchButton = switchWrapper.find(".widget-switch-btn");
    };
    const createProps = (props: Partial<SwitchProps>): SwitchProps => {
        props.onClick = jasmine.createSpy("onClick");
        props.isChecked = typeof props.isChecked !== "undefined" ? props.isChecked : true;
        props.status = props.status || "enabled";
        return props as SwitchProps;
    };

    it("should render the structure correctly", () => {
        createAndFindElements(createProps({}));

        expect(switchWrapper).toBeElement(
            DOM.div({ className: "widget-switch" },
                DOM.input({
                    checked: true,
                    className: "widget-switch-checkbox enabled",
                    readOnly: true,
                    type: "checkbox"
                }),
                DOM.div(
                    {
                        className: "widget-switch-btn-wrapper enabled",
                        onClick: jasmine.any(Function) as any
                    },
                    DOM.small({ className: "widget-switch-btn right" })
                ),
                createElement(Alert)
            )
        );
    });

    describe("that is true", () => {
        it("should be on", () => {
            createAndFindElements(createProps({}));

            expect(checkbox.props().checked).toBe(true);
        });
    });

    describe("that is false", () => {
        it("should be off", () => {
            createAndFindElements(createProps({ isChecked: false }));

            expect(checkbox.props().checked).toBe(false);
        });
    });

    describe("that is enabled", () => {
        it("should not have the disabled class", () => {
            createAndFindElements(createProps({}));

            expect(checkbox.hasClass("enabled")).toBe(true);
            expect(switchButtonWrapper.hasClass("enabled")).toBe(false);
        });

        it("should handle click events", () => {
            const props = createProps({});
            createAndFindElements(props);

            switchButtonWrapper.simulate("click");

            expect(props.onClick).toHaveBeenCalled();
        });
    });

    describe("that is disabled", () => {
        it("should have the disabled class", () => {
            createAndFindElements(createProps({ status: "disabled" }));

            expect(checkbox.hasClass("enabled")).toBe(false);
            expect(switchButtonWrapper.hasClass("disabled")).toBe(true);
        });

        it("should not handle a click event", () => {
            const props = createProps({ status: "disabled" });
            createAndFindElements(props);

            switchButton.simulate("click");

            expect(props.onClick).not.toHaveBeenCalled();
        });
    });

    describe("without a context", () => {
        it("should have the no-switch class", () => {
            createAndFindElements(createProps({
                isChecked: false,
                status: "no-context"
            }));

            expect(switchButtonWrapper).toHaveClass("no-switch");
        });

        it("should not handle a click event", () => {
            const props = createProps({ status: "no-context" });
            createAndFindElements(props);

            switchButton.simulate("click");

            expect(props.onClick).not.toHaveBeenCalled();
        });
    });

    describe("that has an error", () => {
        it("should render an error alert", () => {
            const props = createProps({
                alertMessage: "This is an error",
                isChecked: false
            });
            createAndFindElements(props);

            expect(switchWrapper).toBeElement(
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
