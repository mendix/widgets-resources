import { Alert, Carousel, Pages } from "./elements";
import { expect, element, by, device, waitFor } from "detox";

describe("Carousel", () => {
    beforeAll(async () => {
        await Pages().openCarousel();
    });

    it("should render carousel", async () => {
        const carousel = Carousel("mycarousel");
        waitFor(carousel.getCarousel())
            .toBeVisible()
            .withTimeout(2000);
        await expect(carousel.getCarousel()).toBeVisible();
    });

    it("should render pagination", async () => {
        await expect(element(by.type("RCTView").and(by.label("mycarousel$pagination")))).toBeVisible();
    });

    it("should pass right context when combined with clickable container", async () => {
        const carousel = Carousel("mycarousel");
        await carousel.getParticularElementInsideSlideContent(0, "carouselImage").tap(); // Tap the clickable container around carousel item
        await expect(Alert().getMessage("You passed image1"));
        await Alert().confirm();
    });

    it("should pass right context when combined with clickable image", async () => {
        const carousel = Carousel("mycarousel");
        await carousel.getParticularElementInsideSlideContent(0, "staticImage").tap(); // Tap the static clickable image on carousel item
        await expect(Alert().getMessage("You passed image1"));
        await Alert().confirm();
    });

    it("shouldn't render if there is no items", async () => {
        const carousel = Carousel("emptycarousel");
        expect(carousel.getCarousel()).toBeNotVisible();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});

describe("Carousel swipes", () => {
    beforeEach(async () => {
        await Pages().openCarousel();
    });

    it("left and right", async () => {
        const carousel = Carousel("mycarousel");

        const firstItem = carousel.getSlideContent(0);
        await waitFor(firstItem)
            .toBeVisible()
            .withTimeout(1000);
        await firstItem.swipe("left");
        await expect(element(by.text("image2"))).toBeVisible(); // Read the textbox connected to the second item

        const secondItem = carousel.getSlideContent(1);
        await secondItem.swipe("right");
        await expect(element(by.text("image1"))).toBeVisible(); // Read the textbox connected to the first item
    });

    it("and combined with clickable container, it passes right context", async () => {
        const carousel = Carousel("mycarousel");
        const firstItem = carousel.getSlideContent(0);
        await waitFor(firstItem)
            .toBeVisible()
            .withTimeout(1000);
        await firstItem.swipe("left"); // Swipe to second element because tests are that random
        await carousel.getParticularElementInsideSlideContent(1, "carouselImage").tap(); // Tap the clickable container around carousel item

        await expect(Alert().getMessage("You passed image2"));
        await Alert().confirm();
    });

    it("and combined with clickable image, it passes right context", async () => {
        const carousel = Carousel("mycarousel");
        const firstItem = carousel.getSlideContent(0);
        await waitFor(firstItem)
            .toBeVisible()
            .withTimeout(1000);
        await firstItem.swipe("left");
        await carousel.getSlideContent(1).swipe("left"); // Swipe to third element because tests are that random
        await carousel.getParticularElementInsideSlideContent(2, "staticImage").tap(); // Tap the static clickable image on carousel item

        await expect(Alert().getMessage("You passed image3"));
        await Alert().confirm();
        await expect(element(by.text("image3"))).toBeVisible(); // Read the textbox connected to the first second
    });

    afterEach(async () => {
        await device.reloadReactNative();
    });
});
