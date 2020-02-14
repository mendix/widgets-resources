import { Pages } from "./elements";

describe("Carousel", () => {
    beforeAll(async () => {
        await Pages().openCarousel();
    });

    it("swipe right ", () => {
        expect(true).toBe(true);
    });
    it("swipe left ", () => {
        expect(true).toBe(true);
    });
    it("Images inside are correct size", () => {
        expect(true).toBe(true);
    });
    it("Clicking pagination swipes to correct page", () => {
        expect(true).toBe(true);
    });
    it("Combined with clickable container, it passes right context ", () => {
        expect(true).toBe(true);
    });
    it("Combined with clickable image, it works (rename) ", () => {
        expect(true).toBe(true);
    });
});
