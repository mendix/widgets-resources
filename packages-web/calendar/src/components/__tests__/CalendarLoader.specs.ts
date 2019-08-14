import { shallow } from "enzyme";
import { createElement } from "react";
import { CalendarLoader, generateDivs } from "../CalendarLoader";

describe("CalendarLoader", () => {
    it("should render the structure correctly", () => {
        const loading = shallow(createElement(CalendarLoader));

        expect(loading.getElement()).toEqual(
            createElement(
                "div",
                { className: "widget-calendar-loading-wrapper" },
                createElement("div", { className: "widget-calendar-loading-indicator" }, ...generateDivs(12))
            )
        );
    });
});
