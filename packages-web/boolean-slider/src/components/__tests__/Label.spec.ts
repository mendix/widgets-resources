import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { Label, LabelProps } from "../Label";

describe("Label", () => {
    const renderLabel = (props: Partial<LabelProps>) => shallow(createElement(Label as any, props));
    const label = "Label";

    it("renders structure correctly", () => {
        const labelComponent = renderLabel({ label });

        expect(labelComponent).toBeElement(
            DOM.div({ className: "form-group" },
                DOM.label({ className: `control-label col-sm-6` }, label),
                DOM.div({ className: `col-sm-6` })
            )
        );
    });

    describe("with horizontal orientation", () => {
        it("renders a label with the specified weight class", () => {
            const alert = renderLabel({ label, weight: 3 });

            expect(alert.childAt(0)).toHaveClass("col-sm-3");
        });

        it("renders the labeled element's container with the calculated weight class", () => {
            const weight = 3;
            const alert = renderLabel({ label, weight });

            expect(alert.childAt(1)).toHaveClass(`col-sm-${12 - weight}`);
        });
    });

    describe("with vertical orientation", () => {
        it("renders a label without any weight classes", () => {
            const alert = renderLabel({ label, weight: 3, orientation: "vertical" });

            expect(alert.childAt(0)).not.toHaveClass("col-sm-3");
        });
    });
});
