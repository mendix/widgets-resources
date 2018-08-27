import { shallow } from "enzyme";
import { createElement } from "react";

import CustomToolbar from "../Toolbar";
import { CalendarProps } from "../Calendar";

describe("Toolbar", () => {
    const renderToolbar = (props: CalendarProps) => shallow(createElement(CustomToolbar as any, props));
    const toolbarProps: CalendarProps = {
        customViews: [],
        defaultView: "month",
        enableCreate: true,
        events: [],
        formats: {},
        height: 580,
        heightUnit: "pixels",
        messages: [],
        popup: true,
        editable: "default",
        style: {},
        viewOption: "standard",
        width: 100,
        widthUnit: "percentage"
    };

    it("renders the standard toolbar structure correctly", () => {
        const toolbar = renderToolbar(toolbarProps);
        const standardViewButtons = [ "day", "week", "month" ];

        expect(toolbar).toBeElement(
            createElement("div", { className: "calendar-toolbar" },
                createElement("div", { className: "btn-group align-left" },
                    createElement("button", { className: "btn", onClick: jasmine.any(Function) },
                        createElement("span", { className: "glyphicon glyphicon-backward" })),
                    createElement("button", { className: "btn", onClick: jasmine.any(Function) }, "Today"),
                    createElement("button", { className: "btn", onClick: jasmine.any(Function) },
                        createElement("span", { className: "glyphicon glyphicon-forward" }))
                ),
                createElement("span", { className: "calendar-label" }, "August 2018"),
                createElement("span", { className: "btn-group align-right" },
                    standardViewButtons.map(button => createElement("button", {
                        className: "btn",
                        onClick: jasmine.any(Function)
                    }, button.charAt(0).toUpperCase() + button.slice(1)))
                )
            )
        );
    });

    it("renders the custom toolbar structure correctly", () => {
        const toolbar = renderToolbar(toolbarProps);

        expect(toolbar).toBeElement(
            createElement("div", { className: "calendar-toolbar" },
                createElement("div", { className: `btn-group align-left` },
                    createElement(
                        "button", { className: "btn", onClick: jasmine.any(Function) },
                        createElement("span", { className: "glyphicon glyphicon-backward" })
                    ),
                    createElement(
                        "button", { className: "btn", onClick: jasmine.any(Function) },
                        createElement("span", { className: "glyphicon glyphicon-backward" })
                    ),
                    createElement(
                        "button", { className: "btn", onClick: jasmine.any(Function) },
                        createElement("span", { className: "glyphicon glyphicon-backward" })
                    )
                ),
                createElement("span", { className: "calendar-label" }, ""),
                createElement("div", { className: `btn-group align-right` }, "")
            )
        );
    });
});
