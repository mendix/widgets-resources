import { ShallowWrapper, shallow } from "enzyme";
import { createElement } from "react";

import { Alert, AlertProps } from "../Alert";

describe("Alert", () => {
    const message = "This is an error";
    const renderAlert = (props: AlertProps): ShallowWrapper<AlertProps> => shallow(createElement(Alert, props));

    const defaultProps: AlertProps = {
        message
    };

    it("renders correctly with a message", () => {
        const alert = renderAlert(defaultProps);

        expect(alert.getElement()).toEqual(<div className={"alert alert-danger"}>{message}</div>);
    });

    it("renders correctly without a message", () => {
        const alert = shallow(createElement(Alert));

        expect(alert.getElement()).toEqual(null);
    });
});
