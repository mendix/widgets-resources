import { shallow } from "enzyme";
import { createElement } from "react";
import { TimelineContainerProps } from "../../typings/TimelineProps";
import { dynamicValue, EditableValueBuilder, ListValueBuilder } from "@widgets-resources/piw-utils";
import Timeline from "../Timeline";

jest.mock("mendix/components/web/Icon", () => jest.requireActual("./__mocks__/mendix/components/web/Icon"));

describe("Timeline", () => {
    const listValueBuilder = ListValueBuilder();
    const defaultProps: TimelineContainerProps = {
        name: "timeline",
        class: "test",
        tabIndex: 0,
        customVisualization: false,
        groupByKey: "day",
        data: listValueBuilder.simple(),
        groupAttribute: () => new EditableValueBuilder<Date>().withValue(new Date(Date.UTC(1453, 4, 29))).build(),
        groupEvents: true,
        title: () => dynamicValue<string>("title1"),
        description: () => dynamicValue<string>("description"),
        timeIndication: () => dynamicValue<string>("time"),
        customIcon: () => <img src={"test"} />,
        customGroupHeader: () => <p>Custom Divider</p>,
        customTitle: () => <p>Custom Title</p>,
        customEventDateTime: () => <p>Custom Event Date Time</p>,
        customDescription: () => <p>Custom Description</p>,
        groupByMonthOptions: "month",
        groupByDayOptions: "dayName",
        ungroupedEventsPosition: "end"
    };
    it("renders correctly with basic props", () => {
        const component = shallow(<Timeline {...defaultProps} />);
        expect(component).toMatchSnapshot();
    });
});
