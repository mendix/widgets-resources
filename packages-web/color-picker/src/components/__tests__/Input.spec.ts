import { shallow } from "enzyme";
import { ReactChild, createElement } from "react";

import { Input, InputProps } from "../Input";

describe("Input", () => {
    const renderInput = (props: InputProps, children: ReactChild) => shallow(createElement(Input, props, children));
    const inputProps: InputProps = {
        color: "#000000",
        disabled: false
    };
    const inputChildren = createElement("div", {}, createElement("button"));

    it("renders the structure correctly", () => {
        const inputComponent = renderInput(inputProps, inputChildren);

        expect(inputComponent).toBeElement(
            createElement("div", { className: "widget-color-picker-input-container" },
                createElement("input", {
                    className: "form-control",
                    disabled: inputProps.disabled,
                    type: "text",
                    value: inputProps.color
                }),
                inputChildren
            )
        );
    });
});
