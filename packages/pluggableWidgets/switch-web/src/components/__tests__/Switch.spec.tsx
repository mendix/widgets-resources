import { ShallowWrapper, shallow } from "enzyme";
import { createElement } from "react";

import { Switch } from "../../Switch";
// import { actionValue, EditableValueBuilder } from "@mendix/piw-utils-internal";
import { actionValue, EditableValueBuilder } from "@mendix/piw-utils-internal";
import { SwitchContainerProps } from "../../../typings/SwitchProps";
import { Alert } from "../Alert";

describe("Switch", () => {
    let switchWrapper: ShallowWrapper<SwitchContainerProps, any>;
    let checkbox: ShallowWrapper<any, any>;
    let switchButtonWrapper: ShallowWrapper<any, any>;
    let switchButton: ShallowWrapper<any, any>;
    const createAndFindElements = (props: SwitchContainerProps): void => {
        switchWrapper = shallow(createElement(Switch, props));
        checkbox = switchWrapper.find(".widget-switch-checkbox");
        switchButtonWrapper = switchWrapper.find(".widget-switch-btn-wrapper");
        switchButton = switchWrapper.find(".widget-switch-btn");
    };
    const createProps = (props?: Partial<SwitchContainerProps>): SwitchContainerProps => {
        const defaultProps: SwitchContainerProps = {
            name: "switch",
            class: "",
            style: undefined,
            tabIndex: 0,
            id: "com.mendix.widgets.custom.switch1",
            booleanAttribute: new EditableValueBuilder<boolean>().withValue(false).build(),
            action: undefined,
            deviceStyle: "auto"
        };

        return { ...defaultProps, ...props };
    };

    it("should render the structure correctly", () => {
        createAndFindElements(
            createProps({
                booleanAttribute: new EditableValueBuilder<boolean>().withValue(true).build()
            })
        );

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
                        "aria-labelledby": "com.mendix.widgets.custom.switch1",
                        role: "checkbox",
                        tabIndex: 0
                    },
                    createElement("small", { className: "widget-switch-btn right" })
                ),
                createElement(Alert)
            )
        );
    });

    it("that is true should be on", () => {
        createAndFindElements(
            createProps({ booleanAttribute: new EditableValueBuilder<boolean>().withValue(true).build() })
        );

        expect(checkbox.props().checked).toBe(true);
    });

    it("that is false should be off", () => {
        createAndFindElements(createProps());

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
            const props = createProps({ action: actionValue() });
            createAndFindElements(props);

            switchButtonWrapper.simulate("click");

            expect(props.action?.execute).toHaveBeenCalled();
        });
    });

    describe("that is disabled", () => {
        it("should have the disabled class", () => {
            createAndFindElements(
                createProps({ booleanAttribute: new EditableValueBuilder<boolean>().isReadOnly().build() })
            );

            expect(checkbox.hasClass("enabled")).toBe(false);
            expect(switchButtonWrapper.hasClass("disabled")).toBe(true);
        });

        it("should not handle a click event", () => {
            const props = createProps({
                booleanAttribute: new EditableValueBuilder<boolean>().isReadOnly().build(),
                action: actionValue()
            });
            createAndFindElements(props);

            switchButton.simulate("click");

            expect(props.action?.execute).not.toHaveBeenCalled();
        });
    });
});
