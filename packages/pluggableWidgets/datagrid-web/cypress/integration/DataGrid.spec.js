import page from "../../../../../../configs/e2e/src/pages/page";
import datagrid from "../objects/datagrid.widget";

describe("datagrid-web", () => {
    beforeEach(() => {
        page.open(); // resets page
    });

    describe("capabilities: sorting", () => {
        it("applies the default sort order from the data source option", () => {
            const grid = page.getWidget("datagrid1");
            const column = page.waitForElement(".column-header*=First Name", grid);
            const icon = page.waitForElement("svg", column);
            const items = page.waitForElements(".td", grid);

            expect(icon.getAttribute("data-icon")).toContain("arrows-alt-v");

            expect(datagrid.getAllRows(items)).toEqual([
                "12",
                "test3",
                "test3",
                "",
                "11",
                "test2",
                "test2",
                "",
                "10",
                "test",
                "test",
                ""
            ]);
        });

        it("changes order of data to ASC when clicking sort option", () => {
            const grid = page.getWidget("datagrid1");
            const column = page.waitForElement(".column-header*=First Name", grid);
            const icon = page.waitForElement("svg", column);

            expect(icon.getAttribute("data-icon")).toContain("arrows-alt-v");

            column.click();

            expect(icon.getAttribute("data-icon")).toContain("long-arrow-alt-up");

            const items = page.waitForElements(".td", grid);

            expect(datagrid.getAllRows(items)).toEqual([
                "10",
                "test",
                "test",
                "",
                "11",
                "test2",
                "test2",
                "",
                "12",
                "test3",
                "test3",
                ""
            ]);
        });

        it("changes order of data to DESC when clicking sort option", () => {
            const grid = page.getWidget("datagrid1");
            const column = page.getElement(".column-header*=First Name", grid);
            const icon = page.getElement("svg", column);
            column.click();
            column.click();

            expect(icon.getAttribute("data-icon")).toContain("long-arrow-alt-down");

            const items = page.getElements(".td", grid);

            expect(datagrid.getAllRows(items)).toEqual([
                "12",
                "test3",
                "test3",
                "",
                "11",
                "test2",
                "test2",
                "",
                "10",
                "test",
                "test",
                ""
            ]);
        });
    });

    describe("capabilities: resizing", () => {
        it("changes the size of the column", () => {
            const grid = page.getWidget("datagrid1");
            const column = page.getElement(".th*=Age", grid);
            const resizer = page.getElement(".column-resizer", column);
            const initialSize = Math.round(column.getSize("width"));
            resizer.dragAndDrop({ x: 30, y: 0 });
            const finalSize = Math.round(column.getSize("width"));

            expect(finalSize).toBe(initialSize + 30);
        });
    });

    describe("capabilities: hiding", () => {
        it("hides a selected column", () => {
            const grid = page.getWidget("datagrid1");
            const column = page.getElement(".column-header*=Age", grid);

            expect(column.isDisplayed()).toBeTruthy();

            const columnSelector = page.getElement(".column-selector-button", grid);
            columnSelector.click();
            const columnItem = page.getElement(".column-selectors>li");
            columnItem.click();

            expect(column.isDisplayed()).toBeFalsy();
        });
    });

    describe("capabilities: onClick action", () => {
        it("check the context", () => {
            const grid = page.getWidget("datagrid1");
            const row = page.getElement(".td", grid);
            const context = row.getText();

            row.click();

            const popUpElement = page.getElement(".mx-name-AgeTextBox .form-control");
            const popUpContext = popUpElement.getValue();

            expect(context).toEqual(popUpContext);
        });
    });
});
