import page from "../../../../../configs/e2e/src/pages/page";
import Carousel from "../objects/carousel.widget";

describe("Carousel", () => {
    const carousel = new Carousel("carousel2");

    it("should trigger on click static microflow", () => {
        page.open("p/staticOnClickMf");

        carousel.element.waitForDisplayed();
        carousel.element.click();
        page.modalDialog.waitForDisplayed();
        expect(page.modalDialog.getText()).toContain("Clicked Image 1!");
    });

    it("should trigger on click static nanoflow triggered", () => {
        page.open("p/staticOnClickNf");

        carousel.element.waitForDisplayed();
        carousel.element.click();
        page.modalDialog.waitForDisplayed();
        expect(page.modalDialog.getText()).toContain("Nanoflow executed successfully !!!");
    });

    describe("should trigger on click static show page", () => {
        beforeEach(() => {
            page.open("p/staticOnClickOpenPage");
        });
        it("open full page", () => {
            const carousel = new Carousel("carouselFullPage");

            carousel.element.waitForDisplayed();
            carousel.element.click();
            page.getWidget("label5").waitForDisplayed();
            expect(page.getWidget("label5").getText()).toContain("Page 1 Opened");
        });

        it("open popup page", () => {
            const carousel = new Carousel("carouselPopUp");

            carousel.element.waitForDisplayed();
            carousel.element.click();
            page.modalDialog.waitForDisplayed();
            expect(page.modalDialogHeader.getText()).toContain("Popup opened");
        });

        it("open blocking popup page", () => {
            const carousel = new Carousel("carouselBlockingPopUp");

            carousel.element.waitForDisplayed();
            carousel.element.click();
            page.modalDialog.waitForDisplayed();
            expect(page.modalDialogHeader.getText()).toContain("Blocking popup opened");
        });
    });

    it("should trigger microflow on click MF datasource carousel", () => {
        page.open("p/dsMfOnClickMf");

        carousel.element.waitForDisplayed();
        carousel.element.click();
        page.modalDialog.waitForDisplayed();
        expect(page.modalDialog.getText()).toContain("Clicked Action Image");
    });

    it("should trigger nanoflow on click MF datasource carousel", () => {
        page.open("p/dsMfOnClickNf");

        carousel.element.waitForDisplayed();
        carousel.element.click();
        page.modalDialog.waitForDisplayed();
        expect(page.modalDialog.getText()).toContain("Nanoflow executed successfully !!!");
    });

    it("should show page on click MF datasource carousel", () => {
        page.open("p/dsMfOnClickOpenPage");

        carousel.element.waitForDisplayed();
        carousel.element.click();
        page.getWidget("label5").waitForDisplayed();
        expect(page.getWidget("label5").getText()).toContain("Page 2 Opened");
        expect(
            page
                .getWidget("textBox2")
                .$(".form-control")
                .getValue()
        ).toContain("..\\..\\..\\resources\\images\\its_beautiful.jpg");
    });

    it("should trigger microflow on click XPath datasource carousel", () => {
        page.open("p/dsXPathOnClickMf");

        carousel.element.waitForDisplayed();
        carousel.element.click();
        page.modalDialog.waitForDisplayed();
        expect(page.modalDialog.getText()).toContain("Clicked Action Image");
    });

    it("should trigger nanoflow on click XPath datasource carousel", () => {
        page.open("p/dsMfOnClickNf");

        carousel.element.waitForDisplayed();
        carousel.element.click();
        page.modalDialog.waitForDisplayed();
        expect(page.modalDialog.getText()).toContain("Nanoflow executed successfully !!!");
    });

    it("should show page on click XPath datasource carousel", () => {
        page.open("p/dsXPathOnClickOpenPage");

        const carousel = new Carousel("carousel4");
        carousel.element.waitForDisplayed();
        carousel.element.click();
        page.modalDialog.waitForDisplayed();
        page.getWidget("label5").waitForDisplayed();
        expect(page.getWidget("label5").getText()).toContain("DS XPath: show page on click");
    });

    it("should trigger microflow with error on click XPath datasource carousel", () => {
        page.open("p/dsXPathOnClickMfWithError");

        carousel.element.waitForDisplayed();
        carousel.element.click();
        page.modalDialog.waitForDisplayed();
        expect(page.modalDialog.getText()).toContain(
            "An error occurred while executing action TestSuite.OnClickWithError"
        );
    });
});
