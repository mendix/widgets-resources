import { ShallowWrapper, shallow } from "enzyme";
import { DOM, createElement } from "react";

import { ValidationAlert } from "../ValidationAlert";

describe("Slider", () => {

    let alert: ShallowWrapper<any, any>;
    const message = "This is an error";

    beforeEach(() => {
        alert = shallow(createElement(ValidationAlert, { message }));
    });

    it("renders structure correctly", () => {
        expect(alert).toBeElement(
            DOM.div({ className: "alert alert-danger mx-validation-message" }, message)
        );
    });

    it("has the expected css classes", () => {
        expect(alert.hasClass("alert alert-danger mx-validation-message")).toBe(true);
    });
});
