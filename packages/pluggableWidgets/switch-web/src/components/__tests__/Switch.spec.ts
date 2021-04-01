import { ShallowWrapper, shallow } from "enzyme";
import { createElement } from "react";

import { Switch, SwitchProps } from "../../Switch";
import { Alert } from "../Alert";

describe("Switch", () => {
    let switchWrapper: ShallowWrapper<SwitchProps, any>;
    let checkbox: ShallowWrapper<any, any>;
    let switchButtonWrapper: ShallowWrapper<any, any>;
    let switchButton: ShallowWrapper<any, any>;
    const createAndFindElements = (props: SwitchProps): void => {
        switchWrapper = shallow(createElement(Switch, props));
        checkbox = switchWrapper.find(".widget-switch-checkbox");
        switchButtonWrapper = switchWrapper.find(".widget-switch-btn-wrapper");
        switchButton = switchWrapper.find(".widget-switch-btn");
    };
    const createProps = (props: Partial<SwitchProps>): SwitchProps => {
        props.onClick = jest.fn();
        props.isChecked = typeof props.isChecked !== "undefined" ? props.isChecked : true;
        props.status = props.status || "enabled";

        return props as SwitchProps;
    };

    it("should render the structure correctly", () => {
        createAndFindElements(createProps({}));

        expect(switchWrapper.getElement()).toEqual(
            createElement(
                "div",
                { className: "widget-switch auto" },
                createElement("input", {
                    checked: true,
                    className: "widget-switch-checkbox enabled",
                    readOnly: true,
                    type: "checkbox"
                }),
                createElement(
                    "div",
                    {
                        "aria-checked": true,
                        className: "widget-switch-btn-wrapper widget-switch-btn-wrapper-default checked",
                        onClick: expect.any(Function),
                        onKeyDown: expect.any(Function),
                        role: "checkbox",
                        tabIndex: 0
                    },
                    createElement("small", { className: "widget-switch-btn right" })
                ),
                createElement(Alert, { bootstrapStyle: "danger" })
            )
        );
    });

    it("that is true should be on", () => {
        createAndFindElements(createProps({}));

        expect(checkbox.props().checked).toBe(true);
    });

    it("that is false should be off", () => {
        createAndFindElements(createProps({ isChecked: false }));

        expect(checkbox.props().checked).toBe(false);
    });

    it("with the iOS device style renders with the class iOS", () => {
        createAndFindElements(createProps({ deviceStyle: "iOS" }));

        expect(switchWrapper.hasClass("iOS")).toBe(true);
    });

    it("with the android device style renders with the class android", () => {
        createAndFindElements(createProps({ deviceStyle: "android" }));

        expect(switchWrapper.hasClass("android")).toBe(true);
    });

    it("with the auto device style renders with the class auto", () => {
        createAndFindElements(createProps({ deviceStyle: "auto" }));

        expect(switchWrapper.hasClass("auto")).toBe(true);
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
});
