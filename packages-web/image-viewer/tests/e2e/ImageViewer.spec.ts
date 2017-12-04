import defaultPage from "./pages/default.page";

const dynamicImage = "https://silkui.outsystems.com/IframePreview/img/IframePreview.landscape_3.png";
const dynamicImageNoUrl = `<img src="" style="width: 700px;">`;

describe("Image viewer", () => {

    it("loads an image from a dynamic url", () => {
        defaultPage.openDynamicUrl();

        setTimeout(() => {
            defaultPage.imageViewer.waitForVisible();
            const content = defaultPage.imageViewer.getHTML();
            expect(content).toContain(dynamicImage);
        }, 10000);
    });

    it("loads no image when no image url is specified", () => {
        defaultPage.openEmptyUrl();

        setTimeout(() => {
            defaultPage.imageViewer1.waitForVisible();
            const content = defaultPage.imageViewer1.getHTML();
            expect(content).toBe(dynamicImageNoUrl);
        }, 5000);
    });
});
