import { shallow } from "enzyme";
import { createElement } from "react";

import { Alert, AlertProps } from "../Alert";

describe("Alert", () => {
    const message = "This is an error";
    const renderAlert = (props: AlertProps) => shallow(createElement(Alert, props));
    let defaultProps: AlertProps;

    beforeEach(() => {
        defaultProps = {
            bootstrapStyle: "danger",
            className: "widget-badge-button",
            message
        };
    });

    it("renders the structure when an alert message is specified", () => {
        const alert = renderAlert(defaultProps);

        expect(alert).toBeElement(
            createElement("div", { className: "alert alert-danger widget-badge-button" }, message)
        );
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = renderAlert({ bootstrapStyle: "danger" });

        expect(alert).toBeElement(null);
    });

    it("renders with the class of the specified bootstrap style", () => {
        const alert = renderAlert(defaultProps);

        expect(alert).toHaveClass("alert-danger");

        alert.setProps({ bootstrapStyle: "default" });
        expect(alert).toHaveClass("alert-default");

        alert.setProps({ bootstrapStyle: "success" });
        expect(alert).toHaveClass("alert-success");

        alert.setProps({ bootstrapStyle: "primary" });
        expect(alert).toHaveClass("alert-primary");

        alert.setProps({ bootstrapStyle: "info" });
        expect(alert).toHaveClass("alert-info");

        alert.setProps({ bootstrapStyle: "warning" });
        expect(alert).toHaveClass("alert-warning");
    });

    it("renders with the specified class name", () => {
        defaultProps.className = "widget-unit-test-class";
        const alert = renderAlert(defaultProps);

        expect(alert).toHaveClass(defaultProps.className);
    });
});
