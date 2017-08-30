import page from "./pages/home.page";
import { Element } from "webdriverio";

describe("Star rating", () => {
    beforeAll(() => {
        page.open();
        page.usernameInput.waitForVisible();
        page.usernameInput.setValue("x");
        page.passwordInput.waitForVisible();
        page.passwordInput.setValue("1");
        page.loginButton.waitForVisible();
        page.loginButton.click();
    });

    // Note: cssProperty %age comparisons are not possible eg: width = 100% is always converted to pixels.
    // since emptyStar is always maxWidth, so fullStar when rated will always have equal width with emptyStar.
    it("should rate on a given star position: 4", () => {
        page.rateMeButton.waitForVisible();
        page.rateMeButton.click();
        page.rateMePage.waitForVisible();
        page.rateOnPosition(4).waitForVisible();
        page.rateOnPosition(4).click();

        const ratedFullStar = page.fullStarOnPosition(4);
        const ratedEmptyStar = page.emptyStarOnPosition(4);
        expect(ratedFullStar.getCssProperty("width").value).toEqual(ratedEmptyStar.getCssProperty("width").value);
        // Previous fullstar on position 3, should also be fully render over emptyStar
        expect(page.fullStarOnPosition(3).getCssProperty("width").value)
            .toEqual(ratedEmptyStar.getCssProperty("width").value);
        // Next fullStar on position 5, should not be visible hence width 0px
        expect(page.fullStarOnPosition(5).getCssProperty("width").value).toEqual("0px");
    });

});
