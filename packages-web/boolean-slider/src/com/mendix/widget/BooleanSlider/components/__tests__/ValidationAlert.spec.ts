import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { ValidationAlert } from "../ValidationAlert";

describe("ValidationAlert", () => {
    const message = "This is an error";
    const alert = shallow(createElement(ValidationAlert, { message }));

    it("renders structure correctly", () => {
        expect(alert).toBeElement(
            DOM.div({ className: "alert alert-danger widget-boolean-slider-validation-message" }, message)
        );
    });
});
