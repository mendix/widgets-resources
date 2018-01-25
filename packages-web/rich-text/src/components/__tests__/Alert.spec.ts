import { shallow } from "enzyme";
import { createElement } from "react";

import { Alert, AlertProps } from "../Alert";

describe("Alert", () => {
    const renderAlert = (props: AlertProps) => shallow(createElement(Alert, props));
    const message = "This is an error";

    it("renders structure correctly", () => {
        const alert = renderAlert({ message });

        expect(alert).toBeElement(
            createElement("div", { className: "alert alert-danger" }, message)
        );
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = renderAlert({ message: "" });

        expect(alert).toBeElement(null);
    });

    it("renders with the specified class", () => {
        const alert = renderAlert({ className: "widget-rich-text-alert", message });

        expect(alert).toHaveClass("widget-rich-text-alert");
    });
});
