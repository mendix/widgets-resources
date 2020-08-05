import { createElement } from "react";

import { Alert } from "../Alert";
import { create } from "react-test-renderer";

describe("Alert", () => {
    it("renders the structure when an alert message is specified", () => {
        const message = "This is an error";
        const alert = create(
            <Alert bootstrapStyle="danger" className="widget-badge-alert" message={message} />
        ).toJSON();

        expect(alert).toMatchSnapshot();
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = create(<Alert />).toJSON();

        expect(alert).toBeNull();
    });
});
