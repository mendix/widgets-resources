import { by, element } from "detox";

export function Carousel(testID: string) {
    return {
        getCarousel() {
            return element(by.id(testID));
        },
        getSlideContent(slideIndex: number) {
            return element(by.id(`${testID}$content$${slideIndex}`));
        },
        getElementInsideSlideContent(slideIndex: number, desiredElementId: string) {
            return element(by.id(desiredElementId).withAncestor(by.id(`${testID}$content$${slideIndex}`)));
        },
        getPaginationButton() {
            return element;
        }
    };
}
