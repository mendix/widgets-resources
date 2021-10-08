import page from "../../../../../../configs/e2e/src/pages/page";
import Image from "../objects/imageRender.widget";
import * as html from "../objects/constants";

describe("Image viewer", () => {
    it("renders when listens to data grid", () => {
        page.open("p/listenToGrid");

        const grid = page.getWidget("index-0");
        grid.click();

        const imageRender = new Image("image1");
        imageRender.element.waitForDisplayed();
        const content = imageRender.imageSrc;
        expect(content).toContain(html.staticUrl);
    });

    it("renders in a list view", () => {
        page.open("p/listView");

        const imageRender = new Image("image1");
        imageRender.element.waitForDisplayed();
        const content = imageRender.imageSrc;
        expect(content).toContain(html.staticUrl);
    });

    it("renders in a template grid", () => {
        page.open("p/templateGrid");

        const imageRender = new Image("image1");
        imageRender.element.waitForDisplayed();
        const content = imageRender.imageSrc;
        expect(content).toContain(html.staticUrl);
    });

    it("renders in a tab container", () => {
        page.open("p/tabContainer");

        page.getWidget("tabPage2").click();

        const imageRender = new Image("imageTabPage2");
        imageRender.element.waitForDisplayed();
        const content = imageRender.imageSrc;
        expect(content).toContain(html.staticUrl);
    });
});
