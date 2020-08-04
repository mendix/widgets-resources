import page from "../../../../../../configs/e2e/src/pages/page";
import badgeButtonWidget from "../objects/badgeButton.widget";

describe("BadgeButton wrong configs", () => {
    beforeAll(() => {
        page.open("p/noContext");
    });

    it("should display correctly if MF returns empty", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonCaseStudyWithMFAction");

        badgeButton.element.waitForDisplayed();
        expect(badgeButton.getText()).toEqual("");
        expect(badgeButton.getBadgeText()).toEqual("");
    });

    it("should display fallback values correctly", () => {
        const badgeButton = new badgeButtonWidget("badgeButtonFallback");

        badgeButton.element.waitForDisplayed();
        expect(badgeButton.getText()).toEqual("No Data Caption");
        expect(badgeButton.getBadgeText()).toEqual("No Data Badge");
    });
});
