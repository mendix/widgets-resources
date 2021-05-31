import page from "../../../../../../configs/e2e/src/pages/page";
import ImageViewer from "../objects/imageViewer.widget";

describe("Image viewer", () => {
    it("displays error if no Dynamic Url configured", () => {
        page.open("p/noDynamicUrl");

        ImageViewer.errorAlert.waitForDisplayed();
        expect(ImageViewer.errorAlert.getText()).toBe(
            "Error in image viewer configuration:\n" +
                "for data source option 'Dynamic URL' the Dynamic image URL attribute should be configured"
        );
    });

    it("displays error if no Microflow Selected", () => {
        page.open("p/noMicroflowSelected");

        ImageViewer.errorAlert.waitForDisplayed();
        expect(ImageViewer.errorAlert.getText()).toBe(
            "Error in image viewer configuration:\n" + "on click microflow is required"
        );
    });

    it("displays error if no Nanoflow Selected", () => {
        page.open("p/noNanoflowSelected");

        ImageViewer.errorAlert.waitForDisplayed();
        expect(ImageViewer.errorAlert.getText()).toBe(
            "Error in image viewer configuration:\n" + "on click nanoflow is required"
        );
    });

    it("displays error if no Page Selected", () => {
        page.open("p/noPageSelected");

        ImageViewer.errorAlert.waitForDisplayed();
        expect(ImageViewer.errorAlert.getText()).toBe(
            "Error in image viewer configuration:\n" + "on click page is required"
        );
    });

    it("displays error if no Static Image configured", () => {
        page.open("p/noStaticImage");

        ImageViewer.errorAlert.waitForDisplayed();
        expect(ImageViewer.errorAlert.getText()).toBe(
            "Error in image viewer configuration:\n" +
                "for data source option 'Static Image' a static image should be configured"
        );
    });

    it("displays error if no Static Url configured", () => {
        page.open("p/noStaticUrl");

        ImageViewer.errorAlert.waitForDisplayed();
        expect(ImageViewer.errorAlert.getText()).toBe(
            "Error in image viewer configuration:\n" +
                "for data source option 'Static URL' a static image url should be configured"
        );
    });

    it("displays error if Not From System.Image", () => {
        page.open("p/notFromSystemImage");

        ImageViewer.errorAlert.waitForDisplayed();
        expect(ImageViewer.errorAlert.getText()).toBe(
            "Error in image viewer configuration:\n" +
                "for data source option 'System image' the context object should inherit system.image"
        );
    });
    it("displays error if dynamic URL over association attribute is deeper than one level", () => {
        page.open("p/dynamicUrlOverAssociationError");

        ImageViewer.errorAlert.waitForDisplayed();
        expect(ImageViewer.errorAlert.getText()).toBe(
            "Error in image viewer configuration:\n" + "start date attribute can only go over one association"
        );
    });
});
