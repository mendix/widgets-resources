import { shallow } from "enzyme";
import { createElement } from "react";
import { ButtonProps, ToolbarButton } from "../Button";

describe("ToolbarButton", () => {
    const renderToolbarButton = (props: ButtonProps) => shallow(createElement(ToolbarButton, props));
    const buttonProps: ButtonProps = {
        renderMode: "button",
        buttonStyle: "default",
        iconPosition: "left",
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
});
