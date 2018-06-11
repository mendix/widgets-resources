import { shallow } from "enzyme";
import { createElement } from "react";

import { Button, ButtonProps } from "../Button";

describe("Button", () => {
    const renderButton = (props: Partial<ButtonProps>) => shallow(createElement(Button, props as ButtonProps));
    const buttonProps: ButtonProps = {
        color: "#000000",
        className: "widget-color-picker-inner",
        disabled: false,
        mode: "popover",
        tabIndex: 0
    };

    it("renders the structure correctly", () => {
        const buttonComponent = renderButton(buttonProps);

        expect(buttonComponent).toBeElement(
            createElement("button", { className: "btn", tabIndex: buttonProps.tabIndex },
                createElement("div", { className: buttonProps.className, style: { background: buttonProps.color } })
            )
        );

        buttonComponent.setProps({ disabled: true });
        expect(buttonComponent).toHaveClass("disabled");

        buttonComponent.setProps({ mode: "input" });
        expect(buttonComponent).toHaveClass("widget-color-picker-input");

        buttonComponent.setProps({ mode: "inline" });
        expect(buttonComponent).toHaveClass("hidden");
    });
});
