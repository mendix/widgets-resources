import { shallow } from "enzyme";
import { createElement, DOM } from "react";
import { Alert } from "../Alert";

describe("Alert", () => {

    it("should render structure correctly", () => {
        const message = "some alert message";
        const renderAlert = shallow(createElement(Alert, { message }));

        expect(renderAlert).toBeElement(
            DOM.div({ className: "alert alert-danger widget-star-rating-alert" }, message)
        );
    });

    it("should not render anything", () => {
        const renderAlert = shallow(createElement(Alert));

        expect(renderAlert).toBeNull;
    });

});
