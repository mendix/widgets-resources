import page from "../../../../../../configs/e2e/src/pages/page";
import ImageViewer from "../objects/imageViewer.widget";
import * as html from "../objects/constants";

describe("Image viewer", () => {
    it("should trigger Microflow on click", () => {
        page.open("p/onClickMicroflow");

        const imageViewer = new ImageViewer("imageViewer1");
        imageViewer.element.waitForDisplayed();
        imageViewer.element.click();

        browser.pause(1000);

        page.modalDialog.waitForDisplayed();
        expect(page.modalDialog.getText()).toContain("You clicked this image");
    });

    it("should trigger Nanoflow on click", () => {
        page.open("p/onClickNanoflow");

        const imageViewer = new ImageViewer("imageViewer1");
        imageViewer.element.waitForDisplayed();
        imageViewer.element.click();

        browser.pause(1000);

        page.modalDialog.waitForDisplayed();
        expect(page.modalDialog.getText()).toContain(html.dynamicImage);
    });

    it("should Open a Page on click", () => {
        page.open("p/onClickShowPage");

        const imageViewer = new ImageViewer("imageViewer2");
        imageViewer.element.waitForDisplayed();
        imageViewer.element.click();

        browser.pause(1000);

        page.modalDialog.waitForDisplayed();
        expect(page.modalDialogHeader.getText()).toBe("GazaLand");
    });

    it("should show full screen on click", () => {
        page.open("p/onClickOpenFullScreen");

        const imageViewer = new ImageViewer("imageViewer1");
        imageViewer.element.waitForDisplayed();
        imageViewer.element.click();

        ImageViewer.lightbox.waitForDisplayed();
        expect(ImageViewer.lightbox.$("img").getProperty("src")).toContain(html.staticImage);
    });
});
