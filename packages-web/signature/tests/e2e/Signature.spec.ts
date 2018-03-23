import HomePage from "./pages/home.page";

const border = "1px solid rgb(0, 0, 0)";
const visible = "visible";
const hidden = "hidden";

describe("SignatureCanvas", () => {

    it("renders Canvas", () => {
        HomePage.open();
        HomePage.canvas.waitForVisible();

        const canvasWidth = HomePage.canvas.getCssProperty("border");
        expect(canvasWidth.value).toBe(border);
    });

    it("renders signature", () => {
        HomePage.open();
        HomePage.canvas.waitForVisible();
        HomePage.canvas.click();

        HomePage.renderSave.waitForVisible();
        const displayButton = HomePage.renderSave.getCssProperty("visibility");
        expect(displayButton.value).toBe(visible);
    });

    it("renders save button", () => {
        HomePage.open();
        HomePage.canvas.waitForVisible();
        HomePage.canvas.click();

        HomePage.renderSave.waitForVisible();
        const displayButton = HomePage.renderSave.getCssProperty("visibility");
        expect(displayButton.value).toBe(visible);
    });

    xit("clears canvas on reset", () => {
        HomePage.resetButton.waitForVisible();
        HomePage.resetButton.click();

        const displayButton = HomePage.renderSave.getCssProperty("visibility");
        expect(displayButton.value).toBe(hidden);
    });
});
