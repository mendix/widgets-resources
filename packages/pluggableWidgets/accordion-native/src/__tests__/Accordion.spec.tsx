import { actionValue, dynamicValue, EditableValueBuilder } from "@mendix/piw-utils-internal";
import { createElement } from "react";
import { Pressable, Text } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";
import { Accordion, Props } from "../Accordion";
import { AnimatedCollapsibleView } from "../components/CollapsibleView";
import { GroupIcon } from "../components/GroupIcon";

const defaultProps = (): Props => ({
    name: "accordion-test",
    style: [],
    groups: [
        {
            headerRenderMode: "text",
            headerTextRenderMode: "heading1",
            headerText: dynamicValue<string>("Header1"),
            headerContent: undefined,
            content: <Text>Content</Text>,
            visible: dynamicValue<boolean>(true),
            groupCollapsed: "groupStartExpanded",
            groupCollapsedDynamic: dynamicValue<boolean>(undefined),
            groupCollapsedAttribute: new EditableValueBuilder<boolean>().withValue(undefined).build(),
            groupOnChange: actionValue()
        },
        {
            headerRenderMode: "custom",
            headerTextRenderMode: "heading1",
            headerText: dynamicValue<string>(undefined),
            headerContent: <Text>Header2</Text>,
            content: <Text>Content</Text>,
            visible: dynamicValue<boolean>(true),
            groupCollapsed: "groupStartExpanded",
            groupCollapsedDynamic: dynamicValue<boolean>(undefined),
            groupCollapsedAttribute: new EditableValueBuilder<boolean>().withValue(undefined).build(),
            groupOnChange: actionValue()
        }
    ],
    collapsible: true,
    collapseBehavior: "singleExpanded",
    icon: "right",
    iconExpanded: undefined,
    iconCollapsed: undefined
});

