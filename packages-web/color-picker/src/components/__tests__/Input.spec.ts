import { mount, shallow } from "enzyme";
import { ReactChild, createElement } from "react";

import { Input, InputProps } from "../Input";

describe("Input", () => {
    const renderInput = (props: InputProps, children: ReactChild) => shallow(createElement(Input, props, children));
    const fullRenderInput = (props: InputProps, children: ReactChild) => mount(createElement(Input, props, children));
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

    it("adds eventListener for keyboard down arrow key", () => {
        const inputComponent = fullRenderInput(inputProps, inputChildren);

        let inputInstance = inputComponent.instance() as any;
        spyOn(inputInstance, "componentDidMount").and.callThrough();
        inputInstance.componentDidMount();

        inputComponent.setProps({ onKeyDown: jasmine.any(Function) as any });
        inputInstance = inputComponent.instance() as any;
        inputInstance.componentDidMount();

        expect(inputInstance.componentDidMount).toHaveBeenCalledTimes(2);

    });

    it("removes eventListener for keyboard down arrow key", () => {
        const inputComponent = fullRenderInput(inputProps, inputChildren);

        let inputInstance = inputComponent.instance() as any;
        spyOn(inputInstance, "componentWillUnmount").and.callThrough();
        inputInstance.componentWillUnmount();

        inputComponent.setProps({ onKeyDown: jasmine.any(Function) as any });
        inputInstance = inputComponent.instance() as any;
        inputInstance.componentWillUnmount();

        expect(inputInstance.componentWillUnmount).toHaveBeenCalledTimes(2);
    });
});
