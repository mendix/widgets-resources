import HomePage from "./pages/home.page";

const visible = "visible";

describe("SignatureCanvas", () => {
    beforeAll(() => {
        HomePage.open();
    });

    it("renders Canvas", () => {
        HomePage.canvases.waitForVisible();

        expect(HomePage.canvases.value.length).toBeGreaterThan(0);
    });

    it("should save signature after signing", () => {
        HomePage.canvas.waitForVisible();
        HomePage.canvas.click();
        HomePage.saveButton.click();
        HomePage.dialogBox.waitForExist();

        expect(HomePage.dialogBox.getText()).toContain("Image has been saved");
    });

    xit("clears canvas on reset", () => {
        browser.refresh();
        HomePage.canvas.waitForVisible();
        HomePage.canvas.click();
        HomePage.saveButton.waitForVisible();

        expect(HomePage.saveButton.getCssProperty("visibility").value).toBe(visible);

        HomePage.resetCheckbox.click();

        // const signedCanvas = HomePage.canvas.get;

        // expect(HomePage.saveButton.getCssProperty("visibility").value).toBe("hidden");
    });
});
