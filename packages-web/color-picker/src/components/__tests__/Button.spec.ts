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
        const labelComponent = renderButton(buttonProps);

        expect(labelComponent).toBeElement(
            createElement("button", { className: "btn", tabIndex: buttonProps.tabIndex },
                createElement("div", { className: buttonProps.className, style: { background: buttonProps.color } })
            )
        );

        labelComponent.setProps({ disabled: true });
        expect(labelComponent).toHaveClass("disabled");

        labelComponent.setProps({ mode: "input" });
        expect(labelComponent).toHaveClass("widget-color-picker-input");

        labelComponent.setProps({ mode: "inline" });
        expect(labelComponent).toHaveClass("widget-color-picker-inline");
    });
});
