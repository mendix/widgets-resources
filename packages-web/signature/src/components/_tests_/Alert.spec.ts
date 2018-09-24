import { shallow } from "enzyme";
import { ReactChild, createElement } from "react";

import { Alert, AlertProps } from "../Alert";

describe("Alert", () => {
    const renderAlert = (props: AlertProps, message: ReactChild) => shallow(createElement(Alert, props, message));
    const alertMessage = "This is an error";

    it("renders structure correctly", () => {
        const alert = renderAlert({}, alertMessage);

        expect(alert).toBeElement(
            createElement("div", { className: "alert alert-danger" }, alertMessage)
        );
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = renderAlert({}, "");

        expect(alert).toBeElement(null);
    });

    it("renders with the specified class", () => {
        const alert = renderAlert({ className: "widget-Signature-alert" }, alertMessage);

        expect(alert).toHaveClass("widget-Signature-alert");
    });

    it("with no bootstrap style specified renders with the class alert-danger", () => {
        const alert = renderAlert({}, alertMessage);

        expect(alert).toHaveClass("alert-danger");
    });

    it("renders with the matching class for the specified bootstrap style", () => {
        const alert = renderAlert({ bootstrapStyle: "default" }, alertMessage);

        expect(alert).toHaveClass("alert-default");

        alert.setProps({ bootstrapStyle: "primary" });
        expect(alert).toHaveClass("alert-primary");

        alert.setProps({ bootstrapStyle: "info" });
        expect(alert).toHaveClass("alert-info");

        alert.setProps({ bootstrapStyle: "success" });
        expect(alert).toHaveClass("alert-success");

        alert.setProps({ bootstrapStyle: "warning" });
        expect(alert).toHaveClass("alert-warning");

        alert.setProps({ bootstrapStyle: "danger" });
        expect(alert).toHaveClass("alert-danger");
    });
});
