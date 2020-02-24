import page from "../../../../../configs/e2e/src/pages/page";
import ImageViewer from "../objects/imageViewer.widget";

const dynamicImage = "https://silkui.outsystems.com/IframePreview/img/IframePreview.landscape_3.png";
const dynamicImageNoUrl = '<img src="" style="width: 700px;">';

describe("Image viewer", () => {
    it("loads an image from a dynamic url", () => {
        page.open("p/dynamicUrl");

        const imageViewer = new ImageViewer("imageViewer1").element;
        imageViewer.waitForDisplayed();
        const content = imageViewer.getHTML();
        expect(content).toContain(dynamicImage);
    });

    it("loads no image when no image url is specified", () => {
        page.open("p/emptyUrl");

        const imageViewer = new ImageViewer("imageViewer1").hiddenElement;
        const content = imageViewer.getHTML();
        expect(content).toContain(dynamicImageNoUrl);
    });
});
