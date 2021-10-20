/**
 * @jest-environment jsdom
 */
import { actionValue, EditableValueBuilder } from "@mendix/piw-utils-internal";
import { mount, ReactWrapper } from "enzyme";
import { createElement } from "react";

import { Switch, Props } from "../Switch";
import { defaultSwitchStyle } from "../ui/Styles";

declare type RWrapper = ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

const name = "Switch1";
const labelWidth = 3;
const createProps = (props?: Partial<Props>): Props => {
    const style = props?.style ?? {};
    const defaultProps: Props = {
        name,
        label: "Label",
        labelWidth,
        labelOrientation: "horizontal",
        showLabel: false,
        booleanAttribute: new EditableValueBuilder<boolean>().withValue(false).build(),
        onChange: undefined,
        style: [{ ...defaultSwitchStyle, ...style }]
    };

    return { ...defaultProps, ...props };
};

describe("Switch", () => {
    const switchIndex = 0;
    let Platform: any;
    let switchWrapper: RWrapper;

    function getSwitchComponent() {
        return switchWrapper.find({ testID: "Switch1" }).at(switchIndex);
    }

    beforeEach(() => {
        Platform = require("react-native").Platform;
    });

    afterEach(() => {
        switchWrapper.unmount();
    });

    it("with editable value renders enabled", () => {
        const props = createProps({
            booleanAttribute: new EditableValueBuilder<boolean>().withValue(false).build()
        });

        switchWrapper = mount(<Switch {...props} />);
        expect(getSwitchComponent().prop("disabled")).toBe(false);
    });

    it("with value in readOnly state renders disabled", () => {
        const props = createProps({
            booleanAttribute: new EditableValueBuilder<boolean>().withValue(false).isReadOnly().build()
        });

        switchWrapper = mount(<Switch {...props} />);
        expect(getSwitchComponent().prop("disabled")).toBe(true);
    });

    it("with showLabel true renders label", () => {
        const props = createProps({
            showLabel: true
        });

        switchWrapper = mount(<Switch {...props} />);
        expect(switchWrapper.exists({ testID: `${name}$label` })).toEqual(true);
    });

    it("with showLabel true renders label horizontally", () => {
        const props = createProps({
            showLabel: true
        });

        switchWrapper = mount(<Switch {...props} />);
        expect(
            switchWrapper
                .find({ testID: `${name}$label` })
                .at(1)
                .prop("style")
        ).toEqual(expect.arrayContaining([{ flex: labelWidth }]));
        expect(
            switchWrapper
                .find({ testID: `${name}$wrapper` })
                .at(1)
                .prop("style")
        ).toEqual(expect.arrayContaining([{ flexDirection: "row", alignItems: "center" }]));
    });

    it("with showLabel true and labelWidth 5, increases label width", () => {
        const customLabelWidth = 5;
        const props = createProps({
            showLabel: true,
            labelWidth: customLabelWidth
        });

        switchWrapper = mount(<Switch {...props} />);
        expect(
            switchWrapper
                .find({ testID: `${name}$label` })
                .at(1)
                .prop("style")
        ).toEqual(expect.arrayContaining([{ flex: customLabelWidth }]));
    });

    it("with showLabel true and labelOrientation vertical, renders vertical", () => {
        const props = createProps({
            showLabel: true,
            labelOrientation: "vertical"
        });

        switchWrapper = mount(<Switch {...props} />);
        expect(
            switchWrapper
                .find({ testID: `${name}$label` })
                .at(1)
                .prop("style")
        ).toEqual(expect.not.arrayContaining([{ flex: labelWidth }]));

        expect(
            switchWrapper
                .find({ testID: `${name}$wrapper` })
                .at(1)
                .prop("style")
        ).toEqual(expect.not.arrayContaining([{ flexDirection: "row", alignItems: "center" }]));
    });

    it("with error renders validation message", () => {
        const props = createProps({
            booleanAttribute: new EditableValueBuilder<boolean>().withValidation("error").withValue(false).build()
        });

        switchWrapper = mount(<Switch {...props} />);
        expect(switchWrapper.prop("booleanAttribute").validation).toEqual("error");

        expect(switchWrapper.exists({ testID: `${name}$alert` })).toEqual(true);
        expect(
            switchWrapper
                .find({ testID: `${name}$alert` })
                .at(1)
                .text()
        ).toEqual("error");
    });

    it("with iOS device renders correct property", () => {
        Platform.OS = "ios";
        const props = createProps();

        switchWrapper = mount(<Switch {...props} />);
        expect(getSwitchComponent().props()).toEqual(expect.objectContaining({ ios_backgroundColor: undefined }));
    });

    it("with android device renders property", () => {
        Platform.OS = "android";
        const props = createProps();

        switchWrapper = mount(<Switch {...props} />);
        expect(getSwitchComponent().prop("ios_backgroundColor")).toBeUndefined();
    });

    it("renders correct thumbColor when value is true", () => {
        const props = createProps({
            booleanAttribute: new EditableValueBuilder<boolean>().withValue(true).build(),
            style: [{ ...defaultSwitchStyle, input: { thumbColorOn: "red" } }]
        });

        switchWrapper = mount(<Switch {...props} />);
        expect(getSwitchComponent().prop("thumbColor")).toEqual("red");
    });

    it("renders correct thumbColor when value is false", () => {
        const props = createProps({
            booleanAttribute: new EditableValueBuilder<boolean>().withValue(false).build(),
            style: [{ ...defaultSwitchStyle, input: { thumbColorOff: "blue" } }]
        });

        switchWrapper = mount(<Switch {...props} />);
        expect(getSwitchComponent().prop("thumbColor")).toEqual("blue");
    });

    describe("interactions", () => {
        it("invokes onValueChange handler", () => {
            const props = createProps({
                booleanAttribute: new EditableValueBuilder<boolean>().withValue(false).build(),
                onChange: actionValue()
            });
            switchWrapper = mount(<Switch {...props} />);

            expect(switchWrapper.prop("booleanAttribute").value).toBe(false);
            expect(switchWrapper.prop("onChange").execute).not.toHaveBeenCalled();

            getSwitchComponent().simulate("change");

            expect(switchWrapper.prop("booleanAttribute").value).toBe(true);
            expect(switchWrapper.prop("onChange").execute).toHaveBeenCalled();
        });

        it("when disabled, do not invoke onValueChange handler", () => {
            const props = createProps({
                booleanAttribute: new EditableValueBuilder<boolean>().withValue(false).isReadOnly().build(),
                onChange: actionValue()
            });
            switchWrapper = mount(<Switch {...props} />);

            expect(switchWrapper.prop("booleanAttribute").value).toBe(false);
            expect(switchWrapper.prop("onChange").execute).not.toHaveBeenCalled();

            getSwitchComponent().simulate("change");

            expect(switchWrapper.prop("booleanAttribute").value).toBe(false);
            expect(switchWrapper.prop("onChange").execute).not.toHaveBeenCalled();
        });
    });
});
