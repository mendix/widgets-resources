import { createElement } from "react";
import { shallow } from "enzyme";

import { Alert } from "../Alert";

describe("Alert", () => {
    it("renders the structure correctly", () => {
        const message = "This is an error";
        const alert = shallow(createElement(Alert, { bootstrapStyle: "danger" }, message));

        expect(alert.getElement()).toEqual(createElement("div", { className: "alert alert-danger" }, message));
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = shallow(createElement(Alert, { bootstrapStyle: "danger" }));

        expect(alert.getElement()).toEqual(null);
    });

    it("contains additional class name", () => {
        const message = "This is an error";
        const className = "widget-imageviewer";
        const alert = shallow(createElement(Alert, { bootstrapStyle: "danger", className }, message));

        expect(alert.getElement()).toEqual(
            createElement("div", { className: "alert alert-danger widget-imageviewer" }, message)
        );
    });

    describe("with bootstrap style", () => {
        it("success", () => {
            const message = "This is an alert";
            const alert = shallow(createElement(Alert, { bootstrapStyle: "success" }, message));

            expect(alert.getElement()).toEqual(createElement("div", { className: "alert alert-success" }, message));
        });

        it("alert", () => {
            const message = "This is an alert";
            const alert = shallow(createElement(Alert, { bootstrapStyle: "danger" }, message));

            expect(alert.getElement()).toEqual(createElement("div", { className: "alert alert-danger" }, message));
        });

        it("info", () => {
            const message = "This is an alert";
            const alert = shallow(createElement(Alert, { bootstrapStyle: "info" }, message));

            expect(alert.getElement()).toEqual(createElement("div", { className: "alert alert-info" }, message));
        });

        it("warning", () => {
            const message = "This is an alert";
            const alert = shallow(createElement(Alert, { bootstrapStyle: "warning" }, message));

            expect(alert.getElement()).toEqual(createElement("div", { className: "alert alert-warning" }, message));
        });

        it("inverse", () => {
            const message = "This is an alert";
            const alert = shallow(createElement(Alert, { bootstrapStyle: "inverse" }, message));

            expect(alert.getElement()).toEqual(createElement("div", { className: "alert alert-inverse" }, message));
        });
    });
});
