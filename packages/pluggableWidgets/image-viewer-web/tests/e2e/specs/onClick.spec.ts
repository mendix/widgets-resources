import page from "../../../../../../configs/e2e/src/pages/page";
import ImageViewer from "../objects/imageViewer.widget";
import * as html from "../objects/constants";

describe("Image viewer", () => {
    it("triggers a Microflow on click", () => {
        page.open("p/onClickMicroflow");

        const imageViewer = new ImageViewer("imageViewer1");
        imageViewer.element.waitForDisplayed();
        imageViewer.element.click();
        page.modalDialog.waitForDisplayed();

        expect(page.modalDialog.getText()).toContain("You clicked this image");
    });

    it("triggers a Nanoflow on click", () => {
        page.open("p/onClickNanoflow");

        const imageViewer = new ImageViewer("imageViewer1");
        imageViewer.element.waitForDisplayed();
        imageViewer.element.click();
        page.modalDialog.waitForDisplayed();

        expect(page.modalDialog.getText()).toContain(html.dynamicImage);
    });

    it("opens a Page on click", () => {
        page.open("p/onClickShowPage");

        const imageViewer = new ImageViewer("imageViewer1");
        imageViewer.element.waitForDisplayed();
        imageViewer.element.click();
        page.modalDialog.waitForDisplayed();

        expect(page.modalDialogHeader.getText()).toBe("GazaLand");
    });

    it("shows full screen image on click", () => {
        page.open("p/onClickOpenFullScreen");

        const imageViewer = new ImageViewer("imageViewer1");
        imageViewer.element.waitForDisplayed();
        imageViewer.element.click();
        ImageViewer.lightbox.waitForDisplayed();

        expect(ImageViewer.lightbox.$("img").getProperty("src")).toContain(html.staticImage);
    });
});