describe("Accordion", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    describe("in collapsible & single expanded group mode", () => {
        it("renders correctly", () => {
            const accordion = render(<Accordion {...defaultProps()} />);

            expect(accordion.toJSON()).toMatchSnapshot();
        });

        it("renders the accordion groups icon on left side", () => {
            const accordion = render(<Accordion {...defaultProps()} icon={"left"} />);

            expect(accordion.UNSAFE_queryAllByType(Pressable)[0].props.style).toMatchSnapshot();
        });

        it("renders the accordion groups without an icon", () => {
            const accordion = render(<Accordion {...defaultProps()} icon={"no"} />);

            expect(accordion.UNSAFE_queryAllByType(GroupIcon)).toHaveLength(0);
        });

        it("only renders the last group as expanded when multiple are specified as expanded", () => {
            const props = defaultProps();
            const accordion = render(<Accordion {...props} />);

            const views = accordion.UNSAFE_queryAllByType(AnimatedCollapsibleView);
            expect(views[0].props.isExpanded).toBeFalsy();
            expect(views[1].props.isExpanded).toBeTruthy();
        });

        it("renders the second accordion group initially collapsed when specified", () => {
            const customProps = defaultProps();
            customProps.groups[1].groupCollapsed = "groupStartCollapsed";
            const accordion = render(<Accordion {...customProps} />);

            const views = accordion.UNSAFE_queryAllByType(AnimatedCollapsibleView);
            expect(views[0].props.isExpanded).toBeTruthy();
            expect(views[1].props.isExpanded).toBeFalsy();
        });

        it("hides the first accordion group when visibility is false", () => {
            const customProps = defaultProps();
            customProps.groups[0].visible = dynamicValue(false);
            const accordion = render(<Accordion {...customProps} />);

            expect(accordion.UNSAFE_queryAllByType(AnimatedCollapsibleView)).toHaveLength(1);
        });

        it("renders the second accordion group initially expanded based on expression", () => {
            const customProps = defaultProps();
            customProps.groups[1].groupCollapsed = "groupStartDynamic";
            customProps.groups[1].groupCollapsedDynamic = dynamicValue(false);
            const accordion = render(<Accordion {...customProps} />);

            const accordionGroupViews = accordion.UNSAFE_queryAllByType(AnimatedCollapsibleView);
            expect(accordionGroupViews[0].props.isExpanded).toBeFalsy();
            expect(accordionGroupViews[1].props.isExpanded).toBeTruthy();
        });

        it("renders the second accordion group initially collapsed based on expression", () => {
            const customProps = defaultProps();
            customProps.groups[1].groupCollapsed = "groupStartDynamic";
            customProps.groups[1].groupCollapsedDynamic = dynamicValue(true);
            const accordion = render(<Accordion {...customProps} />);

            const accordionGroupViews = accordion.UNSAFE_queryAllByType(AnimatedCollapsibleView);
            expect(accordionGroupViews[0].props.isExpanded).toBeTruthy();
            expect(accordionGroupViews[1].props.isExpanded).toBeFalsy();
        });

        it("renders the second accordion group initially expanded based on attribute", () => {
            const customProps = defaultProps();
            customProps.groups[1].groupCollapsedAttribute = new EditableValueBuilder<boolean>()
                .withValue(false)
                .build();
            const accordion = render(<Accordion {...customProps} />);

            const accordionGroupViews = accordion.UNSAFE_queryAllByType(AnimatedCollapsibleView);
            expect(accordionGroupViews[0].props.isExpanded).toBeFalsy();
            expect(accordionGroupViews[1].props.isExpanded).toBeTruthy();
        });

        /**
         * The behavior of this test is not as expected, explanation for it is as follows:
         * Both groups have the "expanded" option. When they are processed, only the last one stays open, because this is
         * in 'singleExpanded' mode. Only after that, the second widgets attribute value is processed and set to true.
         * This closes the second group, which results in both of them being closed.
         */
        it("renders the second accordion group initially collapsed based on attribute", () => {
            const customProps = defaultProps();
            customProps.groups[1].groupCollapsedAttribute = new EditableValueBuilder<boolean>().withValue(true).build();
            const accordion = render(<Accordion {...customProps} />);

            const accordionGroupViews = accordion.UNSAFE_queryAllByType(AnimatedCollapsibleView);
            expect(accordionGroupViews[0].props.isExpanded).toBeFalsy();
            expect(accordionGroupViews[1].props.isExpanded).toBeFalsy();
        });

        it("executes the first accordion group onChange action when header pressed", () => {
            const props = defaultProps();
            const accordion = render(<Accordion {...props} />);

            fireEvent.press(accordion.getByText("Header1"));
            expect(props.groups[0].groupOnChange?.execute).toHaveBeenCalledTimes(1);
        });

        it("opens and closes a group when clicking the header", () => {
            const props = defaultProps();
            const accordion = render(<Accordion {...props} />);

            const accordionGroupViews = accordion.UNSAFE_getAllByType(AnimatedCollapsibleView);
            expect(accordionGroupViews[0].props.isExpanded).toBeFalsy();
            expect(accordionGroupViews[1].props.isExpanded).toBeTruthy();

            fireEvent.press(accordion.getByText("Header1"));
            expect(accordionGroupViews[0].props.isExpanded).toBeTruthy();
            expect(accordionGroupViews[1].props.isExpanded).toBeFalsy();

            fireEvent.press(accordion.getByText("Header1"));
            expect(accordionGroupViews[0].props.isExpanded).toBeFalsy();
            expect(accordionGroupViews[1].props.isExpanded).toBeFalsy();
        });
    });

    describe("in collapsible & multi expanded group mode", () => {
        it("renders correctly", () => {
            const customProps = defaultProps();
            customProps.collapseBehavior = "multipleExpanded";
            const accordion = render(<Accordion {...customProps} />);

            const accordionGroupViews = accordion.UNSAFE_getAllByType(AnimatedCollapsibleView);
            expect(accordionGroupViews[0].props.isExpanded).toBeTruthy();
            expect(accordionGroupViews[1].props.isExpanded).toBeTruthy();
        });

        it("opens and closes a group when clicking the header", () => {
            const customProps = defaultProps();
            customProps.collapseBehavior = "multipleExpanded";
            const accordion = render(<Accordion {...customProps} />);

            const accordionGroupViews = accordion.UNSAFE_getAllByType(AnimatedCollapsibleView);
            expect(accordionGroupViews[0].props.isExpanded).toBeTruthy();
            expect(accordionGroupViews[1].props.isExpanded).toBeTruthy();

            fireEvent.press(accordion.getByText("Header1"));
            expect(accordionGroupViews[0].props.isExpanded).toBeFalsy();
            expect(accordionGroupViews[1].props.isExpanded).toBeTruthy();

            fireEvent.press(accordion.getByText("Header1"));
            expect(accordionGroupViews[0].props.isExpanded).toBeTruthy();
            expect(accordionGroupViews[1].props.isExpanded).toBeTruthy();
        });
    });

    describe("in non-collapsible mode", () => {
        it("renders all groups as expanded", () => {
            const customProps = defaultProps();
            customProps.collapsible = false;
            const accordion = render(<Accordion {...customProps} />);

            const accordionGroupViews = accordion.UNSAFE_getAllByType(AnimatedCollapsibleView);
            expect(accordionGroupViews[0].props.isExpanded).toBeTruthy();
            expect(accordionGroupViews[1].props.isExpanded).toBeTruthy();
        });

        it("does not close a group when clicking the header", () => {
            const customProps = defaultProps();
            customProps.collapsible = false;
            const accordion = render(<Accordion {...customProps} />);

            expect(() => fireEvent.press(accordion.getByText("Header1"))).toThrow(
                'No handler function found for event: "press"'
            );
            const accordionGroupViews = accordion.UNSAFE_getAllByType(AnimatedCollapsibleView);
            expect(accordionGroupViews[0].props.isExpanded).toBeTruthy();
            expect(accordionGroupViews[1].props.isExpanded).toBeTruthy();
        });
    });
});
