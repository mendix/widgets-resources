import { shallow, ShallowWrapper } from "enzyme";
import { ReactChild, createElement } from "react";

import { Alert, AlertProps } from "../Alert";

describe("Alert", () => {
    const renderAlert = (props: AlertProps, message: ReactChild): ShallowWrapper<AlertProps, any> =>
        shallow(createElement(Alert, props, message));
    const alertMessage = "This is an error";

    it("renders the structure correctly", () => {
        const alert = renderAlert({}, alertMessage);

        expect(alert.getElement()).toEqual(createElement("div", { className: "alert alert-danger" }, alertMessage));
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = renderAlert({}, "");

        expect(alert.getElement()).toEqual(null);
    });

    it("renders with the specified class", () => {
        const alert = renderAlert({ className: "widget-Signature-alert" }, alertMessage);

        expect(alert.hasClass("widget-Signature-alert")).toBe(true);
    });

    it("with no bootstrap style specified renders with the class alert-danger", () => {
        const alert = renderAlert({}, alertMessage);

        expect(alert.hasClass("alert-danger")).toBe(true);
    });

    it("renders with the matching class for the specified bootstrap style", () => {
        const alert = renderAlert({ bootstrapStyle: "default" }, alertMessage);

        expect(alert.hasClass("alert-default")).toBe(true);

        alert.setProps({ bootstrapStyle: "primary" });
        expect(alert.hasClass("alert-primary")).toBe(true);

        alert.setProps({ bootstrapStyle: "info" });
        expect(alert.hasClass("alert-info")).toBe(true);

        alert.setProps({ bootstrapStyle: "success" });
        expect(alert.hasClass("alert-success")).toBe(true);

        alert.setProps({ bootstrapStyle: "warning" });
        expect(alert.hasClass("alert-warning")).toBe(true);

        alert.setProps({ bootstrapStyle: "danger" });
        expect(alert.hasClass("alert-danger")).toBe(true);
    });
});
