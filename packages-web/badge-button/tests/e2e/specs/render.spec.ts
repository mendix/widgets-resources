import homepage from "../pages/home.page";

describe("BadgeButton rendering", () => {
    beforeAll(() => {
        homepage.open();
    });

    it("should render ", () => {
        const badgeButton = homepage.badgeButton;
        badgeButton.waitForDisplayed();
        expect(badgeButton.isExisting()).toBe(true);
    });
});
