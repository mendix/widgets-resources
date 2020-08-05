import page from "../../../../../../configs/e2e/src/pages/page";
import Carousel from "../objects/carousel.widget";

describe("Carousel ", () => {
    const carousel = new Carousel("carousel2");

    beforeAll(() => {
        page.open();
    });

    it("should disable the left arrow when showing the first item", () => {
        carousel.element.waitForDisplayed();
        expect(carousel.leftArrow.isExisting()).toBeFalsy();
    });

    it("should enable the left arrow when it navigates from first item", () => {
        carousel.rightArrow.waitForDisplayed();
        carousel.rightArrow.click();

        carousel.leftArrow.waitForDisplayed();
        expect(carousel.leftArrow.isExisting()).toBeTruthy();
    });

    it("should disable the right arrow when on the last image item", () => {
        page.open();
        carousel.element.waitForDisplayed();
        carousel.rightArrow.waitForDisplayed();
        carousel.rightArrow.click();

        carousel.rightArrow.waitForDisplayed();
        carousel.rightArrow.click();

        carousel.rightArrow.waitForDisplayed();
        carousel.rightArrow.click();

        expect(carousel.rightArrow.isExisting()).toBeFalsy();
    });
});
