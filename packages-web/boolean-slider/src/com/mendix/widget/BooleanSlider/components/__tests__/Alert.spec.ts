import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { Alert } from "../Alert";

describe("Alert", () => {
    const renderAlert = (message?: string) => shallow(createElement(Alert, { message }));

    it("renders structure correctly", () => {
        const message = "This is an error";
        const alert = renderAlert(message);

        expect(alert).toBeElement(
            DOM.div({ className: "alert alert-danger widget-boolean-slider-alert" }, message)
        );
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = renderAlert();

        expect(alert).toBeElement(null);
    });
});
