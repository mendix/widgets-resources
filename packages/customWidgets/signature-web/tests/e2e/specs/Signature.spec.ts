import page from "../../../../../../configs/e2e/src/pages/page";
import Signature from "../objects/signature.widget";

describe("SignatureCanvas", () => {
    it("renders Canvas", () => {
        page.open();
        const canvas = new Signature("canvas");
        canvas.element.waitForDisplayed();

        expect(canvas.element.isExisting()).toBeTruthy();
    });

    it("renders signature grid", () => {
        page.open("p/GridSize");

        const grid = new Signature("grid");
        grid.element.waitForDisplayed();

        expect(grid.element.getHTML()).toContain("svg");
    });
});
