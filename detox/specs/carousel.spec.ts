import { Alert, Carousel, Pages } from "./elements";
import { expect, element, by, device } from "detox";

describe("Carousel", () => {
    beforeAll(async () => {
        await Pages().openCarousel();
    });
    it("renders carousel", async () => {
        const carousel = Carousel("mycarousel");
        await expect(carousel.getCarousel()).toBeVisible();
    });
    it("renders pagination", async () => {
        await expect(element(by.type("RCTView").and(by.label("mycarousel$pagination")))).toBeVisible();
    });
    it("Combined with clickable container, it passes right context ", async () => {
        const carousel = Carousel("mycarousel");
        await carousel.getElementInsideSlideContent(0, "carouselImage").tap(); // Tap the clickable container around carousel item
        await expect(Alert().getMessage("You passed image1"));
        await Alert().confirm();
    });
    it("Combined with clickable image, it passes right context ", async () => {
        const carousel = Carousel("mycarousel");
        await carousel.getElementInsideSlideContent(0, "staticImage").tap(); // Tap the static clickable image on carousel item
        await expect(Alert().getMessage("You passed image1"));
        await Alert().confirm();
    });
    afterAll(async () => {
        await device.reloadReactNative();
    });
});

describe("Carousel swipes", () => {
    beforeEach(async () => {
        await Pages().openCarousel();
    });
    it("right ", async () => {
        const carousel = Carousel("mycarousel");
        await carousel.getSlideContent(0).swipe("left");
        await expect(element(by.text("image2"))).toBeVisible(); // Read the textbox connected to the item
    });

    it("left ", async () => {
        const carousel = Carousel("mycarousel");
        await carousel.getSlideContent(1).swipe("right");
        await expect(element(by.text("image1"))).toBeVisible(); // Read the textbox connected to the item
    });
    it("and combined with clickable container, it passes right context ", async () => {
        const carousel = Carousel("mycarousel");
        await carousel.getSlideContent(0).swipe("left"); // Swipe to second element because tests are that random
        await carousel.getElementInsideSlideContent(1, "carouselImage").tap(); // Tap the clickable container around carousel item
        await expect(Alert().getMessage("You passed image2"));
        await Alert().confirm();
    });
    it("and combined with clickable image, it passes right context ", async () => {
        const carousel = Carousel("mycarousel");
        await carousel.getSlideContent(0).swipe("left");
        await carousel.getSlideContent(1).swipe("left"); // Swipe to third element because tests are that random
        await carousel.getElementInsideSlideContent(2, "staticImage").tap(); // Tap the static clickable image on carousel item
        await expect(Alert().getMessage("You passed image3"));
        await Alert().confirm();
    });
    afterEach(async () => {
        await device.reloadReactNative();
    });
});
