import { createElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { Button, ButtonProps } from "../Button";

describe("Button", () => {
    const renderButton = (props: Partial<ButtonProps>): ShallowWrapper<ButtonProps, any> =>
        shallow(createElement(Button, props as ButtonProps));
    const buttonProps: ButtonProps = {
        color: "#000000",
        disabled: false,
        mode: "popover",
        hidden: false,
        onClick: hide => !hide
        // tabIndex: 0
    };

    it("renders the structure correctly", () => {
        const buttonComponent = renderButton(buttonProps);

        expect(buttonComponent.hasClass("btn")).toBe(true);

        buttonComponent.setProps({ disabled: true });
        expect(buttonComponent.hasClass("disabled")).toBe(true);

        buttonComponent.setProps({ mode: "input" });
        expect(buttonComponent.hasClass("widget-color-picker-input")).toBe(true);

        buttonComponent.setProps({ mode: "inline" });
        expect(buttonComponent.hasClass("hidden")).toBe(true);
    });
});
