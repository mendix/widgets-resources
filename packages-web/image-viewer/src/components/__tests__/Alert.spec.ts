import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { Alert } from "../Alert";

describe("Alert", () => {
    it("renders the structure", () => {
        const message = "This is an error";
        const alert = shallow(createElement(Alert, { message }));

        expect(alert).toBeElement(
            DOM.div({ className: "alert alert-danger widget-validation-message" }, message)
        );
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = shallow(createElement(Alert));

        expect(alert).toBeElement(null);
    });
});
