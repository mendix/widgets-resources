import page from "../pages/page";
import badge from "../Objects/badge.widget";

describe("BadgeButton different data types", () => {
    beforeAll(() => {
        page.open("p/dataTypes");
    });
    describe("type: badge", () => {
        it("should display correctly string data", () => {
            const badgeButton = new badge("badgeString");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("string type");
        });

        it("should display correctly integer data", () => {
            const badgeButton = new badge("badgeInteger");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("987");
        });

        it("should display correctly long data", () => {
            const badgeButton = new badge("badgeLong");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("123456789012345678");
        });

        it("should display correctly decimal data", () => {
            const badgeButton = new badge("badgeDecimal");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("0.56");
        });
    });

    describe("type: label", () => {
        it("should display correctly string data", () => {
            const badgeButton = new badge("labelString");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("string type");
        });

        it("should display correctly integer data", () => {
            const badgeButton = new badge("labelInteger");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("987");
        });

        it("should display correctly long data", () => {
            const badgeButton = new badge("labelLong");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("123456789012345678");
        });

        it("should display correctly decimal data", () => {
            const badgeButton = new badge("labelDecimal");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("0.56");
        });
    });
});
