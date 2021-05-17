import { createElement } from "react";
import { AccGroup } from "../../components/AccordionGroup";
import { getAccordionGroupsReducer } from "../AccordionGroupStateReducer";

describe("getAccordionGroupsReducer", () => {
    let defaultGroups: AccGroup[];

    describe("returned reducer in single expanded mode", () => {
        const reducer = getAccordionGroupsReducer("single");

        function getDefaultGroupsSingle(): AccGroup[] {
            return [
                { header: "Header1", content: <span>Content1</span>, visible: true, collapsed: true },
                { header: "Header2", content: <span>Content2</span>, visible: false, collapsed: true },
                { header: "Header3", content: <span>Content3</span>, visible: true, collapsed: true }
            ];
        }

        beforeEach(() => {
            defaultGroups = getDefaultGroupsSingle();
        });

        it("synchronizes new group data", () => {
            const expectedGroups = getDefaultGroupsSingle();
            expectedGroups[0].content = <span>NewContent1</span>;
            expectedGroups[1].visible = true;

            const receivedGroups = reducer(defaultGroups, { type: "sync", groups: expectedGroups });
            expect(receivedGroups).toEqual(expectedGroups);
        });

        it("expands a single group", () => {
            defaultGroups[0].collapsed = false;
            const expectedGroups = getDefaultGroupsSingle();
            expectedGroups[1].collapsed = false;

            const receivedGroups = reducer(defaultGroups, { type: "expand", group: defaultGroups[1] });
            expect(receivedGroups).toEqual(expectedGroups);
        });

        it("collapses a group", () => {
            defaultGroups[2].collapsed = false;
            const expectedGroups = getDefaultGroupsSingle();

            const receivedGroups = reducer(defaultGroups, { type: "collapse", group: defaultGroups[2] });
            expect(receivedGroups).toEqual(expectedGroups);
        });
    });

    describe("returned reducer in multiple expanded mode", () => {
        const reducer = getAccordionGroupsReducer("multiple");

        function getDefaultGroupsMultiple(): AccGroup[] {
            return [
                { header: "Header1", content: <span>Content1</span>, visible: true, collapsed: false },
                { header: "Header2", content: <span>Content2</span>, visible: false, collapsed: true },
                { header: "Header3", content: <span>Content3</span>, visible: true, collapsed: false }
            ];
        }

        beforeEach(() => {
            defaultGroups = getDefaultGroupsMultiple();
        });

        it("synchronizes new group data", () => {
            const expectedGroups = getDefaultGroupsMultiple();
            expectedGroups[0].content = <span>NewContent1</span>;
            expectedGroups[1].visible = true;

            const receivedGroups = reducer(defaultGroups, { type: "sync", groups: expectedGroups });
            expect(receivedGroups).toMatchObject(expectedGroups);
        });

        it("expands an extra group", () => {
            defaultGroups[2].collapsed = true;
            const expectedGroups = getDefaultGroupsMultiple();

            const receivedGroups = reducer(defaultGroups, { type: "expand", group: defaultGroups[2] });
            expect(receivedGroups).toEqual(expectedGroups);
        });

        it("collapses a group", () => {
            const expectedGroups = getDefaultGroupsMultiple();
            expectedGroups[2].collapsed = true;

            const receivedGroups = reducer(defaultGroups, { type: "collapse", group: defaultGroups[2] });
            expect(receivedGroups).toEqual(expectedGroups);
        });
    });

    describe("returned reducer in all expanded mode", () => {
        const reducer = getAccordionGroupsReducer("all");

        function getDefaultGroupsAllExpanded(): AccGroup[] {
            return [
                { header: "Header1", content: <span>Content1</span>, visible: true, collapsed: false },
                { header: "Header2", content: <span>Content2</span>, visible: false, collapsed: false },
                { header: "Header3", content: <span>Content3</span>, visible: true, collapsed: false }
            ];
        }

        beforeEach(() => {
            defaultGroups = getDefaultGroupsAllExpanded();
        });

        it("synchronizes new group data", () => {
            const expectedGroups = getDefaultGroupsAllExpanded();
            expectedGroups[0].content = <span>NewContent1</span>;
            expectedGroups[1].visible = true;

            const receivedGroups = reducer(defaultGroups, { type: "sync", groups: expectedGroups });
            expect(receivedGroups).toMatchObject(expectedGroups);
        });
    });
});
