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
        showGroupDivider: true,
        title: () => dynamicValue<string>("title1"),
        description: () => dynamicValue<string>("description"),
        customIcon: () => <img src={"test"} />,
        customGroupDivider: () => <p>Custom Divider</p>,
        customTitle: () => <p>Custom Title</p>,
        customEventDateTime: () => <p>Custom Event Date Time</p>,
        customDescription: () => <p>Custom Description</p>
    };
    it("renders correctly with default props", () => {
        const component = shallow(<Timeline {...defaultProps} />);
        expect(component).toMatchSnapshot();
    });
});
