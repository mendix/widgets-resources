import page from "../../../../../../configs/e2e/src/pages/page";

describe("datagrid-web", () => {
    beforeAll(() => {
        page.open(); // resets page
    });

    describe("capabilities: sorting", () => {
        it("changes order of data to ASC when clicking sort option", () => {
            const datagrid = page.getWidget("datagrid1");
            const column = page.getElement(".column-header*=First Name", datagrid);
            const icon = page.getElement("svg", column);
            const item = page.getElement(".td", datagrid);

            expect(icon.getAttribute("data-icon")).toContain("arrows-alt-v");

            expect(item.getText()).toContain("10");

            column.click();

            expect(icon.getAttribute("data-icon")).toContain("long-arrow-alt-up");

            expect(item.getText()).toContain("10");
        });

        it("changes order of data to DESC when clicking sort option", () => {
            const datagrid = page.getWidget("datagrid1");
            const column = page.getElement(".column-header*=First Name", datagrid);
            const icon = page.getElement("svg", column);
            const item = page.getElement(".td:nth-child(6)", datagrid);

            expect(item.getText()).toContain("test");

            column.click();

            expect(icon.getAttribute("data-icon")).toContain("long-arrow-alt-down");

            expect(item.getText()).toContain("test3");
        });
    });

    describe("capabilities: resizing", () => {
        it("changes the size of the column", () => {
            const datagrid = page.getWidget("datagrid1");
            const column = page.getElement(".th*=Age", datagrid);
            const resizer = page.getElement(".column-resizer", column);
            const initialSize = Math.round(column.getSize("width"));
            resizer.dragAndDrop({ x: 30, y: 0 });
            const finalSize = Math.round(column.getSize("width"));

            expect(finalSize).toBe(initialSize + 30);
        });
    });

    describe("capabilities: hiding", () => {
        it("hides a selected column", () => {
            const datagrid = page.getWidget("datagrid1");
            const column = page.getElement(".column-header*=Age", datagrid);
            expect(column.isDisplayed()).toBeTruthy();
            const columnSelector = page.getElement(".column-selector-button", datagrid);
            columnSelector.click();
            const columnItem = page.getElement(".column-selectors>li>label", datagrid);
            columnItem.click();

            expect(column.isDisplayed()).toBeFalsy();
        });
    });
});
