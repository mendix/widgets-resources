import HomePage from "./pages/home.page";

const border = "1px solid rgb(0, 0, 0)";

describe("SignatureCanvas", () => {

    it("renders Canvas", () => {
        HomePage.open();
        HomePage.canvas.waitForVisible();

        const canvasWidth = HomePage.canvas.getCssProperty("border");
        expect(canvasWidth.value).toBe(border);
    });
});
