import HomePage from "./pages/home.page";

const border = "1px solid rgb(0, 0, 0)";
const display = "block";

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

        HomePage.Signature.waitForVisible();
        const displayButton = HomePage.Signature.getCssProperty("display");
        expect(displayButton.value).toBe(display);
    });

    it("renders reset button", () => {
        HomePage.open();
        HomePage.canvas.waitForVisible();
        HomePage.canvas.click();

        HomePage.Signature.waitForVisible();
        const displayButton = HomePage.button.getCssProperty("display");
        expect(displayButton.value).toBe(display);
    });

    it("clears canvas on reset", () => {
        HomePage.open();
        HomePage.canvas.waitForVisible();
        HomePage.canvas.click();

        HomePage.button.waitForVisible();
        HomePage.button.click();
        const displayButton = HomePage.canvas.getCssProperty("display");
        expect(displayButton.value).toBe(display);
    });
});
