import HomePage from "./pages/home.page";
import GridPage from "./pages/grid.page";

describe("SignatureCanvas", () => {
    it("renders Canvas", () => {
        HomePage.open();
        HomePage.canvas.waitForExist();
        const isExisting = HomePage.canvas.isExisting();

        expect(isExisting).toBeTruthy();
    });

    it("renders signature grid", () => {
        GridPage.open();
        GridPage.signatureGrid.waitForVisible();

        expect(GridPage.signatureGrid.getHTML()).toContain("svg");
    });
});
