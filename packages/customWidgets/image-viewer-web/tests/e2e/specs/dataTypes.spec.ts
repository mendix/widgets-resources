import page from "../../../../../../configs/e2e/src/pages/page";
import ImageViewer from "../objects/imageViewer.widget";
import * as html from "../objects/constants";

describe("Image viewer", () => {
    it("loads an image from a dynamic url", () => {
        page.open("p/dynamicUrl");

        const imageViewer = new ImageViewer("imageViewer1");
        imageViewer.element.waitForDisplayed();
        const content = imageViewer.imageSrc;
        expect(content).toBe(html.dynamicImage);
    });

    it("loads an image from a dynamic url association", () => {
        page.open("p/dynamicUrlAssociation");

        const imageViewer = new ImageViewer("imageViewer1");
        imageViewer.element.waitForDisplayed();
        const content = imageViewer.imageSrc;
        expect(content).toBe(html.dynamicImage);
    });

    // todo: unskip once we figure out why this spec is failing.
    xit("loads no image when no image url is specified", () => {
        page.open("p/emptyUrl");

        const imageViewer = new ImageViewer("imageViewer1");
        const content = imageViewer.imageSrcHidden;
        expect(content).toContain(page.url);
    });

    it("loads an image from a static image", () => {
        page.open("p/staticImage");

        const imageViewer = new ImageViewer("imageViewer1");
        imageViewer.element.waitForDisplayed();
        const content = imageViewer.imageSrc;
        expect(content).toContain(html.staticImage);
    });

    it("loads an image from a static URL", () => {
        page.open("p/staticUrl");

        const imageViewer = new ImageViewer("imageViewer1");
        imageViewer.element.waitForDisplayed();
        const content = imageViewer.imageSrc;
        expect(content).toBe(html.staticUrl);
    });
});
