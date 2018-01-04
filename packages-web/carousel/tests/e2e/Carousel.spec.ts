import defaultPage from "./pages/default.page";

describe("Carousel", () => {

    beforeAll(() => {
        defaultPage.open();
    });

    it("should disable the left arrow when showing the first item", () => {
        defaultPage.carousel.waitForVisible();
        expect (defaultPage.leftArrowExist as boolean).toBe(false);
    });

    it("should enable the left arrow when it navigates from first item", () => {
        defaultPage.carousel.waitForVisible();
        defaultPage.carouselRightArrow.waitForVisible();
        defaultPage.carouselRightArrow.click();

        defaultPage.carouselLeftArrow.waitForVisible();
        expect (defaultPage.leftArrowExist as boolean).toBe(true);
    });

    describe("when on the last image item", () => {
        it("should disable the right arrow", () => {
            defaultPage.open();
            defaultPage.carousel.waitForVisible();
            defaultPage.carouselRightArrow.waitForVisible();
            defaultPage.carouselRightArrow.click();

            defaultPage.carouselRightArrow.waitForVisible();
            defaultPage.carouselRightArrow.click();

            defaultPage.carouselRightArrow.waitForVisible();
            defaultPage.carouselRightArrow.click();

            defaultPage.lastImage.waitForVisible(10000);
            expect(defaultPage.rightArrowExist as boolean).toBe(false);
        });
    });
});
