import { shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";

import { Label, LabelProps } from "../Label";

describe("Label", () => {
    const renderLabel = (props: Partial<LabelProps>): ShallowWrapper<LabelProps, any> =>
        shallow(createElement(Label, props as LabelProps));
    const label = "Label";

    it("renders the structure correctly", () => {
        const labelComponent = renderLabel({ label, orientation: "horizontal" });

        expect(labelComponent.getElement()).toEqual(
            createElement(
                "div",
                { className: "form-group" },
                createElement("label", { className: "control-label col-sm-6" }, label),
                createElement("div", { className: "col-sm-6" })
            )
        );
    });

    it("with orientation as vertical renders with the structure", () => {
        const labelComponent = renderLabel({ label, orientation: "vertical" });

        expect(labelComponent.getElement()).toEqual(
            createElement(
                "div",
                { className: "form-group no-columnDefinitions" },
                createElement("label", { className: "control-label" }, label),
                createElement("div", { className: "" })
            )
        );
    });

    it("renders a label with the specified weight class", () => {
        const labelComponent = renderLabel({ label, orientation: "horizontal", weight: 3 });
        const colorLabel = labelComponent.childAt(0);

        expect(colorLabel.hasClass("col-sm-3")).toBe(true);
    });

    it("renders the labeled element's wrapper with the calculated weight class", () => {
        const weight = 3;
        const labelComponent = renderLabel({ label, orientation: "horizontal", weight });
        const childrenWrapper = labelComponent.childAt(1);

        expect(childrenWrapper.hasClass(`col-sm-${12 - weight}`)).toBe(true);
    });

    it("renders a label with calculated weight when specifed value is greater than 11", () => {
        const labelComponent = renderLabel({ label, orientation: "horizontal", weight: 20 });
        const colorLabel = labelComponent.childAt(0);

        expect(colorLabel.hasClass("col-sm-3")).toBe(true);
    });
});
