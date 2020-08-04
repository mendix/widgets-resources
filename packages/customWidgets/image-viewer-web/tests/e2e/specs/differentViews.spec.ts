import page from "../../../../../../configs/e2e/src/pages/page";
import ImageViewer from "../objects/imageViewer.widget";
import * as html from "../objects/constants";

describe("Image viewer", () => {
    it("renders when listens to data grid", () => {
        page.open("p/listenToGrid");

        const grid = page.getWidget("index-0");
        grid.click();

        const imageViewer = new ImageViewer("imageViewer1");
        imageViewer.element.waitForDisplayed();
        const content = imageViewer.imageSrc;
        expect(content).toContain(html.staticUrl);
    });

    it("renders in a list view", () => {
        page.open("p/listView");

        const imageViewer = new ImageViewer("imageViewer1");
        imageViewer.element.waitForDisplayed();
        const content = imageViewer.imageSrc;
        expect(content).toContain(html.staticUrl);
    });

    it("renders in a template grid", () => {
        page.open("p/templateGrid");

        const imageViewer = new ImageViewer("imageViewer1");
        imageViewer.element.waitForDisplayed();
        const content = imageViewer.imageSrc;
        expect(content).toContain(html.staticUrl);
    });

    it("renders in a tab container", () => {
        page.open("p/tabContainer");

        page.getWidget("tabPage2").click();

        const imageViewer = new ImageViewer("imageViewer2");
        imageViewer.element.waitForDisplayed();
        const content = imageViewer.imageSrc;
        expect(content).toContain(html.dynamicImage);
    });
});
