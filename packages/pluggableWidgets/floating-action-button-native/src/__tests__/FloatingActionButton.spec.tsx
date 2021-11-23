import { FloatingActionButtonProps } from "../../typings/FloatingActionButtonProps";
import { FloatingActionButtonStyle } from "../ui/styles";
import { fireEvent, render, waitForElementToBeRemoved } from "@testing-library/react-native";
import { createElement } from "react";
import { FloatingActionButton } from "../FloatingActionButton";
import { actionValue, dynamicValue } from "@mendix/piw-utils-internal";
import { NativeIcon } from "mendix";
import { Icon } from "mendix/components/native/Icon";

describe("FloatingActionButton", () => {
    let defaultProps: FloatingActionButtonProps<FloatingActionButtonStyle>;
    const secondaryButtons = [
        {
            icon: dynamicValue({
                type: "glyph",
                iconClass: "fa-glyph1"
            } as NativeIcon),
            caption: dynamicValue("caption1"),
            onClick: actionValue(true, false)
        },
        {
            icon: dynamicValue({
                type: "glyph",
                iconClass: "fa-glyph2"
            } as NativeIcon),
            caption: dynamicValue("caption2"),
            onClick: actionValue(true, false)
        },
        {
            icon: dynamicValue({
                type: "glyph",
                iconClass: "fa-glyph3"
            } as NativeIcon),
            caption: dynamicValue("caption3"),
            onClick: actionValue(true, false)
        }
    ];

    beforeEach(() => {
        defaultProps = {
            name: "FloatingAction",
            style: [],
            horizontalPosition: "right",
            verticalPosition: "bottom",
            secondaryButtons: []
        };
    });

    it("renders floating action button", () => {
        const component = render(<FloatingActionButton {...defaultProps} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("should open and close when clicked and secondary buttons are defined", async () => {
        const { getByTestId, queryAllByTestId } = render(
            <FloatingActionButton {...defaultProps} secondaryButtons={secondaryButtons} />
        );

        fireEvent(getByTestId("FloatingAction"), "onPress");
        expect(queryAllByTestId(/FloatingAction\$button*/)).toHaveLength(3);

        fireEvent(getByTestId("FloatingAction"), "onPress");
        await waitForElementToBeRemoved(() => queryAllByTestId("FloatingAction$button0"));
        expect(queryAllByTestId(/FloatingAction\$button*/)).toHaveLength(0);
    });

    it("should cancel any events of primary button if secondary buttons exist", () => {
        const mockEvent = actionValue(true, false);
        const { getByTestId } = render(
            <FloatingActionButton {...defaultProps} onClick={mockEvent} secondaryButtons={secondaryButtons} />
        );

        fireEvent(getByTestId("FloatingAction"), "onPress");
        expect(mockEvent.execute).not.toHaveBeenCalled();
    });

    it("should trigger event when clicked and no secondary buttons", () => {
        const mockEvent = actionValue(true, false);
        const { getByTestId } = render(<FloatingActionButton {...defaultProps} onClick={mockEvent} />);

        fireEvent(getByTestId("FloatingAction"), "onPress");
        expect(mockEvent.execute).toHaveBeenCalledTimes(1);
    });

    it("should trigger event on secondary button", () => {
        const { getByTestId } = render(<FloatingActionButton {...defaultProps} secondaryButtons={secondaryButtons} />);

        fireEvent(getByTestId("FloatingAction"), "onPress");
        fireEvent(getByTestId("FloatingAction$button1"), "onPress");
        expect(secondaryButtons[1].onClick.execute).toHaveBeenCalledTimes(1);
    });

    it("should have custom icons on primary button", async () => {
        const icon = dynamicValue({
            type: "glyph",
            iconClass: "fa-glyphNormal"
        } as NativeIcon);
        const iconActive = dynamicValue({
            type: "glyph",
            iconClass: "fa-glyphActive"
        } as NativeIcon);
        const { getByTestId } = render(
            <FloatingActionButton
                {...defaultProps}
                icon={icon}
                iconActive={iconActive}
                secondaryButtons={secondaryButtons}
            />
        );
        const transformStyle = [{ transform: [{ rotate: "-180deg" }] }];

        const iconView = getByTestId("FloatingAction$IconView");
        const iconComponent = iconView.findByType(Icon);
        expect(iconComponent.props.icon).toEqual(icon.value);
        expect(iconView.props.style).not.toEqual(expect.arrayContaining(transformStyle));

        fireEvent(getByTestId("FloatingAction"), "onPress");

        const iconActiveComponent = iconView.findByType(Icon);
        expect(iconActiveComponent.props.icon).toEqual(iconActive.value);
        expect(iconView.props.style).toEqual(expect.arrayContaining(transformStyle));
    });

    it("should have custom icon on secondary button", async () => {
        const { getByTestId } = render(<FloatingActionButton {...defaultProps} secondaryButtons={secondaryButtons} />);

        fireEvent(getByTestId("FloatingAction"), "onPress");
        const secondaryButtonIcon = getByTestId("FloatingAction$button2").findByType(Icon);
        expect(secondaryButtonIcon.props.icon).toEqual(secondaryButtons[2].icon.value);
    });

    it("should have custom caption on secondary button", async () => {
        const { getByTestId, findByText } = render(
            <FloatingActionButton {...defaultProps} secondaryButtons={secondaryButtons} />
        );

        fireEvent(getByTestId("FloatingAction"), "onPress");
        await findByText(secondaryButtons[2].caption.value as string);
    });
});
