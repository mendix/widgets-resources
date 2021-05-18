import { createElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import AccordionGroup, { AccGroup } from "../AccordionGroup";

describe("AccordionGroup", () => {
    let defaultGroup: AccGroup;

    beforeEach(() => {
        defaultGroup = { header: "header", content: <span>content</span>, collapsed: true, visible: true };
    });

    it("doesn't render when the group isn't visible", () => {
        const accordionGroup = shallow(<AccordionGroup group={{ ...defaultGroup, visible: false }} />);

        expect(accordionGroup).toMatchSnapshot();
    });

    describe("with dispatch", () => {
        function mountAccordionGroupWithDispatch(group: AccGroup, dispatch?: () => void): ShallowWrapper {
            const resDispatch = dispatch ?? jest.fn();

            return shallow(<AccordionGroup group={group} accordionGroupsDispatch={resDispatch} />);
        }

        it("loads the content lazily when the group is visible and collapsed", () => {
            const accordionGroup = mountAccordionGroupWithDispatch(defaultGroup);

            expect(accordionGroup).toMatchSnapshot();
        });

        it("displays the content when the group is visible and expanded", () => {
            const accordionGroup = mountAccordionGroupWithDispatch({ ...defaultGroup, collapsed: false });

            expect(accordionGroup).toMatchSnapshot();
        });

        it("displays the content when the group is visible and gets expanded", () => {
            const accordionGroup = mountAccordionGroupWithDispatch(defaultGroup);

            accordionGroup.setProps({ group: { ...defaultGroup, collapsed: false } });
            expect(accordionGroup).toMatchSnapshot();
        });

        it("keeps the content in DOM when the group is visible and gets collapsed", () => {
            const accordionGroup = mountAccordionGroupWithDispatch({ ...defaultGroup, collapsed: false });

            accordionGroup.setProps({ group: { ...defaultGroup, collapsed: true } });
            expect(accordionGroup).toMatchSnapshot();
        });

        it("loads the content lazily when the group becomes visible and is collapsed", () => {
            const accordionGroup = mountAccordionGroupWithDispatch({ ...defaultGroup, visible: false });

            accordionGroup.setProps({ group: { ...defaultGroup, visible: true } });
            expect(accordionGroup).toMatchSnapshot();
        });

        it("displays the content when the group becomes visible and is expanded", () => {
            const group = { ...defaultGroup, collapsed: false, visible: false };

            const accordionGroup = mountAccordionGroupWithDispatch(group);

            accordionGroup.setProps({ group: { ...group, visible: true } });
            expect(accordionGroup).toMatchSnapshot();
        });

        it("calls the dispatch from AccordionGroupsDispatch when clicking the header to expand", () => {
            const dispatchMock = jest.fn();

            const accordionGroup = mountAccordionGroupWithDispatch(defaultGroup, dispatchMock);

            accordionGroup.find("header").simulate("click");
            expect(dispatchMock).toHaveBeenCalledTimes(1);
            expect(dispatchMock).toHaveBeenCalledWith({ type: "expand", group: defaultGroup });
        });

        it("calls the dispatch from AccordionGroupsDispatch when clicking the header to collapse", () => {
            const group = { ...defaultGroup, collapsed: false };
            const dispatchMock = jest.fn();

            const accordionGroup = mountAccordionGroupWithDispatch(group, dispatchMock);

            accordionGroup.find("header").simulate("click");
            expect(dispatchMock).toHaveBeenCalledTimes(1);
            expect(dispatchMock).toHaveBeenCalledWith({
                type: "collapse",
                group
            });
        });
    });

    describe("without dispatch", () => {
        it("displays the content when the group is visible", () => {
            const accordionGroup = shallow(<AccordionGroup group={{ ...defaultGroup, collapsed: false }} />);

            expect(accordionGroup).toMatchSnapshot();
        });

        it("displays the content when the group becomes visible", () => {
            const group = { ...defaultGroup, visible: false, collapsed: false };
            const accordionGroup = shallow(
                <AccordionGroup group={{ ...defaultGroup, visible: false, collapsed: false }} />
            );

            accordionGroup.setProps({ group: { ...group, visible: true } });
            expect(accordionGroup).toMatchSnapshot();
        });
    });
});
