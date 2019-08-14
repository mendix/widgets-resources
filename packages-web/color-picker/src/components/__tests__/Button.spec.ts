import { shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";

import { Button, ButtonProps } from "../Button";

describe("Button", () => {
    const renderButton = (props: Partial<ButtonProps>): ShallowWrapper<ButtonProps, any> =>
        shallow(createElement(Button, props as ButtonProps));
    const buttonProps: ButtonProps = {
        color: "#000000",
        className: "widget-color-picker-inner",
        disabled: false,
        mode: "popover",
        tabIndex: 0
    };

    it("renders the structure correctly", () => {
        const buttonComponent = renderButton(buttonProps);

        expect(buttonComponent.getElement()).toEqual(
            createElement(
                "button",
                { className: "btn", tabIndex: buttonProps.tabIndex },
                createElement("div", { className: buttonProps.className, style: { background: buttonProps.color } })
            )
        );

        buttonComponent.setProps({ disabled: true });
        expect(buttonComponent.hasClass("disabled")).toBe(true);

        buttonComponent.setProps({ mode: "input" });
        expect(buttonComponent.hasClass("widget-color-picker-input")).toBe(true);

        buttonComponent.setProps({ mode: "inline" });
        expect(buttonComponent.hasClass("hidden")).toBe(true);
    });
});
