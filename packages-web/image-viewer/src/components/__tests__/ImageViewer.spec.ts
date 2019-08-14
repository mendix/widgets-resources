import { ShallowWrapper, shallow } from "enzyme";
import { createElement } from "react";

import { ImageViewer, ImageViewerProps, ImageViewerState } from "../ImageViewer";
import { onClickOptions } from "./../ImageViewerContainer";

describe("ImageViewer", () => {
    let imageViewerProps: ImageViewerProps;
    let imageViewer: ShallowWrapper<ImageViewerProps, ImageViewerState>;
    const imageUrl = "https://pbs.twimg.com/profile_images/1905729715/llamas_1_.jpg";
    const height = 300;
    const heightUnit = "pixels";
    const width = 300;
    const widthUnit = "pixels";
    const responsive = true;
    const onClickOption: onClickOptions = "openFullScreen";

    beforeEach(() => {
        imageViewerProps = {
            height,
            heightUnit,
            imageUrl,
            onClickOption,
            responsive,
            width,
            widthUnit
        };
    });
    const renderImageViewer = (props: ImageViewerProps): ShallowWrapper<ImageViewerProps, any> =>
        shallow(createElement(ImageViewer, props));

    it("renders the structure", () => {
        imageViewer = renderImageViewer(imageViewerProps);

        expect(imageViewer).toMatchSnapshot();
    });

    it("executes other onlick actions", () => {
        imageViewerProps.onClickOption = "callMicroflow";
        const onClickSpy = jest.fn();
        imageViewerProps.onClick = onClickSpy;
        imageViewer = renderImageViewer(imageViewerProps);

        imageViewer.childAt(0).simulate("click");

        expect(imageViewer.state().isOpen).toBe(false);
        expect(onClickSpy).toHaveBeenCalled();
    });

    it("renders the lightbox when the image is clicked", () => {
        imageViewer = renderImageViewer(imageViewerProps);

        imageViewer.childAt(0).simulate("click");

        expect(imageViewer.state().isOpen).toBe(true);
    });

    it("closes the lightbox when the close icon is clicked", () => {
        imageViewer = renderImageViewer(imageViewerProps);

        imageViewer.childAt(0).simulate("click");
        const imageViewerInstance = imageViewer.instance() as any;
        imageViewerInstance.toggleLightBox();

        expect(imageViewer.state().isOpen).toBe(false);
    });

    describe("returns the style value as", () => {
        it("% when height or width units is set to percentage", () => {
            imageViewerProps.width = 50;
            imageViewerProps.widthUnit = "percentage";

            imageViewer = renderImageViewer(imageViewerProps);

            expect(imageViewer).toMatchSnapshot();
        });

        it("as an empty string when the height or width units is set to auto", () => {
            imageViewerProps.widthUnit = "auto";
            imageViewerProps.heightUnit = "auto";
            imageViewer = renderImageViewer(imageViewerProps);

            expect(imageViewer).toMatchSnapshot();
        });
    });
});
