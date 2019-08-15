import homePage from "./pages/home.page";
import playgroundPage from "./pages/playground.page";

describe("ProgressCircle", () => {
    it("renders with a value", () => {
        homePage.open();
        homePage.progressText.waitForDisplayed();

        expect(homePage.progressText.getText()).toBe("-60%");
    });

    it("updates the progress percentage when the value is changed", () => {
        playgroundPage.open();
        playgroundPage.progressTextBox.waitForDisplayed();
        playgroundPage.progressTextBox.setValue(67);
        playgroundPage.maximumValueTextBox.waitForDisplayed();
        playgroundPage.maximumValueTextBox.click();

        expect(homePage.progressText.getText()).toBe("67%");
    });
});
