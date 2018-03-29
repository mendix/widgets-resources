import HomePage from "./pages/home.page";
import configsPage from "./pages/validateConfigs";

const border = "1px solid rgb(0, 0, 0)";
const visible = "visible";
const hidden = "hidden";
const feedbackMessage = "The entity does not inherit from System Image";

describe("SignatureCanvas", () => {

    it("renders Canvas", () => {
        HomePage.open();
        HomePage.canvas.waitForVisible();

        const canvasBorder = HomePage.canvas.getCssProperty("border");
        expect(canvasBorder.value).toBe(border);
    });

    it("renders signature", () => {
        HomePage.open();
        HomePage.canvas.waitForVisible();
        HomePage.canvas.click();

        HomePage.renderSave.waitForVisible();
        const displayButton = HomePage.renderSave.getCssProperty("visibility");
        expect(displayButton.value).toBe(visible);
    });

    xit("clears canvas on reset", () => {
        HomePage.open();
        HomePage.canvas.waitForVisible();
        HomePage.canvas.click();

        HomePage.resetButton.waitForVisible();
        HomePage.resetButton.click();

        const displayButton = HomePage.renderSave.getCssProperty("visibility");
        expect(displayButton.value).toBe(hidden);
    });

    it("handles validations", () => {
        configsPage.open();
        configsPage.canvas.waitForVisible();
        configsPage.canvas.click();

        configsPage.renderSave.waitForVisible();
        configsPage.renderSave.click();

        configsPage.validationFeedback.waitForVisible();
        const feedback = configsPage.validationFeedback.getText();

        expect(feedback).toBe(feedbackMessage);
    });
});
