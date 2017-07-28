import { shallow } from "enzyme";
import { createElement } from "react";
import { Alert } from "../Alert";

describe("Alert", () => {

    it("should render structure correctly", () => {
        const message = "some alert message";
        const renderAlert = shallow(createElement(Alert, {
            bootstrapStyle: "danger",
            className: "widget-star-rating-alert",
            message
        }));

        expect(renderAlert).toBeElement(
            createElement("div", { className: "alert alert-danger widget-star-rating-alert" }, message)
        );
    });

    it("without message should not render anything", () => {
        const renderAlert = shallow(createElement(Alert));

        expect(renderAlert).toBeElement(null);
    });

});
