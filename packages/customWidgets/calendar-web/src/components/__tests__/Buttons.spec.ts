import { shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";
import * as Button from "../Button";

describe("ToolbarButton", () => {
    const renderToolbarButton = (props: Button.ButtonProps): ShallowWrapper<Button.ButtonProps, any> =>
        shallow(createElement(Button.ToolbarButton, props));
    const buttonProps: Button.ButtonProps = {
        renderMode: "button",
        buttonStyle: "default",
        iconPosition: "right",
        active: false,
        caption: "",
        onClick: expect.any(Function)
    };

    it("renders a button when button is selected", () => {
        const toolbarButton = renderToolbarButton(buttonProps);

        expect(toolbarButton).toMatchSnapshot();
    });

    it("renders a link when link is selected", () => {
        const toolbarButton = renderToolbarButton(buttonProps);
        toolbarButton.setProps({ renderMode: "link" });

        expect(toolbarButton).toMatchSnapshot();
    });

    it("renders with a icon on the left if icon position === `right`", () => {
        const toolbarButton = renderToolbarButton(buttonProps);
        toolbarButton.setProps({ iconPosition: "right" });
        const icons = "";
        const iconPosition = "right";
        const content = "";
        const icon = Button.addIcon(icons, iconPosition, content);

        expect(icon).toEqual("");
    });

    it("renders with a icon on the left if icon position === `left`", () => {
        const toolbarButton = renderToolbarButton(buttonProps);
        toolbarButton.setProps({ iconPosition: "left" });
        const icons = "";
        const iconPosition = "left";
        const content = "";
        const icon = Button.addIcon(icons, iconPosition, content);

        expect(icon).toEqual("");
    });
});
