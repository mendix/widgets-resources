import page from "../../../../../../configs/e2e/src/pages/page";
import Carousel from "../objects/carousel.widget";

describe("Carousel ", () => {
    const carousel = new Carousel("carousel2");

    it("should render when microflow is a datasource, bit there is No Context", () => {
        page.open("p/dataMicroflowNoContext");

        page.getWidget("label5").waitForDisplayed();
        expect(page.existing("carousel2")).toBeFalsy();
    });

    it("should show an error when microflow is a datasource, but No Microflow configured", () => {
        page.open("p/dataMicroflowNoMicroflow");

        Carousel.error.waitForDisplayed();
        expect(Carousel.error.getText()).toContain(
            "For data source option 'microflow', a data source microflow is required"
        );
        expect(page.existing("carousel2")).toBeFalsy();
    });

    it("should show an error when no XPath entry", () => {
        page.open("p/dataXPathNoEntry");

        Carousel.error.waitForDisplayed();
        expect(Carousel.error.getText()).toContain("For the data source 'XPath', the images entity is required");
        expect(page.existing("carousel2")).toBeFalsy();
    });

    it("should render when static no context", () => {
        page.open("p/staticNoContext");

        carousel.element.waitForDisplayed();
        expect(page.existing("carousel2")).toBeFalsy();
    });

    it("should not render when NoContext with Constraint to Current Object", () => {
        page.open("p/xpathNoContext");

        page.getWidget("label5").waitForDisplayed();
        expect(page.existing("carousel2")).toBeFalsy();
    });

    it("should render when static datasource", () => {
        page.open("p/staticNoImages");

        carousel.element.waitForDisplayed();
        expect(carousel.element.isExisting()).toBeTruthy();
    });
});
