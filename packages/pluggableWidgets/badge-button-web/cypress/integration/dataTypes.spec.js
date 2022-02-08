import page from "../../../../../../configs/e2e/src/pages/page";
import badgeButtonWidget from "../objects/badgeButton.widget";

describe("BadgeButton different data types", () => {
    beforeAll(() => {
        page.open("p/dataTypes");
    });

    it("displays correctly string data", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonString");
        badgeButton.element.waitForDisplayed();

        expect(badgeButton.getText()).toEqual("Button");
        expect(badgeButton.getBadgeText()).toEqual("New");
    });

    it("displays correctly integer data", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonInteger");
        badgeButton.element.waitForDisplayed();

        expect(badgeButton.getText()).toEqual("Caption");
        expect(badgeButton.getBadgeText()).toEqual("10");
    });

    it("displays correctly long data", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonLong");
        badgeButton.element.waitForDisplayed();

        expect(badgeButton.getText()).toEqual("Caption");
        expect(badgeButton.getBadgeText()).toEqual("2,147,483,647");
    });

    it("displays correctly decimal data", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonDecimal");
        badgeButton.element.waitForDisplayed();

        expect(badgeButton.getText()).toEqual("Caption");
        expect(badgeButton.getBadgeText()).toEqual("2.5");
    });
});
