import { shallow } from "enzyme";
import { createElement } from "react";

import { Label, LabelProps } from "../Label";

describe("Label", () => {
    const renderLabel = (props: Partial<LabelProps>) => shallow(createElement(Label, props as LabelProps));
    const label = "Label";

    it("renders the structure correctly", () => {
        const labelComponent = renderLabel({ label });

        expect(labelComponent).toBeElement(
            createElement("div", { className: "widget-color-picker-label" },
                createElement("div", { className: "form-group" },
                    createElement("div", { className: "col-sm-6 col-xs-6" },
                        createElement("label", { className: "control-label" }, label)
                    ),
                    createElement("div", { className: `col-sm-6` })
                )
            )
        );
    });

    it("renders a label with the specified weight class", () => {
        const labelComponent = renderLabel({ label, weight: 3 });
        const colorLabel = labelComponent.childAt(0).childAt(0);

        expect(colorLabel).toHaveClass("col-sm-3");
    });

    it("renders the labeled element's wrapper with the calculated weight class", () => {
        const weight = 3;
        const labelComponent = renderLabel({ label, weight });
        const childrenWrapper = labelComponent.childAt(0).childAt(1);

        expect(childrenWrapper).toHaveClass(`col-sm-${12 - weight}`);
    });

    it("renders a label with calculated weight when specifed value is greater than 11", () => {
        const labelComponent = renderLabel({ label, weight: 20 });
        const colorLabel = labelComponent.childAt(0).childAt(0);

        expect(colorLabel).toHaveClass("col-sm-3");
    });
});
