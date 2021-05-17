import { createElement } from "react";
import { shallow } from "enzyme";
import Accordion, { AccordionProps } from "../Accordion";

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
            singleExpandedGroup
        };
    }

    describe("in collapsible & single expanded group mode", () => {
        beforeEach(() => {
            defaultProps = getProps(true, true);
        });

        it("renders correctly", () => {
            const accordion = shallow(<Accordion {...defaultProps} />);

            expect(accordion).toMatchSnapshot();
        });

        it("updates when accordion group data changes", () => {
            const accordion = shallow<AccordionProps>(<Accordion {...defaultProps} />);

            const newProps = getProps(true, true);
            newProps.groups[1].visible = true;

            accordion.setProps(newProps);
            expect(accordion).toMatchSnapshot();
        });
    });

    describe("in collapsible & multiple expanded group mode", () => {
        beforeEach(() => {
            defaultProps = getProps(true, false);
        });

        it("renders correctly", () => {
            const accordion = shallow(<Accordion {...defaultProps} />);

            expect(accordion).toMatchSnapshot();
        });

        it("updates when accordion group data changes", () => {
            const accordion = shallow<AccordionProps>(<Accordion {...defaultProps} />);

            const newProps = getProps(true, false);
            newProps.groups[1].visible = true;

            accordion.setProps(newProps);
            expect(accordion).toMatchSnapshot();
        });
    });

    describe("not collapsible", () => {
        beforeEach(() => {
            defaultProps = getProps(false);
        });

        it("renders correctly", () => {
            const accordion = shallow(<Accordion {...defaultProps} />);

            expect(accordion).toMatchSnapshot();
        });

        it("updates when accordion group data changes", () => {
            const accordion = shallow<AccordionProps>(<Accordion {...defaultProps} />);

            const newProps = getProps(false);
            newProps.groups[1].visible = true;

            accordion.setProps(newProps);
            expect(accordion).toMatchSnapshot();
        });
    });
});
