import { shallow } from "enzyme";
import { createElement, ReactNode } from "react";
import { dynamicValue } from "@widgets-resources/piw-utils";
import TimelineComponent, { TimelineComponentProps } from "../TimelineComponent";
import { BasicItemType, CustomItemType } from "../../Timeline";
import { Icon as WebIcon } from "../../__tests__/__mocks__/mendix/components/web/Icon";

jest.mock("mendix/components/web/Icon", () =>
    jest.requireActual("../../__tests__/__mocks__/mendix/components/web/Icon")
);

describe("Timeline", () => {
    const basicData = new Map<string, BasicItemType[]>();
    const customData = new Map<ReactNode, CustomItemType[]>();

    const basicItem: BasicItemType = {
        description: "Basic description",
        time: new Date(1453, 4, 29).toDateString(),
        title: "Basic title"
    };

    const basicItemWithIcon: BasicItemType = {
        ...basicItem,
        // @ts-ignore
        icon: dynamicValue<typeof WebIcon>(WebIcon, false)
    };

    const customItem: CustomItemType = {
        dayDivider: <p>Day Divider</p>,
        title: <p>Title</p>,
        eventDateTime: <p>Date Time</p>,
        description: <p>Description</p>
    };

    const customItemWithIcon: CustomItemType = {
        ...customItem,
        icon: <img src="customIcon" />
    };

    basicData.set(new Date(1453, 4, 29).toDateString(), [basicItem, basicItemWithIcon]);
    customData.set(new Date(1453, 4, 29).toDateString(), [customItem, customItemWithIcon]);

    const basicRenderProps: TimelineComponentProps = {
        data: basicData,
        renderMode: "basic",
        showDayDivider: true
    };
    const customRenderProps: TimelineComponentProps = {
        data: customData,
        renderMode: "custom",
        showDayDivider: true
    };

    it("renders timeline with basic configuration", () => {
        const component = shallow(<TimelineComponent {...basicRenderProps} />);
        expect(component).toMatchSnapshot();
    });
    it("renders timeline with custom configuration ", () => {
        const component = shallow(<TimelineComponent {...customRenderProps} />);
        expect(component).toMatchSnapshot();
    });
    it("hides the timeline header", () => {
        const component = shallow(<TimelineComponent {...basicRenderProps} showDayDivider={false} />);
        expect(component).toMatchSnapshot();
    });
});
