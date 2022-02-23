import { createElement } from "react";
import { render } from "@testing-library/react";

import { shallow, ShallowWrapper } from "enzyme";

import { Button, ButtonProps } from "../Button";

describe("Button", () => {
    const renderButton = (props: ButtonProps): ShallowWrapper<ButtonProps, any> => shallow(<Button {...props} />);
    const buttonProps: ButtonProps = {
        color: "#000000",
        disabled: false,
        mode: "popover",
        onClick: jest.fn()
    };

    it("render DOM structure", () => {
        const { asFragment } = render(<Button {...buttonProps} />);
        expect(asFragment()).toMatchSnapshot();
    });

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
