import { createElement } from "react";
import { mount, ReactWrapper, shallow } from "enzyme";
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
                { header: "header", content: <span>content</span>, initiallyCollapsed: true, visible: true },
                { header: "header2", content: <span>content2</span>, initiallyCollapsed: true, visible: false }
            ],
            collapsible,
            singleExpandedGroup,
            generateHeaderIcon: jest.fn(),
            showGroupHeaderIcon: "right"
        };
    }

    describe("collapsible AccordionGroupWrapper", () => {
        let accordion: ReactWrapper;

        const container = document.createElement("div");
        container.id = "container";
        document.body.appendChild(container);

        beforeEach(() => {
            defaultProps = getProps(true, true);
        });

        afterEach(() => {
            accordion.unmount();
        });

        it("gives the next accordion group button focus on arrow down key down", () => {
            const groups = [...defaultProps.groups];
            groups[1].visible = true;

            accordion = mount(<Accordion {...defaultProps} groups={groups} />, {
                attachTo: document.querySelector("#container") as HTMLDivElement
            });

            const firstAccordionGroupButton = accordion.find(".widget-accordion-group-header-button").first();

            const keyboardEvent = {
                key: "ArrowDown",
                preventDefault: jest.fn(),
                currentTarget: firstAccordionGroupButton.getDOMNode()
            };

            firstAccordionGroupButton.simulate("keydown", keyboardEvent);
            expect(accordion.find(".widget-accordion-group-header-button").last().getDOMNode()).toBe(
                document.activeElement
            );
        });

        it("gives the previous accordion group button focus on arrow up key down", () => {
            const groups = [...defaultProps.groups];
            groups[1].visible = true;

            accordion = mount(<Accordion {...defaultProps} groups={groups} />, {
                attachTo: document.querySelector("#container") as HTMLDivElement
            });

            const lastAccordionGroupButton = accordion.find(".widget-accordion-group-header-button").last();
            const keyboardEvent = {
                key: "ArrowUp",
                preventDefault: jest.fn(),
                currentTarget: lastAccordionGroupButton.getDOMNode()
            };

            (lastAccordionGroupButton.getDOMNode() as HTMLButtonElement).focus();
            lastAccordionGroupButton.simulate("keydown", keyboardEvent);
            expect(accordion.find(".widget-accordion-group-header-button").first().getDOMNode()).toBe(
                document.activeElement
            );
        });

        it("gives the first accordion group button focus on Home key down", () => {
            const groups = [
                ...defaultProps.groups,
                { header: "header3", content: <span>content3</span>, visible: true }
            ];
            groups[1].visible = true;

            accordion = mount(<Accordion {...defaultProps} groups={groups} />, {
                attachTo: document.querySelector("#container") as HTMLDivElement
            });

            const lastAccordionGroupButton = accordion.find(".widget-accordion-group-header-button").last();
            const keyboardEvent = {
                key: "Home",
                preventDefault: jest.fn(),
                currentTarget: lastAccordionGroupButton.getDOMNode()
            };

            (lastAccordionGroupButton.getDOMNode() as HTMLButtonElement).focus();
            lastAccordionGroupButton.simulate("keydown", keyboardEvent);
            expect(accordion.find(".widget-accordion-group-header-button").first().getDOMNode()).toBe(
                document.activeElement
            );
        });

        it("gives the last accordion group button focus on End key down", () => {
            const groups = [
                ...defaultProps.groups,
                { header: "header3", content: <span>content3</span>, visible: true }
            ];
            groups[1].visible = true;

            accordion = mount(<Accordion {...defaultProps} groups={groups} />, {
                attachTo: document.querySelector("#container") as HTMLDivElement
            });

            const firstAccordionGroupButton = accordion.find(".widget-accordion-group-header-button").first();
            const keyboardEvent = {
                key: "End",
                preventDefault: jest.fn(),
                currentTarget: firstAccordionGroupButton.getDOMNode()
            };

            (firstAccordionGroupButton.getDOMNode() as HTMLButtonElement).focus();
            firstAccordionGroupButton.simulate("keydown", keyboardEvent);
            expect(accordion.find(".widget-accordion-group-header-button").last().getDOMNode()).toBe(
                document.activeElement
            );
        });

        it("remains focus on the last accordion group button on arrow down key down", () => {
            const groups = [
                ...defaultProps.groups,
                { header: "header3", content: <span>content3</span>, visible: true }
            ];
            groups[1].visible = true;

            accordion = mount(<Accordion {...defaultProps} groups={groups} />, {
                attachTo: document.querySelector("#container") as HTMLDivElement
            });

            const lastAccordionGroupButton = accordion.find(".widget-accordion-group-header-button").last();
            const keyboardEvent = {
                key: "ArrowDown",
                preventDefault: jest.fn(),
                currentTarget: lastAccordionGroupButton.getDOMNode()
            };

            (lastAccordionGroupButton.getDOMNode() as HTMLButtonElement).focus();
            lastAccordionGroupButton.simulate("keydown", keyboardEvent);
            expect(lastAccordionGroupButton.getDOMNode()).toBe(document.activeElement);
        });
    });

    it("renders correctly without tabindex", () => {
        const accordion = shallow(<Accordion {...getProps(true, true)} tabIndex={undefined} />);
        expect(accordion).toMatchSnapshot();
    });

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

            accordion.find(".widget-accordion-group-header-button").simulate("click");
            expect(accordion).toMatchSnapshot();
        });

        it("allows one group to be expanded only", () => {
            const groups = [...defaultProps.groups];
            groups[1].visible = true;
            const accordion = mount(<Accordion {...defaultProps} groups={groups} />);

            accordion.find(".widget-accordion-group-header-button").first().simulate("click");
            accordion.find(".widget-accordion-group-header-button").last().simulate("click");
            expect(accordion).toMatchSnapshot();
        });

        it("collapses a group", () => {
            const accordion = mount(<Accordion {...defaultProps} />);

            accordion.find(".widget-accordion-group-header-button").first().simulate("click");
            accordion.find(".widget-accordion-group-header-button").first().simulate("click");
            expect(accordion).toMatchSnapshot();
        });

        it("inits with group initially collapsed settings", () => {
            const groups = [...defaultProps.groups];
            groups[0].initiallyCollapsed = false;

            const accordion = shallow(<Accordion {...defaultProps} groups={groups} />);
            expect(accordion).toMatchSnapshot();
        });

        it("inits with not more than one group expanded", () => {
            const groups = [...defaultProps.groups].map(group => ({ ...group, initiallyCollapsed: false }));

            const accordion = shallow(<Accordion {...defaultProps} groups={groups} />);
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

            accordion.find(".widget-accordion-group-header-button").simulate("click");
            expect(accordion).toMatchSnapshot();
        });

        it("allows multiple groups to be expanded", () => {
            const groups = [...defaultProps.groups];
            groups[1].visible = true;
            const accordion = mount(<Accordion {...defaultProps} groups={groups} />);

            accordion.find(".widget-accordion-group-header-button").first().simulate("click");
            accordion.find(".widget-accordion-group-header-button").last().simulate("click");
            expect(accordion).toMatchSnapshot();
        });

        it("collapses a group", () => {
            const groups = [...defaultProps.groups];
            groups[1].visible = true;
            const accordion = mount(<Accordion {...defaultProps} groups={groups} />);

            accordion.find(".widget-accordion-group-header-button").first().simulate("click");
            accordion.find(".widget-accordion-group-header-button").last().simulate("click");
            accordion.find(".widget-accordion-group-header-button").first().simulate("click");
            expect(accordion).toMatchSnapshot();
        });

        it("inits with group initially collapsed settings", () => {
            const groups = [...defaultProps.groups].map(group => ({ ...group, initiallyCollapsed: false }));
            groups.push({ header: "header3", content: <span>content3</span>, initiallyCollapsed: true, visible: true });

            const accordion = shallow(<Accordion {...defaultProps} groups={groups} />);
            expect(accordion).toMatchSnapshot();
        });

        it("applies group collapsed value changes", () => {
            const accordion = shallow(<Accordion {...defaultProps} />);
            const newGroups = [...defaultProps.groups];
            newGroups[1].collapsed = false;
            accordion.setProps({ groups: newGroups });

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
