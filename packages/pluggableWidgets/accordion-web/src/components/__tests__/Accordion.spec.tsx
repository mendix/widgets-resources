import { createElement } from "react";
import { mount } from "enzyme";
import { Accordion, AccordionProps } from "../Accordion";

describe("Accordion", () => {
    let defaultProps: AccordionProps;

    function getProps(collapsible: boolean, singleExpandedGroup?: boolean): AccordionProps {
        return {
            id: "id",
            class: "",
            style: { height: "500px" },
            tabIndex: 1,
            groups: [
                { header: "header", content: <span>content</span>, visible: true },
                { header: "header2", content: <span>content2</span>, visible: false }
            ],
            collapsible,
            singleExpandedGroup,
            generateHeaderIcon: jest.fn(),
            showGroupHeaderIcon: "right"
        };
    }

    describe("in collapsible & single expanded group mode", () => {
        beforeEach(() => {
            defaultProps = getProps(true, true);
        });

        it("renders correctly", () => {
            const accordion = mount(<Accordion {...defaultProps} />);

            expect(accordion).toMatchSnapshot();
        });

        it("expands a group", () => {
            const accordion = mount(<Accordion {...defaultProps} />);

            accordion.find(".widget-accordion-group-header").simulate("click");
            expect(accordion).toMatchSnapshot();
        });

        it("allows one group to be expanded only", () => {
            const groups = [...defaultProps.groups];
            groups[1].visible = true;
            const accordion = mount(<Accordion {...defaultProps} groups={groups} />);

            accordion.find(".widget-accordion-group-header").first().simulate("click");
            accordion.find(".widget-accordion-group-header").last().simulate("click");
            expect(accordion).toMatchSnapshot();
        });

        it("collapses a group", () => {
            const accordion = mount(<Accordion {...defaultProps} />);

            accordion.find(".widget-accordion-group-header").first().simulate("click");
            accordion.find(".widget-accordion-group-header").first().simulate("click");
            expect(accordion).toMatchSnapshot();
        });
    });

    describe("in collapsible & multiple expanded group mode", () => {
        beforeEach(() => {
            defaultProps = getProps(true, false);
        });

        it("renders correctly", () => {
            const accordion = mount(<Accordion {...defaultProps} />);

            expect(accordion).toMatchSnapshot();
        });

        it("expands a group", () => {
            const accordion = mount(<Accordion {...defaultProps} />);

            accordion.find(".widget-accordion-group-header").simulate("click");
            expect(accordion).toMatchSnapshot();
        });

        it("allows multiple groups to be expanded", () => {
            const groups = [...defaultProps.groups];
            groups[1].visible = true;
            const accordion = mount(<Accordion {...defaultProps} groups={groups} />);

            accordion.find(".widget-accordion-group-header").first().simulate("click");
            accordion.find(".widget-accordion-group-header").last().simulate("click");
            expect(accordion).toMatchSnapshot();
        });

        it("collapses a group", () => {
            const groups = [...defaultProps.groups];
            groups[1].visible = true;
            const accordion = mount(<Accordion {...defaultProps} groups={groups} />);

            accordion.find(".widget-accordion-group-header").first().simulate("click");
            accordion.find(".widget-accordion-group-header").last().simulate("click");
            accordion.find(".widget-accordion-group-header").first().simulate("click");
            expect(accordion).toMatchSnapshot();
        });
    });

    describe("not collapsible", () => {
        beforeEach(() => {
            defaultProps = getProps(false);
        });

        it("renders correctly", () => {
            const accordion = mount(<Accordion {...defaultProps} />);

            expect(accordion).toMatchSnapshot();
        });
    });
});
