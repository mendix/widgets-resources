import { ShallowWrapper, shallow } from "enzyme";
import { createElement } from "react";

import { Alert, AlertProps } from "../Alert";

describe("Alert", () => {
    const message = "This is an error";
    const renderAlert = (props: AlertProps): ShallowWrapper<AlertProps, Readonly<{}>, React.Component<{}, {}, any>> =>
        shallow(createElement(Alert, props));
    let defaultProps: AlertProps;

    beforeEach(() => {
        defaultProps = {
            bootstrapStyle: "danger",
            className: "widget-star-rating",
            message
        };
    });

    it("renders the structure when an alert message is specified", () => {
        const alert = renderAlert(defaultProps);

        expect(alert.getElement()).toStrictEqual(
            createElement("div", { className: "alert alert-danger widget-star-rating" }, message)
        );
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = shallow(createElement(Alert));

        expect(alert.getElement()).toBeNull();
    });

    it("renders with the class of the specified bootstrap style", () => {
        const alert = renderAlert(defaultProps);

        expect(alert.hasClass("alert-danger")).toBeTruthy();

        alert.setProps({ bootstrapStyle: "default" });
        expect(alert.hasClass("alert-default")).toBeTruthy();

        alert.setProps({ bootstrapStyle: "success" });
        expect(alert.hasClass("alert-success")).toBeTruthy();

        alert.setProps({ bootstrapStyle: "primary" });
        expect(alert.hasClass("alert-primary")).toBeTruthy();

        alert.setProps({ bootstrapStyle: "info" });
        expect(alert.hasClass("alert-info")).toBeTruthy();

        alert.setProps({ bootstrapStyle: "warning" });
        expect(alert.hasClass("alert-warning")).toBeTruthy();
    });

    it("renders with the specified class name", () => {
        const className = "widget-unit-test-class";
        const customClassProps = { ...defaultProps, className };
        const alert = renderAlert(customClassProps);

        expect(alert.hasClass(className)).toBeTruthy();
    });
});
