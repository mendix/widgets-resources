import { createElement } from "react";
import { shallow } from "enzyme";

import { Alert } from "../Alert";

describe("Alert", () => {
    it("renders the structure correctly", () => {
        const message = "This is an error";
        const alert = shallow(createElement(Alert, { bootstrapStyle: "danger", message }));

        expect(alert.getElement()).toEqual(createElement("div", { className: "alert alert-danger" }, message));
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = shallow(createElement(Alert, { bootstrapStyle: "danger" }));

        expect(alert.getElement()).toEqual(null);
    });

    it("renders with the class alert-success when the bootstrap style is success", () => {
        const message = "This is an alert";
        const alert = shallow(createElement(Alert, { bootstrapStyle: "success", message }));

        expect(alert.getElement()).toEqual(createElement("div", { className: "alert alert-success" }, message));
    });

    it("renders with the class alert-danger when the bootstrap style is danger", () => {
        const message = "This is an alert";
        const alert = shallow(createElement(Alert, { bootstrapStyle: "danger", message }));

        expect(alert.getElement()).toEqual(createElement("div", { className: "alert alert-danger" }, message));
    });

    it("renders with the class alert-info when the bootstrap style is info", () => {
        const message = "This is an alert";
        const alert = shallow(createElement(Alert, { bootstrapStyle: "info", message }));

        expect(alert.getElement()).toEqual(createElement("div", { className: "alert alert-info" }, message));
    });

    it("renders with the class alert-warning when the bootstrap style is warning", () => {
        const message = "This is an alert";
        const alert = shallow(createElement(Alert, { bootstrapStyle: "warning", message }));

        expect(alert.getElement()).toEqual(createElement("div", { className: "alert alert-warning" }, message));
    });

    it("renders with the class alert-inverse when the bootstrap style is inverse", () => {
        const message = "This is an alert";
        const alert = shallow(createElement(Alert, { bootstrapStyle: "inverse", message }));

        expect(alert.getElement()).toEqual(createElement("div", { className: "alert alert-inverse" }, message));
    });

    it("renders with the specified class name", () => {
        const message = "This is an error";
        const className = "widget-dropdown-sort";
        const alert = shallow(createElement(Alert, { bootstrapStyle: "danger", message, className }));

        expect(alert.getElement()).toEqual(
            createElement("div", { className: "alert alert-danger widget-dropdown-sort" }, message)
        );
    });
});
