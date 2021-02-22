import page from "../../../../../../configs/e2e/src/pages/page";
import datagrid from "../objects/datagrid.widget";

describe("datagrid-number-filter-web", () => {
    beforeEach(() => {
        page.open(); // resets page
    });

    describe("number filtering", () => {
        it("shows correct result", () => {
            const grid = page.getWidget("datagrid1");
            const input = page.getElement(".filter-input", grid);
            input.setValue("12");
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
            expect(datagrid.getAllRows(items)).toEqual(["12", "test3", "test3", ""]);
        });
    });
});
