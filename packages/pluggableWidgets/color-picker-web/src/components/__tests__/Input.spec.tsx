import { shallow, ShallowWrapper } from "enzyme";
import { createElement, ReactElement } from "react";
import { render } from "@testing-library/react";

import { Input, InputProps } from "../Input";

describe("Input", () => {
    const renderInput = (props: InputProps, children: ReactElement): ShallowWrapper<InputProps, any> =>
        shallow(<Input {...props}>{children}</Input>);
    const inputProps: InputProps = {
        color: "#000000",
        disabled: false,
        children: null,
        onChange: jest.fn()
    };
    const inputChildren = (
        <div>
            <button />
        </div>
    );

    it("render DOM structure", () => {
        const { asFragment } = render(<Input {...inputProps} />);
        expect(asFragment()).toMatchSnapshot();
    });
    it("renders the structure correctly", () => {
        const inputComponent = renderInput(inputProps, inputChildren);

        expect(inputComponent.getElement()).toEqual(
            createElement(
                "div",
                { className: "widget-color-picker-input-container" },
                createElement("input", {
                    className: "form-control",
                    disabled: inputProps.disabled,
                    type: "text",
                    value: inputProps.color,
                    onChange: inputProps.onChange
                }),
                inputChildren
            )
        );
    });
});
