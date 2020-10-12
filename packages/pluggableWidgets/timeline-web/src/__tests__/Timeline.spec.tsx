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
        renderMode: "basic",
        groupByKey: "day",
        data: listValueBuilder.simple(),
        eventTime: () => new EditableValueBuilder<Date>().withValue(new Date(1453, 4, 29)).build(),
        showGroupHeader: true,
        title: () => new EditableValueBuilder<string>().withValue("title").build(),
        description: () => new EditableValueBuilder<string>().withValue("description").build(),
        time: () => dynamicValue<string>("time"),
        customIcon: () => <img src={"test"} />,
        customGroupHeader: () => <p>Custom Divider</p>,
        customTitle: () => <p>Custom Title</p>,
        customEventDateTime: () => <p>Custom Event Date Time</p>,
        customDescription: () => <p>Custom Description</p>,
        groupByMonthOptions: "month",
        groupByDayOptions: "dayName",
        eventOrder: "descending"
    };
    it("renders correctly with basic props", () => {
        const component = shallow(<Timeline {...defaultProps} />);
        expect(component).toMatchSnapshot();
    });
});
