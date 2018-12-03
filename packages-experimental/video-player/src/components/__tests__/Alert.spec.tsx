import { shallow } from "enzyme";
import * as React from "react";

import { Alert } from "../Alert";

describe("Alert", () => {
    it("renders the structure when an alert message is specified", () => {
        const message = "This is an error";
        const alert = shallow(<Alert
            bootstrapStyle="danger"
            className="widget-badge-alert"
            message={message}/>);

        expect(alert).toBeElement(
            <div className="alert alert-danger widget-badge-alert">{message}</div>
        );
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = shallow(<Alert />);

        expect(alert).toBeElement(null);
    });
});
