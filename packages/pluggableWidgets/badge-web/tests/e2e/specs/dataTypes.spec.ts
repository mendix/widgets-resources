import page from "../../../../../../configs/e2e/src/pages/page";
import badge from "../Objects/badge.widget";

describe("BadgeButton different data types", () => {
    beforeAll(() => {
        page.open("p/dataTypes");
    });
    describe("type: badge", () => {
        it("displays correctly string data", () => {
            const badgeButton = new badge("badgeString");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("string type");
        });

        it("displays correctly integer data", () => {
            const badgeButton = new badge("badgeInteger");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("987");
        });

        it("displays correctly long data", () => {
            const badgeButton = new badge("badgeLong");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("123456789012345678");
        });

        it("displays correctly decimal data", () => {
            const badgeButton = new badge("badgeDecimal");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("0.56");
        });

        it("displays correctly enum data", () => {
            const badgeButton = new badge("badgeEnum");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("C Success");
        });
    });

    describe("type: label", () => {
        it("displays correctly string data", () => {
            const badgeButton = new badge("labelString");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("string type");
        });

        it("displays correctly integer data", () => {
            const badgeButton = new badge("labelInteger");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("987");
        });

        it("displays correctly long data", () => {
            const badgeButton = new badge("labelLong");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("123456789012345678");
        });

        it("displays correctly decimal data", () => {
            const badgeButton = new badge("labelDecimal");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("0.56");
        });

        it("displays correctly enum data", () => {
            const badgeButton = new badge("labelEnum");
            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getBadgeText()).toEqual("C Success");
        });
    });
});
