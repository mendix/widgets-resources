import page from "../../../../../../configs/e2e/src/pages/page";
import badgeButtonWidget from "../objects/badgeButton.widget";

describe("BadgeButton different data types", () => {
    beforeAll(() => {
        page.open("p/dataTypes");
    });

    it("should display correctly string data", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonString");
        badgeButton.element.waitForDisplayed();

        expect(badgeButton.getText()).toEqual("Button");
        expect(badgeButton.getBadgeText()).toEqual("New");
    });

    it("should display correctly integer data", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonInteger");
        badgeButton.element.waitForDisplayed();

        expect(badgeButton.getText()).toEqual("Caption");
        expect(badgeButton.getBadgeText()).toEqual("10");
    });

    it("should display correctly long data", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonLong");
        badgeButton.element.waitForDisplayed();

        expect(badgeButton.getText()).toEqual("Caption");
        expect(badgeButton.getBadgeText()).toEqual("2,147,483,647");
    });

    it("should display correctly decimal data", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonDecimal");
        badgeButton.element.waitForDisplayed();

        expect(badgeButton.getText()).toEqual("Caption");
        expect(badgeButton.getBadgeText()).toEqual("2.5");
    });
});
