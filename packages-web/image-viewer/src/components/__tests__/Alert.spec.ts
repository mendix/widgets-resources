import { createElement } from "react";
import { configure, shallow } from "enzyme";
import Adapter = require("enzyme-adapter-react-16");

import { Alert } from "../Alert";

configure({ adapter: new Adapter() });

describe("Alert", () => {
    it("renders the structure correctly", () => {
        const message = "This is an error";
        const alert = shallow(createElement(Alert, { bootstrapStyle: "danger", message }));

        expect(alert).toBeElement(
            createElement("div", { className: "alert alert-danger" }, message)
        );
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = shallow(createElement(Alert, { bootstrapStyle: "danger" }));

        expect(alert).toBeElement(null);
    });

    it("contains additional class name", () => {
        const message = "This is an error";
        const className = "widget-imageviewer";
        const alert = shallow(createElement(Alert, { bootstrapStyle: "danger", message, className }));

        expect(alert).toBeElement(
            createElement("div", { className: "alert alert-danger widget-imageviewer" }, message)
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

        it("inverse", () => {
            const message = "This is an alert";
            const alert = shallow(createElement(Alert, { bootstrapStyle: "inverse", message }));

            expect(alert).toBeElement(
                createElement("div", { className: "alert alert-inverse" }, message)
            );
        });
    });
});
