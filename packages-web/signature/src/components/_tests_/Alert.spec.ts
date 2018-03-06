import { shallow } from "enzyme";
import { createElement } from "react";
import { Alert, AlertProps } from "../Alert";

describe("Alert", () => {
    const renderAlert = (props: AlertProps) => shallow(createElement(Alert, props));
    const alertMessage = "This is an error";

    it("renders structure when an alert message is specified", () => {
        const alert = renderAlert({ bootstrapStyle: "danger", message: alertMessage });

        expect(alert).toBeElement(
            createElement("div", { className: "alert alert-danger" }, alertMessage)
        );
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = shallow(createElement(Alert));

        expect(alert).toBeElement(null);
    });

    it("renders with the specified class name", () => {
        const message = "This is an error";
        const className = "widget-enum-switch";
        const alert = shallow(createElement(Alert, { bootstrapStyle: "danger", message, className }));

        expect(alert).toBeElement(
            createElement("div", { className: "alert alert-danger widget-enum-switch" }, message)
        );
    });

    describe("with bootstrap style", () => {
        it("success", () => {
            const message = "This is an alert";
            const alert = shallow(createElement(Alert, { bootstrapStyle: "success", message }));

            expect(alert).toBeElement(
                createElement("div", { className: "alert alert-success" }, message)
            );
        });

        it("alert", () => {
            const message = "This is an alert";
            const alert = shallow(createElement(Alert, { bootstrapStyle: "danger", message }));

            expect(alert).toBeElement(
                createElement("div", { className: "alert alert-danger" }, message)
            );
        });

        it("info", () => {
            const message = "This is an alert";
            const alert = shallow(createElement(Alert, { bootstrapStyle: "info", message }));

            expect(alert).toBeElement(
                createElement("div", { className: "alert alert-info" }, message)
            );
        });

        it("warning", () => {
            const message = "This is an alert";
            const alert = shallow(createElement(Alert, { bootstrapStyle: "warning", message }));

            expect(alert).toBeElement(
                createElement("div", { className: "alert alert-warning" }, message)
            );
        });
    });
});
