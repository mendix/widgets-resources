import { shallow } from "enzyme";
import { createElement } from "react";

import { Alert } from "../Alert";

describe("Alert", () => {
    it("renders structure correctly", () => {
        const message = "This is an error";
        const alert = shallow(createElement(Alert, {
            bootstrapStyle: "danger",
            className: "widget-switch-alert",
            message
        }));

        expect(alert).toBeElement(
            createElement("div", { className: "alert alert-danger widget-switch-alert" }, message)
        );
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = shallow(createElement(Alert));

        expect(alert).toBeElement(null);
    });
});
