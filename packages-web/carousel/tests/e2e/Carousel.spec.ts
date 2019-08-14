import defaultPage from "./pages/default.page";

describe("Carousel", () => {
    beforeAll(() => {
        defaultPage.open();
    });

    it("should disable the left arrow when showing the first item", () => {
        defaultPage.carousel.waitForDisplayed();
        expect(defaultPage.leftArrowExist as boolean).toBe(false);
    });

    it("should enable the left arrow when it navigates from first item", () => {
        defaultPage.carousel.waitForDisplayed();
        defaultPage.carouselRightArrow.waitForDisplayed();
        defaultPage.carouselRightArrow.click();

        defaultPage.carouselLeftArrow.waitForDisplayed();
        expect(defaultPage.leftArrowExist as boolean).toBe(true);
    });

    describe("when on the last image item", () => {
        it("should disable the right arrow", () => {
            defaultPage.open();
            defaultPage.carousel.waitForDisplayed();
            defaultPage.carouselRightArrow.waitForDisplayed();
            defaultPage.carouselRightArrow.click();

            defaultPage.carouselRightArrow.waitForDisplayed();
            defaultPage.carouselRightArrow.click();

            defaultPage.carouselRightArrow.waitForDisplayed();
            defaultPage.carouselRightArrow.click();

            defaultPage.lastImage.waitForDisplayed(10000);
            expect(defaultPage.rightArrowExist as boolean).toBe(false);
        });
    });
});
