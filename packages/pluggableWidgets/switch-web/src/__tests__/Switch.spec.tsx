import { actionValue, EditableValueBuilder, Alert, AlertProps } from "@mendix/piw-utils-internal";
import { mount, ReactWrapper } from "enzyme";
import { createElement } from "react";

import SwitchComponent, { SwitchProps } from "../components/Switch";
import { SwitchContainerProps } from "../../typings/SwitchProps";
import { Switch } from "../Switch";

describe("Switch", () => {
    let switchWrapper: ReactWrapper<SwitchContainerProps, any>;
    let switchComponent: ReactWrapper<SwitchProps, any>;
    let switchComponentWrapper: ReactWrapper<any, any>;
    let switchButtonWrapper: ReactWrapper<any, any>;
    let switchButton: ReactWrapper<any, any>;
    let alert: ReactWrapper<AlertProps, any>;
    const createAndFindElements = (props: SwitchContainerProps): void => {
        switchWrapper = mount(<Switch {...props} />);
        switchComponent = switchWrapper.find(SwitchComponent);
        switchComponentWrapper = switchComponent.find(".widget-switch");
        switchButtonWrapper = switchComponent.find(".widget-switch-btn-wrapper");
        switchButton = switchComponent.find(".widget-switch-btn");
        alert = switchComponent.find(Alert);
    };
    const createProps = (props?: Partial<SwitchContainerProps>): SwitchContainerProps => {
        const defaultProps: SwitchContainerProps = {
            name: "switch",
            class: "company-switch-widget",
            style: { color: "red" },
            tabIndex: 0,
            id: "com.mendix.widgets.custom.switch1",
            booleanAttribute: new EditableValueBuilder<boolean>().withValue(false).build(),
            action: undefined
        };

        return { ...defaultProps, ...props };
    };

    it("with editable value renders the structure correctly", () => {
        createAndFindElements(
            createProps({
                booleanAttribute: new EditableValueBuilder<boolean>().withValue(false).build()
            })
        );

        expect(switchWrapper).toMatchSnapshot();
    });

    it("with readonly value renders the structure correctly", () => {
        createAndFindElements(
            createProps({
                booleanAttribute: new EditableValueBuilder<boolean>().isReadOnly().withValue(false).build()
            })
        );

        expect(switchWrapper).toMatchSnapshot();
    });

    it("without validation message renders correctly", () => {
        createAndFindElements(
            createProps({
                booleanAttribute: new EditableValueBuilder<boolean>().withValue(false).build()
            })
        );

        expect(alert).toMatchSnapshot();
    });

    it("with validation message renders correctly", () => {
        createAndFindElements(
            createProps({
                booleanAttribute: new EditableValueBuilder<boolean>().withValidation("error").withValue(false).build()
            })
        );

        expect(alert).toMatchSnapshot();
    });

    it("when value is false renders with correct attributes", () => {
        createAndFindElements(createProps());

        expect(switchButtonWrapper.hasClass("un-checked")).toBe(true);
        expect(switchButtonWrapper.hasClass("checked")).toBe(false);
        expect(switchButtonWrapper.props()["aria-checked"]).toBe(false);
        expect(switchButton.hasClass("left")).toBe(true);
        expect(switchButton.hasClass("right")).toBe(false);
    });

    it("when value is true renders with correct attributes", () => {
        createAndFindElements(
            createProps({ booleanAttribute: new EditableValueBuilder<boolean>().withValue(true).build() })
        );

        expect(switchButtonWrapper.hasClass("un-checked")).toBe(false);
        expect(switchButtonWrapper.hasClass("checked")).toBe(true);
        expect(switchButtonWrapper.props()["aria-checked"]).toBe(true);
        expect(switchButton.hasClass("left")).toBe(false);
        expect(switchButton.hasClass("right")).toBe(true);
    });

    it("with iOS device style renders correct class", () => {
        createAndFindElements(createProps({ class: "iOS" }));
        expect(switchComponentWrapper.hasClass("iOS")).toBe(true);
    });

    it("with android device style renders correct class", () => {
        createAndFindElements(createProps({ class: "android" }));

        expect(switchComponentWrapper.hasClass("android")).toBe(true);
    });

    it("with tabIndex passed renders correctly", () => {
        createAndFindElements(createProps({ tabIndex: 1 }));

        expect(switchButtonWrapper.props().tabIndex).toEqual(1);
    });

    it("without tabIndex passed renders correctly", () => {
        createAndFindElements(createProps({ tabIndex: undefined }));

        expect(switchButtonWrapper.props().tabIndex).toEqual(0);
    });

    describe("when editable", () => {
        it("renders elements with correct attributes", () => {
            createAndFindElements(createProps());

            expect(switchButtonWrapper.hasClass("disabled")).toBe(false);
            expect(switchButtonWrapper.props()["aria-readonly"]).toBe(false);
        });

        it("invokes preventDefault onClick", () => {
            const props = createProps({ action: actionValue() });
            createAndFindElements(props);
            const eventMock = { preventDefault: jest.fn() };

            switchButtonWrapper.simulate("click", eventMock);

            expect(eventMock.preventDefault).toHaveBeenCalled();
        });

        it("invokes preventDefault on space keydown", () => {
            const props = createProps({ action: actionValue() });
            createAndFindElements(props);
            const eventMock = { preventDefault: jest.fn(), key: " " };

            switchButtonWrapper.simulate("keydown", eventMock);

            expect(eventMock.preventDefault).toHaveBeenCalled();
        });

        it("invokes action on click", () => {
            const props = createProps({ action: actionValue() });
            createAndFindElements(props);

            switchButtonWrapper.simulate("click");

            expect(props.action?.execute).toHaveBeenCalled();
        });

        it("invokes action on space keydown", () => {
            const props = createProps({ action: actionValue() });
            createAndFindElements(props);

            switchButtonWrapper.simulate("keydown", { key: " " });

            expect(props.action?.execute).toHaveBeenCalled();
        });

        it("shouldn't invoke action on keydown of any key but space", () => {
            const props = createProps({ action: actionValue() });
            createAndFindElements(props);

            switchButtonWrapper.simulate("keydown", { key: "enter" });

            expect(props.action?.execute).not.toHaveBeenCalled();
        });

        describe("when value is available", () => {
            it("toggles the attributes value onClick", () => {
                const props = createProps({
                    booleanAttribute: new EditableValueBuilder<boolean>().withValue(false).build()
                });
                createAndFindElements(props);

                switchButton.simulate("click");

                expect(props.booleanAttribute.setValue).toHaveBeenCalled();
                expect(props.booleanAttribute.value).toEqual(true);

                switchButton.simulate("click");

                expect(props.booleanAttribute.setValue).toHaveBeenCalled();
                expect(props.booleanAttribute.value).toEqual(false);
            });

            it("toggles the attribute value on space keydown", () => {
                const props = createProps({
                    booleanAttribute: new EditableValueBuilder<boolean>().withValue(false).build()
                });
                createAndFindElements(props);

                switchButton.simulate("keydown", { key: " " });

                expect(props.booleanAttribute.setValue).toHaveBeenCalled();
                expect(props.booleanAttribute.value).toEqual(true);

                switchButton.simulate("keydown", { key: " " });

                expect(props.booleanAttribute.setValue).toHaveBeenCalled();
                expect(props.booleanAttribute.value).toEqual(false);
            });

            it("shouldn't toggle the attribute on keydown of any key but space", () => {
                const props = createProps({
                    booleanAttribute: new EditableValueBuilder<boolean>().withValue(false).build()
                });
                createAndFindElements(props);

                switchButton.simulate("keydown", { key: "enter" });

                expect(props.booleanAttribute.setValue).not.toHaveBeenCalled();
            });
        });
    });

    describe("when readonly", () => {
        it("renders elements with correct attributes", () => {
            createAndFindElements(
                createProps({ booleanAttribute: new EditableValueBuilder<boolean>().isReadOnly().build() })
            );

            expect(switchButtonWrapper.hasClass("disabled")).toBe(true);
            expect(switchButtonWrapper.props()["aria-readonly"]).toBe(true);
        });

        it("shouldn't invoke action", () => {
            const props = createProps({
                booleanAttribute: new EditableValueBuilder<boolean>().isReadOnly().build(),
                action: actionValue()
            });
            createAndFindElements(props);

            switchButton.simulate("click");

            expect(props.action?.execute).not.toHaveBeenCalled();
        });

        it("shouldn't change the attributes value", () => {
            const props = createProps({
                booleanAttribute: new EditableValueBuilder<boolean>().isReadOnly().build()
            });
            createAndFindElements(props);

            switchButton.simulate("click");

            expect(props.booleanAttribute.setValue).not.toHaveBeenCalled();
        });

        it("invokes preventDefault onClick", () => {
            const props = createProps({ action: actionValue() });
            createAndFindElements(props);
            const eventMock = { preventDefault: jest.fn() };

            switchButtonWrapper.simulate("click", eventMock);

            expect(eventMock.preventDefault).toHaveBeenCalled();
        });

        it("invokes preventDefault on keydown space", () => {
            const props = createProps({ action: actionValue() });
            createAndFindElements(props);
            const eventMock = { preventDefault: jest.fn(), key: " " };

            switchButtonWrapper.simulate("keydown", eventMock);

            expect(eventMock.preventDefault).toHaveBeenCalled();
        });
    });
});
