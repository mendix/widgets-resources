import { shallow } from "enzyme";
import { createElement } from "react";
import * as Button from "../Button";

describe("ToolbarButton", () => {
    const renderToolbarButton = (props: Button.ButtonProps) => shallow(createElement(Button.ToolbarButton, props));
    const buttonProps: Button.ButtonProps = {
        renderMode: "button",
        buttonStyle: "default",
        iconPosition: "right",
        active: false,
        caption: "",
        onClick: jasmine.any(Function)
    };

    it("renders a button when button is selected", () => {
        const toolbarButton = renderToolbarButton(buttonProps);
        expect(toolbarButton).toBeElement(
            createElement("button", { className: "btn btn-default", onClick: () => jasmine.any(Function) })
        );
    });

    it("renders a link when link is selected", () => {
        const toolbarButton = renderToolbarButton(buttonProps);
        toolbarButton.setProps({ renderMode: "link" });

        expect(toolbarButton).toBeElement(
            createElement("span", { className: "btn btn-link", onClick: () => jasmine.any(Function) },
                createElement("a")
            )
        );
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
