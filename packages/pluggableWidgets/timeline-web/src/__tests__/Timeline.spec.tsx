import { shallow } from "enzyme";
import { createElement } from "react";
import { TimelineContainerProps } from "../../typings/TimelineProps";
import { buildListExpression, buildWidgetValue, ListValueBuilder } from "@mendix/piw-utils-internal";
import Timeline from "../Timeline";

describe("Timeline", () => {
    const listValueBuilder = ListValueBuilder();
    const defaultProps: TimelineContainerProps = {
        name: "timeline",
        class: "test",
        tabIndex: 0,
        customVisualization: false,
        groupByKey: "day",
        data: listValueBuilder.simple(),
        groupEvents: true,
        title: buildListExpression("title1"),
        description: buildListExpression("description"),
        timeIndication: buildListExpression("time"),
        customIcon: buildWidgetValue(<img src={"test"} />),
        customGroupHeader: buildWidgetValue(<p>Custom Divider</p>),
        customTitle: buildWidgetValue(<p>Custom Title</p>),
        customEventDateTime: buildWidgetValue(<p>Custom Event Date Time</p>),
        customDescription: buildWidgetValue(<p>Custom Description</p>),
        groupByMonthOptions: "month",
        groupByDayOptions: "dayName",
        ungroupedEventsPosition: "end"
    };
    it("renders correctly with basic props", () => {
        const component = shallow(<Timeline {...defaultProps} />);
        expect(component).toMatchSnapshot();
    });
});
