import { ShallowWrapper, shallow } from "enzyme";
import { Component, createElement } from "react";

import { Alert, AlertProps } from "../Alert";

describe("Alert", () => {
    const message = "This is an error";
    const renderAlert = (props: AlertProps): ShallowWrapper<AlertProps, Readonly<{}>, Component<{}, {}, any>> =>
        shallow(createElement(Alert, props));

    const defaultProps: AlertProps = {
        bootstrapStyle: "danger",
        className: "widget-switch-alert",
        message
    };

    it("renders the structure when an alert message is specified", () => {
        const alert = renderAlert(defaultProps);

        expect(alert.getElement()).toEqual(
            createElement("div", { className: "alert alert-danger widget-switch-alert" }, message)
        );
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = shallow(createElement(Alert));

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
        const className = "widget-unit-test-class";
        const customClassProps = { ...defaultProps, className };
        const alert = renderAlert(customClassProps);

        expect(alert.hasClass(className)).toBe(true);
    });
});
