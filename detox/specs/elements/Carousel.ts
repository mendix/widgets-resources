import { by, element, waitFor } from "detox";

export function Carousel(testID: string) {
    return {
        getCarousel() {
            return element(by.id(testID));
        },
        async waitForSlideAndSwipe(carousel: any, itemIndex: number, direction: "left" | "right") {
            const firstItem = carousel.getSlideContent(itemIndex);
            await waitFor(firstItem)
                .toBeVisible()
                .withTimeout(5000);
            await firstItem.swipe(direction); // Swipe to second element because tests are that random
        },
        getSlideContent(slideIndex: number) {
            return element(by.id(`${testID}$content$${slideIndex}`));
        },
        getParticularElementInsideSlideContent(slideIndex: number, desiredElementId: string) {
            return element(by.id(desiredElementId).withAncestor(by.id(`${testID}$content$${slideIndex}`)));
        },
        getPaginationButton() {
            return element;
        }
    };
}
