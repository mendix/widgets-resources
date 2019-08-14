import { shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";

import CustomToolbar from "../Toolbar";
import { CalendarProps } from "../Calendar";

describe("Toolbar", () => {
    const renderToolbar = (props: CalendarProps): ShallowWrapper<any, any> =>
        shallow(createElement(CustomToolbar as any, props));
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

        expect(toolbar).toMatchSnapshot();
    });
});
