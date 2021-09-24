import page from "../../../../../../configs/e2e/src/pages/page";
import Image from "../objects/imageRender.widget";
import * as html from "../objects/constants";

describe("Image viewer", () => {
    it("loads an image from a dynamic url", () => {
        page.open("p/dynamicUrl");

        const imageRender = new Image("imageRender1");
        imageRender.element.waitForDisplayed();
        const content = imageRender.imageSrc;
        expect(content).toBe(html.dynamicImage);
    });

    // eslint-disable-next-line jest/no-disabled-tests
    xit("loads an image from a dynamic url association", () => {
        page.open("p/dynamicUrlAssociation");

        const imageRender = new Image("imageRender1");
        imageRender.element.waitForDisplayed();
        const content = imageRender.imageSrc;
        expect(content).toBe(html.dynamicImage);
    });

    // todo: unskip once we figure out why this spec is failing.
    // eslint-disable-next-line jest/no-disabled-tests
    xit("loads no image when no image url is specified", () => {
        page.open("p/emptyUrl");

        const imageRender = new Image("imageRender1");
        const content = imageRender.imageSrcHidden;
        expect(content).toContain(page.url);
    });

    it("loads an image from a static image", () => {
        page.open("p/staticImage");

        const imageRender = new Image("imageRender1");
        imageRender.element.waitForDisplayed();
        const content = imageRender.imageSrc;
        expect(content).toContain(html.staticImage);
    });

    it("loads an image from a static URL", () => {
        page.open("p/staticUrl");

        const imageRender = new Image("imageRender1");
        imageRender.element.waitForDisplayed();
        const content = imageRender.imageSrc;
        expect(content).toBe(html.staticUrl);
    });
});
