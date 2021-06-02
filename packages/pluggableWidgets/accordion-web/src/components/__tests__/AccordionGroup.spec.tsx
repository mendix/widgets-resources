import { createElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import AccordionGroup, { AccGroup, AccordionGroupProps } from "../AccordionGroup";

describe("AccordionGroup", () => {
    let defaultGroup: AccGroup;
    let defaultAccordionGroupProps: AccordionGroupProps;

    beforeEach(() => {
        defaultGroup = { header: "header", content: <span>content</span>, collapsed: true, visible: true };
        defaultAccordionGroupProps = { group: defaultGroup, showHeaderIcon: "right" };
    });

    it("doesn't render when the group isn't visible", () => {
        const accordionGroup = shallow(
            <AccordionGroup {...defaultAccordionGroupProps} group={{ ...defaultGroup, visible: false }} />
        );

        expect(accordionGroup).toMatchSnapshot();
    });

    it("applies the correct class when the header icon is aligned right", () => {
        const accordionGroup = shallow(<AccordionGroup {...defaultAccordionGroupProps} />);

        expect(accordionGroup.find("header").prop("className")).toContain("widget-accordion-group-header-icon-right");
    });
    it("applies the correct class when the header icon is aligned left", () => {
        const accordionGroup = shallow(<AccordionGroup {...defaultAccordionGroupProps} showHeaderIcon={"left"} />);

        expect(accordionGroup.find("header").prop("className")).toContain("widget-accordion-group-header-icon-left");
    });
    it("doesn't render the icon when set to not visible", () => {
        const accordionGroup = shallow(<AccordionGroup {...defaultAccordionGroupProps} showHeaderIcon={"no"} />);

        expect(accordionGroup).toMatchSnapshot();
    });

    describe("with dispatch", () => {
        function mountAccordionGroupWithDispatch(group: AccGroup, dispatch?: () => void): ShallowWrapper {
            const resDispatch = dispatch ?? jest.fn();

            return shallow(
                <AccordionGroup {...defaultAccordionGroupProps} group={group} accordionGroupsDispatch={resDispatch} />
            );
        }

        it("renders correctly when the group is visible and collapsed", () => {
            const accordionGroup = mountAccordionGroupWithDispatch(defaultGroup);

            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group is visible and expanded", () => {
            const accordionGroup = mountAccordionGroupWithDispatch({ ...defaultGroup, collapsed: false });

            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group is visible and gets expanded", () => {
            const accordionGroup = mountAccordionGroupWithDispatch(defaultGroup);

            accordionGroup.setProps({ group: { ...defaultGroup, collapsed: false } });
            // TODO wait on the animation to be completed
            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group is visible and gets collapsed", () => {
            const accordionGroup = mountAccordionGroupWithDispatch({ ...defaultGroup, collapsed: false });

            accordionGroup.setProps({ group: { ...defaultGroup, collapsed: true } });
            // TODO wait on the animation to be completed
            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group becomes visible and is collapsed", () => {
            const accordionGroup = mountAccordionGroupWithDispatch({ ...defaultGroup, visible: false });

            accordionGroup.setProps({ group: { ...defaultGroup, visible: true } });
            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group becomes visible and is expanded", () => {
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
            const accordionGroup = shallow(
                <AccordionGroup {...defaultAccordionGroupProps} group={{ ...defaultGroup, collapsed: false }} />
            );

            expect(accordionGroup).toMatchSnapshot();
        });

        it("displays the content when the group becomes visible", () => {
            const group = { ...defaultGroup, visible: false, collapsed: false };
            const accordionGroup = shallow(
                <AccordionGroup
                    {...defaultAccordionGroupProps}
                    group={{ ...defaultGroup, visible: false, collapsed: false }}
                />
            );

            accordionGroup.setProps({ group: { ...group, visible: true } });
            expect(accordionGroup).toMatchSnapshot();
        });
    });
});
