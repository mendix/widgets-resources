import { shallow } from "enzyme";
import { createElement } from "react";

import CustomToolbar from "../Toolbar";

interface ToolbarProps {
    views: string[];
}

describe("Toolbar", () => {
    const renderCustomToolbar = (props: ToolbarProps) => shallow(createElement(CustomToolbar as any, props));
    const toolbarProps: ToolbarProps = {
        views: [ "month" ]
    };

    it("renders the structure correctly", () => {
        const toolbar = renderCustomToolbar(toolbarProps);

        expect(toolbar).toBeElement(
            createElement("div", { className: "rbc-toolbar" },
                createElement("span", { className: "rbc-btn-group" },
                    createElement("button", { onClick: () => jasmine.any(Function) }, "Back"),
                    createElement("button", { onClick: () => jasmine.any(Function) }, "Today"),
                    createElement("button", { onClick: () => jasmine.any(Function) }, "Next")
                ),
                createElement("span", { className: "rbc-toolbar-label" }, toolbarProps.views),
                createElement("span", { className: "rbc-btn-group" }, () => jasmine.any(Function))
            )
        );
    });
});
