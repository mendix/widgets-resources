import page from "../../../../../../configs/e2e/src/pages/page";
import Carousel from "../objects/carousel.widget";

describe("Carousel ", () => {
    const carousel = new Carousel("carousel2");

    it("should render when static datasource", () => {
        page.open("p/dataSourceStatic");

        carousel.element.waitForDisplayed();
        expect(carousel.leftArrow.isExisting()).toBeFalsy();
    });

    it("should render when datasource is XPATH", () => {
        page.open("p/dataSourceXpath");

        carousel.element.waitForDisplayed();
        expect(carousel.leftArrow.isExisting()).toBeFalsy();
    });

    it("should render when datasource is microflow", () => {
        page.open("p/dataSourceMf");

        carousel.element.waitForDisplayed();
        expect(carousel.leftArrow.isExisting()).toBeFalsy();
    });
});
