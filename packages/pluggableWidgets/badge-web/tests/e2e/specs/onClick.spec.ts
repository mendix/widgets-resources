import page from "../../../../../../configs/e2e/src/pages/page";
import badgeWidget from "../Objects/badge.widget";

describe("badge-web", () => {
    beforeEach(() => {
        page.open("p/callNanoflow"); // resets page
    });

    xit("should call nanoflow on click badge", () => {
        const badge = new badgeWidget("badgeCallNanoflow");
        badge.element.waitForDisplayed({ timeout: 3000 });
        badge.element.click();

        const dialog = page.waitForElement(".modal-body");
        dialog.waitForDisplayed();

        expect(dialog.isDisplayed()).toBeTruthy();

        // Verify it passes a parameter
        const data = page.waitForElement(".form-control-static").getText();
        expect(data).toBe("NewSuccess");
    });

    it("should call nanoflow on click label", () => {
        const badge = new badgeWidget("labelCallNanoflow");
        badge.element.waitForDisplayed();
        badge.element.click();

        const dialog = page.waitForElement(".modal-body");

        expect(dialog.isDisplayed()).toBeTruthy();

        // Verify it passes a parameter
        const data = page.waitForElement(".form-control-static").getText();
        expect(data).toBe("NewSuccess");
    });
});
