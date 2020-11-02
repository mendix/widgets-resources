import { shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";

import { Alert, AlertProps } from "../Alert";

describe("Alert", () => {
    const message = "This is an error";
    const renderAlert = (props: AlertProps): ShallowWrapper<AlertProps, any> => shallow(createElement(Alert, props));
    let defaultProps: AlertProps;

    beforeEach(() => {
        defaultProps = {
            bootstrapStyle: "danger",
            className: "widget-progress-circle",
            message
        };
    });

    it("renders the structure when an alert message is specified", () => {
        const alert = renderAlert(defaultProps);

        expect(alert.getElement()).toEqual(
            createElement("div", { className: "alert alert-danger widget-progress-circle" }, message)
        );
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = renderAlert({ bootstrapStyle: "danger" });

        expect(alert.getElement()).toEqual(null);
    });

    it("renders with the class of the specified bootstrap style", () => {
        const alert = renderAlert(defaultProps);

        expect(alert.hasClass("alert-danger")).toBe(true);

        alert.setProps({ bootstrapStyle: "default" });
        expect(alert.hasClass("alert-default")).toBe(true);

        alert.setProps({ bootstrapStyle: "success" });
        expect(alert.hasClass("alert-success")).toBe(true);

        alert.setProps({ bootstrapStyle: "primary" });
        expect(alert.hasClass("alert-primary")).toBe(true);

        alert.setProps({ bootstrapStyle: "info" });
        expect(alert.hasClass("alert-info")).toBe(true);

        alert.setProps({ bootstrapStyle: "warning" });
        expect(alert.hasClass("alert-warning")).toBe(true);
    });

    it("renders with the specified class name", () => {
        defaultProps.className = "widget-unit-test-class";
        const alert = renderAlert(defaultProps);

        expect(alert.hasClass(defaultProps.className)).toBe(true);
    });
});
