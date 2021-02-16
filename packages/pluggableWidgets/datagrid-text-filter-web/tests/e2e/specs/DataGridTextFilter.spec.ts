import page from "../../../../../../configs/e2e/src/pages/page";
import datagrid from "../objects/datagrid.widget";

describe("datagrid-text-filter-web", () => {
    beforeEach(() => {
        page.open(); // resets page
    });

    describe("text filtering", () => {
        it("shows correct result", () => {
            const grid = page.getWidget("datagrid1");
            const input = page.getElement(".filter-input", grid);
            input.setValue("test3");
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

        it("check the context", () => {
            const grid = page.getWidget("datagrid1");
            const row = page.getElement(".td", grid);
            const input = page.getElement(".filter-input", grid);

            input.setValue("test3");
            const context = row.getText();

            row.click();

            const popUpElement = page.getElement(".mx-name-AgeTextBox .form-control");
            const popUpContext = popUpElement.getValue();

            expect(context).toEqual(popUpContext);
        });
    });
});
