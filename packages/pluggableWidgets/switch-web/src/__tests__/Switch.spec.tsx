import { actionValue, EditableValueBuilder, Alert, AlertProps } from "@mendix/piw-utils-internal";
import { mount, ReactWrapper } from "enzyme";
import { createElement } from "react";

import SwitchComponent, { SwitchProps } from "../components/Switch";
import { SwitchContainerProps } from "../../typings/SwitchProps";
import Switch from "../Switch";

describe("Switch", () => {
    let switchWrapper: ReactWrapper<SwitchContainerProps, any>;
    let switchComponent: ReactWrapper<SwitchProps, any>;
    let switchComponentWrapper: ReactWrapper<any, any>;
    let checkbox: ReactWrapper<any, any>;
    let switchButtonWrapper: ReactWrapper<any, any>;
    let switchButton: ReactWrapper<any, any>;
    let alert: ReactWrapper<AlertProps, any>;
    const createAndFindElements = (props: SwitchContainerProps): void => {
        switchWrapper = mount(createElement(Switch, props));
        switchComponent = switchWrapper.find(SwitchComponent);
        switchComponentWrapper = switchComponent.find(".widget-switch");
        checkbox = switchComponent.find(".widget-switch-checkbox");
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
            action: undefined,
            deviceStyle: "auto"
        };

        return { ...defaultProps, ...props };
    };

    it("with editable value should render the structure correctly", () => {
        createAndFindElements(
            createProps({
                booleanAttribute: new EditableValueBuilder<boolean>().withValue(false).build()
            })
        );

        expect(switchWrapper).toMatchSnapshot();
    });

    it("with readonly value should render the structure correctly", () => {
        createAndFindElements(
            createProps({
                booleanAttribute: new EditableValueBuilder<boolean>().isReadOnly().withValue(false).build()
            })
        );

        expect(switchWrapper).toMatchSnapshot();
    });

    it("without validation message should render correctly", () => {
        createAndFindElements(
            createProps({
                booleanAttribute: new EditableValueBuilder<boolean>().withValue(false).build()
            })
        );

        expect(alert).toMatchSnapshot();
    });

    it("with validation message should render correctly", () => {
        createAndFindElements(
            createProps({
                booleanAttribute: new EditableValueBuilder<boolean>().withValidation("error").withValue(false).build()
            })
        );

        expect(alert).toMatchSnapshot();
    });

    it("when value is false should have the correct checkbox attribute", () => {
        createAndFindElements(createProps());

        expect(checkbox.props().checked).toBe(false);
    });

    it("when value is true should have the correct checkbox attribute", () => {
        createAndFindElements(
            createProps({ booleanAttribute: new EditableValueBuilder<boolean>().withValue(true).build() })
        );

        expect(checkbox.props().checked).toBe(true);
    });

    it("with iOS device style should render correct class", () => {
        createAndFindElements(createProps({ deviceStyle: "iOS" }));
        console.log(switchComponentWrapper);
        expect(switchComponentWrapper.hasClass("iOS")).toBe(true);
    });

    it("with android device style should render correct class", () => {
        createAndFindElements(createProps({ deviceStyle: "android" }));

        expect(switchComponentWrapper.hasClass("android")).toBe(true);
    });

    it("with auto device style should render correct class", () => {
        createAndFindElements(createProps({ deviceStyle: "auto" }));

        expect(switchComponentWrapper.hasClass("auto")).toBe(true);
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
        it("should render elements with correct attributes", () => {
            createAndFindElements(createProps());

            expect(checkbox.hasClass("enabled")).toBe(true);
            expect(switchButtonWrapper.hasClass("enabled")).toBe(false);
        });

        it("should invoke preventDefault onClick", () => {
            const props = createProps({ action: actionValue() });
            createAndFindElements(props);
            const eventMock = { preventDefault: jest.fn() };

            switchButtonWrapper.simulate("click", eventMock);

            expect(eventMock.preventDefault).toHaveBeenCalled();
        });

        it("should invoke preventDefault on space keydown", () => {
            const props = createProps({ action: actionValue() });
            createAndFindElements(props);
            const eventMock = { preventDefault: jest.fn(), key: " " };

            switchButtonWrapper.simulate("keydown", eventMock);

            expect(eventMock.preventDefault).toHaveBeenCalled();
        });

        it("should invoke action on click", () => {
            const props = createProps({ action: actionValue() });
            createAndFindElements(props);

            switchButtonWrapper.simulate("click");

            expect(props.action?.execute).toHaveBeenCalled();
        });

        it("should invoke action on space keydown", () => {
            const props = createProps({ action: actionValue() });
            createAndFindElements(props);

            switchButtonWrapper.simulate("keydown", { key: " " });

            expect(props.action?.execute).toHaveBeenCalled();
        });

        it("should not invoke action on keydown of any key but space", () => {
            const props = createProps({ action: actionValue() });
            createAndFindElements(props);

            switchButtonWrapper.simulate("keydown", { key: "enter" });

            expect(props.action?.execute).not.toHaveBeenCalled();
        });

        describe("when value is available", () => {
            it("should toggle the attributes value onClick", () => {
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

            it("should toggle the attribute value on space keydown", () => {
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

            it("should not toggle the attribute on keydown of any key but space", () => {
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
        it("should render elements with correct attributes", () => {
            createAndFindElements(
                createProps({ booleanAttribute: new EditableValueBuilder<boolean>().isReadOnly().build() })
            );

            expect(checkbox.hasClass("enabled")).toBe(false);
            expect(switchButtonWrapper.hasClass("disabled")).toBe(true);
        });

        it("should not invoke action", () => {
            const props = createProps({
                booleanAttribute: new EditableValueBuilder<boolean>().isReadOnly().build(),
                action: actionValue()
            });
            createAndFindElements(props);

            switchButton.simulate("click");

            expect(props.action?.execute).not.toHaveBeenCalled();
        });

        it("should not change the attributes value", () => {
            const props = createProps({
                booleanAttribute: new EditableValueBuilder<boolean>().isReadOnly().build()
            });
            createAndFindElements(props);

            switchButton.simulate("click");

            expect(props.booleanAttribute.setValue).not.toHaveBeenCalled();
        });

        it("should invoke preventDefault onClick", () => {
            const props = createProps({ action: actionValue() });
            createAndFindElements(props);
            const eventMock = { preventDefault: jest.fn() };

            switchButtonWrapper.simulate("click", eventMock);

            expect(eventMock.preventDefault).toHaveBeenCalled();
        });

        it("should invoke preventDefault on keydown space", () => {
            const props = createProps({ action: actionValue() });
            createAndFindElements(props);
            const eventMock = { preventDefault: jest.fn(), key: " " };

            switchButtonWrapper.simulate("keydown", eventMock);

            expect(eventMock.preventDefault).toHaveBeenCalled();
        });
    });
});
