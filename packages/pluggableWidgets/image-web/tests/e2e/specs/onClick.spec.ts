import page from "../../../../../../configs/e2e/src/pages/page";
import Image from "../objects/imageRender.widget";
import * as html from "../objects/constants";

describe("Image viewer", () => {
    it("triggers a Microflow on click", () => {
        page.open("p/onClickMicroflow");

        const imageRender = new Image("image1");
        imageRender.element.waitForDisplayed();
        imageRender.element.click();
        page.modalDialog.waitForDisplayed();

        expect(page.modalDialog.getText()).toContain("You clicked this image");
    });

    it("triggers a Nanoflow on click", () => {
        page.open("p/onClickNanoflow");

        const imageRender = new Image("image1");
        imageRender.element.waitForDisplayed();
        imageRender.element.click();
        page.modalDialog.waitForDisplayed();

        expect(page.modalDialog.getText()).toContain(html.dynamicImage);
    });

    it("opens a Page on click", () => {
        page.open("p/onClickShowPage");

        const imageRender = new Image("image1");
        imageRender.element.waitForDisplayed();
        imageRender.element.click();
        page.modalDialog.waitForDisplayed();

        expect(page.modalDialogHeader.getText()).toBe("GazaLand");
    });

    it("shows full screen image on click", () => {
        page.open("p/onClickOpenFullScreen");

        const imageRender = new Image("imageRender1");
        imageRender.element.waitForDisplayed();
        imageRender.element.click();
        Image.lightbox.waitForDisplayed();

        expect(Image.lightbox.$("img").getProperty("src")).toContain(html.staticImage);
    });
});
