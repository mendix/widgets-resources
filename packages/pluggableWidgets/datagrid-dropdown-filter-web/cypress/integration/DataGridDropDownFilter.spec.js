import page from "../../../../../configs/e2e/src/pages/page";
import datagrid from "../../../datagrid-web/tests/e2e/objects/datagrid.widget";

describe("datagrid-dropdown-filter-web", () => {
    beforeEach(() => {
        page.open(); // resets page
    });

    describe("using enumeration as attribute", () => {
        it("shows the expected result", () => {
            const grid = page.getWidget("datagrid1");
            const dropdown = page.getElement(".dropdown-container", grid);

            dropdown.click();

            const dropdownOption = page.getElement(".dropdown-list > li:nth-child(1)");

            dropdownOption.click();

            grid.waitUntil(
                () => {
                    return datagrid.getAllRows(page.getElements(".mx-name-datagrid1 .td")).length !== 12;
                },
                {
                    timeout: 3000,
                    timeoutMsg: "expected result to be different after 3s"
                }
            );
            const items = page.getElements(".td", grid);

            expect(datagrid.getAllRows(items)).toEqual(["10", "test", "test", "Yes", ""]);
        });

        it("shows the expected result with multiple selected items", () => {
            const grid = page.getWidget("datagrid1");
            const dropdown = page.getElement(".dropdown-container", grid);

            dropdown.click();

            const dropdownOption = page.getElement(".dropdown-list > li:nth-child(1)");

            const dropdownOption2 = page.getElement(".dropdown-list > li:nth-child(2)");

            dropdownOption.click();

            dropdownOption2.click();

            grid.waitUntil(
                () => {
                    return datagrid.getAllRows(page.getElements(".mx-name-datagrid1 .td")).length !== 12;
                },
                {
                    timeout: 3000,
                    timeoutMsg: "expected result to be different after 3s"
                }
            );
            const items = page.getElements(".td", grid);

            expect(datagrid.getAllRows(items)).toEqual([
                "10",
                "test",
                "test",
                "Yes",
                "",
                "20",
                "test2",
                "test2",
                "Yes",
                ""
            ]);
        });
    });

    describe("using boolean as attribute", () => {
        it("shows the expected result", () => {
            const grid = page.getWidget("datagrid1");
            const dropdown = grid.$$(".dropdown-container")[1];

            dropdown.click();

            const dropdownOption = page.getElement(".dropdown-list > li:nth-child(3) > div");

            expect(dropdownOption.getText()).toContain("No");

            dropdownOption.click();

            grid.waitUntil(
                () => {
                    return datagrid.getAllRows(page.getElements(".mx-name-datagrid1 .td")).length !== 12;
                },
                {
                    timeout: 3000,
                    timeoutMsg: "expected result to be different after 3s"
                }
            );
            const items = page.getElements(".td", grid);

            expect(datagrid.getAllRows(items)).toEqual([]);
        });
    });
});
