import { createElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import AccordionGroup, { AccGroup, AccordionGroupProps } from "../AccordionGroup";

describe("AccordionGroup", () => {
    let defaultGroup: AccGroup;
    let defaultAccordionGroupProps: AccordionGroupProps;

    beforeEach(() => {
        defaultGroup = { header: "header", content: <span>content</span>, collapsed: true, visible: true };
        defaultAccordionGroupProps = { group: defaultGroup, showHeaderIcon: "right", animateHeaderIcon: true };
    });

    it("doesn't render when the group isn't visible", () => {
        const accordionGroup = shallow(
            <AccordionGroup {...defaultAccordionGroupProps} group={{ ...defaultGroup, visible: false }} />
        );

        expect(accordionGroup).toMatchSnapshot();
    });

    describe("with dispatch", () => {
        function mountAccordionGroupWithDispatch(
            accordionGroupProps: AccordionGroupProps,
            dispatch?: () => void
        ): ShallowWrapper {
            const resDispatch = dispatch ?? jest.fn();

            return shallow(<AccordionGroup {...accordionGroupProps} accordionGroupsDispatch={resDispatch} />);
        }

        it("renders correctly when the group is visible and collapsed", () => {
            const accordionGroup = mountAccordionGroupWithDispatch(defaultAccordionGroupProps);

            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group is visible and expanded", () => {
            const accordionGroup = mountAccordionGroupWithDispatch({
                ...defaultAccordionGroupProps,
                group: { ...defaultGroup, collapsed: false }
            });

            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group is visible and gets expanded", () => {
            const accordionGroup = mountAccordionGroupWithDispatch(defaultAccordionGroupProps);

            accordionGroup.setProps({ group: { ...defaultGroup, collapsed: false } });
            // expect(accordionGroup.find(".widget-accordion-group-content-wrapper")).toHaveLength(1);
            // accordionGroup.find(".widget-accordion-group-content-wrapper").simulate("transitionEnd");
            // accordionGroup.update();
            // TODO wait on the animation to be completed
            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group is visible and gets collapsed", () => {
            const accordionGroup = mountAccordionGroupWithDispatch({
                ...defaultAccordionGroupProps,
                group: { ...defaultGroup, collapsed: false }
            });

            accordionGroup.setProps({ group: { ...defaultGroup, collapsed: true } });
            // TODO wait on the animation to be completed
            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group becomes visible and is collapsed", () => {
            const accordionGroup = mountAccordionGroupWithDispatch({
                ...defaultAccordionGroupProps,
                group: { ...defaultGroup, visible: false }
            });

            accordionGroup.setProps({ group: { ...defaultGroup, visible: true } });
            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group becomes visible and is expanded", () => {
            const group = { ...defaultGroup, collapsed: false, visible: false };

            const accordionGroup = mountAccordionGroupWithDispatch({
                ...defaultAccordionGroupProps,
                group
            });

            accordionGroup.setProps({ group: { ...group, visible: true } });
            expect(accordionGroup).toMatchSnapshot();
        });

        it("calls the dispatch from AccordionGroupsDispatch when clicking the header to expand", () => {
            const dispatchMock = jest.fn();

            const accordionGroup = mountAccordionGroupWithDispatch(defaultAccordionGroupProps, dispatchMock);

            accordionGroup.find("header").simulate("click");
            expect(dispatchMock).toHaveBeenCalledTimes(1);
            expect(dispatchMock).toHaveBeenCalledWith({ type: "expand", group: defaultGroup });
        });

        it("calls the dispatch from AccordionGroupsDispatch when clicking the header to collapse", () => {
            const group = { ...defaultGroup, collapsed: false };
            const dispatchMock = jest.fn();

            const accordionGroup = mountAccordionGroupWithDispatch(
                { ...defaultAccordionGroupProps, group },
                dispatchMock
            );

            accordionGroup.find("header").simulate("click");
            expect(dispatchMock).toHaveBeenCalledTimes(1);
            expect(dispatchMock).toHaveBeenCalledWith({
                type: "collapse",
                group
            });
        });

        it("applies the correct class when the header icon is aligned right", () => {
            const accordionGroup = mountAccordionGroupWithDispatch(defaultAccordionGroupProps);

            expect(accordionGroup.find("header").prop("className")).toContain(
                "widget-accordion-group-header-icon-right"
            );
        });

        it("applies the correct class when the header icon is aligned left", () => {
            const accordionGroup = mountAccordionGroupWithDispatch({
                ...defaultAccordionGroupProps,
                showHeaderIcon: "left"
            });

            expect(accordionGroup.find("header").prop("className")).toContain(
                "widget-accordion-group-header-icon-left"
            );
        });

        it("doesn't render the icon when set to not visible", () => {
            const accordionGroup = mountAccordionGroupWithDispatch({
                ...defaultAccordionGroupProps,
                showHeaderIcon: "no"
            });

            expect(accordionGroup).toMatchSnapshot();
        });

        it("applies the correct class when the header icon needs to animate", () => {
            const accordionGroup = mountAccordionGroupWithDispatch(defaultAccordionGroupProps);

            expect(accordionGroup.find(".widget-accordion-group-header-icon").prop("className")).toContain(
                "widget-accordion-group-header-icon-animate"
            );
        });

        it("applies no animate class when the header icon doesn't need to animate", () => {
            const accordionGroup = mountAccordionGroupWithDispatch({
                ...defaultAccordionGroupProps,
                animateHeaderIcon: false
            });

            expect(accordionGroup.find(".widget-accordion-group-header-icon").prop("className")).not.toContain(
                "widget-accordion-group-header-icon-animate"
            );
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
