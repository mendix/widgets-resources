import { ShallowWrapper, shallow } from "enzyme";
import { Component, createElement } from "react";

import { Label, LabelProps } from "../Label";

describe("Label", () => {
    const renderLabel = (
        props: Partial<LabelProps>
    ): ShallowWrapper<LabelProps, Readonly<{}>, Component<{}, {}, any>> =>
        shallow(createElement(Label, props as LabelProps));
    const label = "Label";

    it("renders the structure correctly", () => {
        const labelComponent = renderLabel({ label });

        expect(labelComponent.getElement()).toEqual(
            createElement(
                "div",
                { className: "widget-switch-label" },
                createElement(
                    "div",
                    { className: "form-group clearfix" },
                    createElement(
                        "div",
                        { className: "col-sm-6 col-xs-6" },
                        createElement("label", { className: "control-label" }, label)
                    ),
                    createElement("div", { className: "col-sm-6 col-xs-6" })
                )
            )
        );
    });

    it("renders a label with the specified weight class", () => {
        const labelComponent = renderLabel({ label, weight: 3 });
        const SwitchLabel = labelComponent.childAt(0).childAt(0);

        expect(SwitchLabel.hasClass("col-sm-3")).toBe(true);
    });

    it("renders the labeled element's wrapper with the calculated weight class", () => {
        const weight = 3;
        const labelComponent = renderLabel({ label, weight });
        const childrenWrapper = labelComponent.childAt(0).childAt(1);

        expect(childrenWrapper.hasClass(`col-sm-${12 - weight}`)).toBe(true);
    });
});
