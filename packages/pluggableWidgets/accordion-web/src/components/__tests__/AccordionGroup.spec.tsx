import { createElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import AccordionGroup, { AccordionGroupProps } from "../AccordionGroup";

describe("AccordionGroup", () => {
    let defaultAccordionGroupProps: AccordionGroupProps;

    beforeEach(() => {
        defaultAccordionGroupProps = {
            header: "header",
            content: <span>content</span>,
            collapsed: true,
            visible: true,
            dynamicClassName: "class-name",
            animateCollapsing: false, // testing animations with Enzyme doesn't work
            generateIcon: jest.fn(),
            showHeaderIcon: "right"
        };
    });

    it("doesn't render when the group isn't visible", () => {
        const accordionGroup = shallow(<AccordionGroup {...defaultAccordionGroupProps} visible={false} />);

        expect(defaultAccordionGroupProps.generateIcon).not.toHaveBeenCalled();
        expect(accordionGroup).toMatchSnapshot();
    });

    describe("with toggleCollapsed", () => {
        function mountAccordionGroupWithDispatch(
            accordionGroupProps: AccordionGroupProps,
            toggleCollapsed?: () => void
        ): ShallowWrapper {
            const resToggleCollapsed = toggleCollapsed ?? jest.fn();

            return shallow(<AccordionGroup {...accordionGroupProps} toggleCollapsed={resToggleCollapsed} />);
        }

        it("renders correctly when the group is visible and collapsed", () => {
            const accordionGroup = mountAccordionGroupWithDispatch(defaultAccordionGroupProps);

            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledTimes(1);
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledWith(true);
            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group is visible and expanded", () => {
            const accordionGroup = mountAccordionGroupWithDispatch({
                ...defaultAccordionGroupProps,
                collapsed: false
            });

            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledTimes(1);
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledWith(false);
            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group is visible and gets expanded", () => {
            const accordionGroup = mountAccordionGroupWithDispatch(defaultAccordionGroupProps);
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledTimes(1);
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledWith(true);

            accordionGroup.setProps({ collapsed: false });
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledTimes(3);
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledWith(false);
            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group is visible and gets collapsed", () => {
            const accordionGroup = mountAccordionGroupWithDispatch({
                ...defaultAccordionGroupProps,
                collapsed: false
            });
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledTimes(1);
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledWith(false);

            accordionGroup.setProps({ collapsed: true });
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledTimes(3);
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledWith(true);
            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group becomes visible and is collapsed", () => {
            const accordionGroup = mountAccordionGroupWithDispatch({
                ...defaultAccordionGroupProps,
                visible: false
            });
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledTimes(0);

            accordionGroup.setProps({ visible: true });
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledTimes(1);
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledWith(true);
            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group becomes visible and is expanded", () => {
            const accordionGroup = mountAccordionGroupWithDispatch({
                ...defaultAccordionGroupProps,
                collapsed: false,
                visible: false
            });
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledTimes(0);

            accordionGroup.setProps({ visible: true });
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledTimes(1);
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledWith(false);
            expect(accordionGroup).toMatchSnapshot();
        });

        it("calls toggleCollapsed when clicking the header to expand", () => {
            const toggleCollapsedMock = jest.fn();

            const accordionGroup = mountAccordionGroupWithDispatch(defaultAccordionGroupProps, toggleCollapsedMock);

            accordionGroup.find("header").simulate("click");
            expect(toggleCollapsedMock).toHaveBeenCalledTimes(1);
        });

        it("calls toggleCollapsed when clicking the header to collapse", () => {
            const toggleCollapsedMock = jest.fn();

            const accordionGroup = mountAccordionGroupWithDispatch(
                { ...defaultAccordionGroupProps, collapsed: false },
                toggleCollapsedMock
            );

            accordionGroup.find("header").simulate("click");
            expect(toggleCollapsedMock).toHaveBeenCalledTimes(1);
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
    });

    describe("without toggleCollapsed", () => {
        it("displays the content when the group is visible", () => {
            const accordionGroup = shallow(<AccordionGroup {...defaultAccordionGroupProps} collapsed={false} />);

            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledTimes(0);
            expect(accordionGroup).toMatchSnapshot();
        });

        it("displays the content when the group becomes visible", () => {
            const accordionGroup = shallow(
                <AccordionGroup {...defaultAccordionGroupProps} visible={false} collapsed={false} />
            );

            accordionGroup.setProps({ visible: true });
            expect(defaultAccordionGroupProps.generateIcon).toHaveBeenCalledTimes(0);
            expect(accordionGroup).toMatchSnapshot();
        });
    });
});
