import page from "../pages/home.page";

describe("Star rating", () => {
    beforeAll(() => {
        page.open();
    });

    // Note: cssProperty %age comparisons are not possible eg: width = 100% is always converted to pixels.
    // since emptyStar is always maxWidth, so fullStar when rated will always have equal width with emptyStar.
    it("should rate on a given star position: 4", () => {
        page.rateMeButton.waitForDisplayed();
        page.rateMeButton.click();
        page.rateMePage.waitForDisplayed();
        page.rateOnPosition(4).waitForDisplayed();
        page.rateOnPosition(4).click();

        const ratedFullStar = page.fullStarOnPosition(4);
        const ratedEmptyStar = page.emptyStarOnPosition(4);
        expect(ratedFullStar.getCSSProperty("width").value).toEqual(ratedEmptyStar.getCSSProperty("width").value);
        // Previous fullstar on position 3, should also be fully render over emptyStar
        expect(page.fullStarOnPosition(3).getCSSProperty("width").value).toEqual(
            ratedEmptyStar.getCSSProperty("width").value
        );
        // Next fullStar on position 5, should not be visible hence width 0px
        expect(page.fullStarOnPosition(5).getCSSProperty("width").value).toEqual("0px");
    });
});
