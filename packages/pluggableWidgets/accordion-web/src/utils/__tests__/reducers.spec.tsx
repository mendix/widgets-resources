import { getCollapsedAccordionGroupsReducer } from "../reducers";

describe("getAccordionGroupsReducer", () => {
    let defaultCollapsedAccordionGroups: boolean[];

    describe("returned reducer in single expanded mode", () => {
        const reducer = getCollapsedAccordionGroupsReducer("single");

        function getDefaultCollapsedAccordionGroups(): boolean[] {
            return [true, true, true];
        }

        beforeEach(() => {
            defaultCollapsedAccordionGroups = getDefaultCollapsedAccordionGroups();
        });

        it("expands a single group", () => {
            defaultCollapsedAccordionGroups[0] = false;
            const expectedGroups = getDefaultCollapsedAccordionGroups();
            expectedGroups[1] = false;

            const receivedGroups = reducer(defaultCollapsedAccordionGroups, { type: "expand", index: 1 });
            expect(receivedGroups).toEqual(expectedGroups);
        });

        it("collapses a group", () => {
            defaultCollapsedAccordionGroups[2] = false;
            const expectedGroups = getDefaultCollapsedAccordionGroups();

            const receivedGroups = reducer(defaultCollapsedAccordionGroups, { type: "collapse", index: 2 });
            expect(receivedGroups).toEqual(expectedGroups);
        });
    });

    describe("returned reducer in multiple expanded mode", () => {
        const reducer = getCollapsedAccordionGroupsReducer("multiple");

        function getDefaultCollapsedAccordionGroupsMultiple(): boolean[] {
            return [false, true, false];
        }

        beforeEach(() => {
            defaultCollapsedAccordionGroups = getDefaultCollapsedAccordionGroupsMultiple();
        });

        it("expands an extra group", () => {
            defaultCollapsedAccordionGroups[2] = true;
            const expectedGroups = getDefaultCollapsedAccordionGroupsMultiple();

            const receivedGroups = reducer(defaultCollapsedAccordionGroups, {
                type: "expand",
                index: 2
            });
            expect(receivedGroups).toEqual(expectedGroups);
        });

        it("collapses a group", () => {
            const expectedGroups = getDefaultCollapsedAccordionGroupsMultiple();
            expectedGroups[2] = true;

            const receivedGroups = reducer(defaultCollapsedAccordionGroups, {
                type: "collapse",
                index: 2
            });
            expect(receivedGroups).toEqual(expectedGroups);
        });
    });
});
