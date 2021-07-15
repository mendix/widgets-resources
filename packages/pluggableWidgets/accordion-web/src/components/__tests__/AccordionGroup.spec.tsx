import { createElement } from "react";
import { mount, shallow, ShallowWrapper } from "enzyme";
import { AccordionGroup, AccordionGroupProps, Target } from "../AccordionGroup";

describe("AccordionGroup", () => {
    let defaultAccordionGroupProps: AccordionGroupProps;

    beforeEach(() => {
        defaultAccordionGroupProps = {
            id: "id",
            header: "header",
            content: <span>content</span>,
            collapsed: true,
            visible: true,
            dynamicClassName: "class-name",
            collapsible: false,
            animateContent: false, // testing animations with Enzyme doesn't work
            generateHeaderIcon: jest.fn(),
            showHeaderIcon: "right"
        };
    });

    it("doesn't render when the group isn't visible", () => {
        const accordionGroup = shallow(<AccordionGroup {...defaultAccordionGroupProps} visible={false} />);

        expect(defaultAccordionGroupProps.generateHeaderIcon).not.toHaveBeenCalled();
        expect(accordionGroup).toMatchSnapshot();
    });

    describe("collapsible", () => {
        function mountCollapsibleAccordionGroup(
            accordionGroupProps: AccordionGroupProps,
            toggleCollapsed?: () => void,
            changeFocus?: (focusedGroupHeader: EventTarget | null, focusTargetGroupHeader: Target) => void
        ): ShallowWrapper {
            const resToggleCollapsed = toggleCollapsed ?? jest.fn();

            return shallow(
                <AccordionGroup
                    {...accordionGroupProps}
                    collapsible
                    toggleCollapsed={resToggleCollapsed}
                    changeFocus={changeFocus}
                />
            );
        }

        it("renders correctly when the group is visible and collapsed", () => {
            const accordionGroup = mountCollapsibleAccordionGroup(defaultAccordionGroupProps);

            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledTimes(1);
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledWith(true);
            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group is visible and expanded", () => {
            const accordionGroup = mountCollapsibleAccordionGroup({
                ...defaultAccordionGroupProps,
                collapsed: false
            });

            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledTimes(1);
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledWith(false);
            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group is visible and gets expanded", () => {
            const accordionGroup = mountCollapsibleAccordionGroup(defaultAccordionGroupProps);
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledTimes(1);
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledWith(true);

            accordionGroup.setProps({ collapsed: false });
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledTimes(3);
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledWith(false);
            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group is visible and gets collapsed", () => {
            const accordionGroup = mountCollapsibleAccordionGroup({
                ...defaultAccordionGroupProps,
                collapsed: false
            });
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledTimes(1);
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledWith(false);

            accordionGroup.setProps({ collapsed: true });
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledTimes(3);
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledWith(true);
            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group becomes visible and is collapsed", () => {
            const accordionGroup = mountCollapsibleAccordionGroup({
                ...defaultAccordionGroupProps,
                visible: false
            });
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledTimes(0);

            accordionGroup.setProps({ visible: true });
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledTimes(1);
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledWith(true);
            expect(accordionGroup).toMatchSnapshot();
        });

        it("renders correctly when the group becomes visible and is expanded", () => {
            const accordionGroup = mountCollapsibleAccordionGroup({
                ...defaultAccordionGroupProps,
                collapsed: false,
                visible: false
            });
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledTimes(0);

            accordionGroup.setProps({ visible: true });
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledTimes(1);
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledWith(false);
            expect(accordionGroup).toMatchSnapshot();
        });

        describe("header", () => {
            it("calls toggleCollapsed when clicking to expand", () => {
                const toggleCollapsedMock = jest.fn();

                const accordionGroup = mountCollapsibleAccordionGroup(defaultAccordionGroupProps, toggleCollapsedMock);

                accordionGroup.find(".widget-accordion-group-header-button").simulate("click");
                expect(toggleCollapsedMock).toHaveBeenCalledTimes(1);
            });

            it("calls toggleCollapsed when clicking to collapse", () => {
                const toggleCollapsedMock = jest.fn();

                const accordionGroup = mountCollapsibleAccordionGroup(
                    { ...defaultAccordionGroupProps, collapsed: false },
                    toggleCollapsedMock
                );

                accordionGroup.find(".widget-accordion-group-header-button").simulate("click");
                expect(toggleCollapsedMock).toHaveBeenCalledTimes(1);
            });

            it("calls toggleCollapsed on space key down", () => {
                const toggleCollapsedMock = jest.fn();

                const accordionGroup = mountCollapsibleAccordionGroup(defaultAccordionGroupProps, toggleCollapsedMock);

                const keyboardEvent = { key: " ", preventDefault: jest.fn() };

                accordionGroup.find(".widget-accordion-group-header-button").simulate("keydown", keyboardEvent);
                expect(keyboardEvent.preventDefault).toHaveBeenCalledTimes(1);
                expect(toggleCollapsedMock).toHaveBeenCalledTimes(1);
            });

            it("calls toggleCollapsed on Enter key down", () => {
                const toggleCollapsedMock = jest.fn();

                const accordionGroup = mountCollapsibleAccordionGroup(defaultAccordionGroupProps, toggleCollapsedMock);

                const keyboardEvent = { key: "Enter", preventDefault: jest.fn() };

                accordionGroup.find(".widget-accordion-group-header-button").simulate("keydown", keyboardEvent);
                expect(keyboardEvent.preventDefault).toHaveBeenCalledTimes(1);
                expect(toggleCollapsedMock).toHaveBeenCalledTimes(1);
            });

            it("calls changeFocus on arrow down key down", () => {
                const changeFocusMock = jest.fn();

                const accordionGroup = mountCollapsibleAccordionGroup(
                    defaultAccordionGroupProps,
                    undefined,
                    changeFocusMock
                );

                const keyboardEvent = { key: "ArrowDown", preventDefault: jest.fn(), currentTarget: "currentTarget" };

                accordionGroup.find(".widget-accordion-group-header-button").simulate("keydown", keyboardEvent);
                expect(keyboardEvent.preventDefault).toHaveBeenCalledTimes(1);
                expect(changeFocusMock).toHaveBeenCalledTimes(1);
                expect(changeFocusMock).toHaveBeenCalledWith(keyboardEvent.currentTarget, Target.NEXT);
            });

            it("calls changeFocus on arrow up key down", () => {
                const changeFocusMock = jest.fn();

                const accordionGroup = mountCollapsibleAccordionGroup(
                    defaultAccordionGroupProps,
                    undefined,
                    changeFocusMock
                );

                const keyboardEvent = { key: "ArrowUp", preventDefault: jest.fn(), currentTarget: "currentTarget" };

                accordionGroup.find(".widget-accordion-group-header-button").simulate("keydown", keyboardEvent);
                expect(keyboardEvent.preventDefault).toHaveBeenCalledTimes(1);
                expect(changeFocusMock).toHaveBeenCalledTimes(1);
                expect(changeFocusMock).toHaveBeenCalledWith(keyboardEvent.currentTarget, Target.PREVIOUS);
            });

            it("calls changeFocus on Home key down", () => {
                const changeFocusMock = jest.fn();

                const accordionGroup = mountCollapsibleAccordionGroup(
                    defaultAccordionGroupProps,
                    undefined,
                    changeFocusMock
                );

                const keyboardEvent = { key: "Home", preventDefault: jest.fn(), currentTarget: "currentTarget" };

                accordionGroup.find(".widget-accordion-group-header-button").simulate("keydown", keyboardEvent);
                expect(keyboardEvent.preventDefault).toHaveBeenCalledTimes(1);
                expect(changeFocusMock).toHaveBeenCalledTimes(1);
                expect(changeFocusMock).toHaveBeenCalledWith(keyboardEvent.currentTarget, Target.FIRST);
            });

            it("calls changeFocus on End key down", () => {
                const changeFocusMock = jest.fn();

                const accordionGroup = mountCollapsibleAccordionGroup(
                    defaultAccordionGroupProps,
                    undefined,
                    changeFocusMock
                );

                const keyboardEvent = { key: "End", preventDefault: jest.fn(), currentTarget: "currentTarget" };

                accordionGroup.find(".widget-accordion-group-header-button").simulate("keydown", keyboardEvent);
                expect(keyboardEvent.preventDefault).toHaveBeenCalledTimes(1);
                expect(changeFocusMock).toHaveBeenCalledTimes(1);
                expect(changeFocusMock).toHaveBeenCalledWith(keyboardEvent.currentTarget, Target.LAST);
            });

            it("calls onToggleCompletion", () => {
                const onToggleCompletionMock = jest.fn();

                const accordionGroup = mount(
                    <AccordionGroup
                        {...defaultAccordionGroupProps}
                        collapsible
                        onToggleCompletion={onToggleCompletionMock}
                    />
                );

                accordionGroup.setProps({ collapsed: false });
                expect(onToggleCompletionMock).toHaveBeenCalledTimes(1);
                expect(onToggleCompletionMock).toHaveBeenCalledWith(false);
            });

            it("applies the correct class when the header icon is aligned right", () => {
                const accordionGroup = mountCollapsibleAccordionGroup(defaultAccordionGroupProps);

                expect(accordionGroup.find(".widget-accordion-group-header-button").prop("className")).toContain(
                    "widget-accordion-group-header-button-icon-right"
                );
            });

            it("applies the correct class when the header icon is aligned left", () => {
                const accordionGroup = mountCollapsibleAccordionGroup({
                    ...defaultAccordionGroupProps,
                    showHeaderIcon: "left"
                });

                expect(accordionGroup.find(".widget-accordion-group-header-button").prop("className")).toContain(
                    "widget-accordion-group-header-button-icon-left"
                );
            });

            it("doesn't render the icon when set to not visible", () => {
                const accordionGroup = mountCollapsibleAccordionGroup({
                    ...defaultAccordionGroupProps,
                    showHeaderIcon: "no"
                });

                expect(accordionGroup).toMatchSnapshot();
            });
        });
    });

    describe("not collapsible", () => {
        it("displays the content when the group is visible", () => {
            const accordionGroup = shallow(<AccordionGroup {...defaultAccordionGroupProps} collapsed={false} />);

            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledTimes(0);
            expect(accordionGroup).toMatchSnapshot();
        });

        it("displays the content when the group becomes visible", () => {
            const accordionGroup = shallow(
                <AccordionGroup {...defaultAccordionGroupProps} visible={false} collapsed={false} />
            );

            accordionGroup.setProps({ visible: true });
            expect(defaultAccordionGroupProps.generateHeaderIcon).toHaveBeenCalledTimes(0);
            expect(accordionGroup).toMatchSnapshot();
        });
    });
});
