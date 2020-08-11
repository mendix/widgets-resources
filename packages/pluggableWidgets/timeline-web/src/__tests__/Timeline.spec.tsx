import { shallow } from "enzyme";
import { createElement } from "react";
import { TimelineContainerProps } from "../../typings/TimelineProps";
import { EditableValueBuilder, ListValueBuilder } from "@widgets-resources/piw-utils";
import Timeline from "../Timeline";

jest.mock("mendix/components/web/Icon", () => jest.requireActual("./__mocks__/mendix/components/web/Icon"));

describe("Timeline", () => {
    const listValueBuilder = ListValueBuilder();
    const defaultProps: TimelineContainerProps = {
        name: "timeline",
        class: "test",
        tabIndex: 0,
        renderMode: "basic",
        data: listValueBuilder.simple(),
        eventTime: () => new EditableValueBuilder<Date>().withValue(new Date(1453, 4, 29)).build(),
        showDayDivider: true,
        title: () => new EditableValueBuilder<string>().withValue("title").build(),
        description: () => new EditableValueBuilder<string>().withValue("description").build(),
        customIcon: () => <img src={"test"} />,
        customDayDivider: () => <p>Custom Divider</p>,
        customTitle: () => <p>Custom Title</p>,
        customEventDateTime: () => <p>Custom Event Date Time</p>,
        customDescription: () => <p>Custom Description</p>
    };
    it("renders correctly with default props", () => {
        const component = shallow(<Timeline {...defaultProps} />);
        expect(component).toMatchSnapshot();
    });
});
