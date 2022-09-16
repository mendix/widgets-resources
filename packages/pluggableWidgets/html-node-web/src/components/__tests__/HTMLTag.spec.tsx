import { render, fireEvent } from "@testing-library/react";
import { createElement } from "react";

import { HTMLTag } from "../HTMLTag";

describe("HTMLTag", () => {
    it("renders correctly with innerHTML", () => {
        const { asFragment } = render(
            <HTMLTag
                tagName="div"
                unsafeHTML="<p>Lorem ipsum</p>"
                attributes={{
                    className: "html-node-root my-class"
                }}
            >
                {undefined}
            </HTMLTag>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("renders correctly with content", () => {
        const { asFragment } = render(
            <HTMLTag
                tagName="div"
                unsafeHTML={undefined}
                attributes={{
                    className: "html-node-root my-another-class",
                    style: { color: "red" }
                }}
            >
                <div>Lorem ipsum</div>
            </HTMLTag>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("fires events", () => {
        const cbFn = jest.fn();
        const { getByTestId } = render(
            <HTMLTag
                tagName="div"
                unsafeHTML={undefined}
                attributes={{
                    "data-testid": "html-node",
                    onClick: _e => {
                        cbFn();
                    }
                }}
            >
                <div>Lorem ipsum</div>
            </HTMLTag>
        );

        fireEvent.click(getByTestId("html-node"));

        expect(cbFn).toHaveBeenCalled();
    });
});
