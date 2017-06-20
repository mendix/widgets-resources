import { ShallowWrapper, shallow } from "enzyme";
import { DOM, createElement } from "react";

import * as Lightbox from "react-image-lightbox";
import { ImageViewer, ImageViewerProps, ImageViewerState } from "../ImageViewer";

describe("ImageViewer", () => {
    let imageViewerProps: ImageViewerProps;
    let imageViewer: ShallowWrapper<ImageViewerProps, ImageViewerState>;
    const imageUrl = "https://pbs.twimg.com/profile_images/1905729715/llamas_1_.jpg";
    const height = 300;
    const heightUnit = "pixels";
    const width = 300;
    const widthUnit = "pixels";
    let style = { height: height + "px" , width: width + "px" };

    beforeEach(() => {
        imageViewerProps = {
            height,
            heightUnit,
            imageUrl,
            width,
            widthUnit
        };
    });
    const renderImageViewer = (props: ImageViewerProps) => shallow(createElement(ImageViewer, props));

    it("renders the structure", () => {
        imageViewer = renderImageViewer(imageViewerProps);

        expect(imageViewer).toBeElement(
            DOM.div({ className: "widget-image-viewer", style },
                DOM.img({
                    onClick: jasmine.any(Function) as any,
                    src: imageUrl,
                    style
                }),
                imageViewer.state().isOpen && createElement(Lightbox, {
                    mainSrc: imageUrl,
                    onCloseRequest: jasmine.any(Function) as any
                })
            )
        );
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
            imageViewerProps.height = 50;
            imageViewerProps.heightUnit = "percentage";
            imageViewerProps.width = 50;
            imageViewerProps.widthUnit = "percentage";
            style = { height: imageViewerProps.height + "%", width: imageViewerProps.width + "%" };

            imageViewer = renderImageViewer(imageViewerProps);

            expect(imageViewer).toBeElement(
                DOM.div({ className: "widget-image-viewer", style },
                    DOM.img({
                        onClick: jasmine.any(Function) as any,
                        src: imageUrl,
                        style: { height: "100%" , width: "100%" }
                    }),
                    createElement(Lightbox, {
                        mainSrc: imageUrl,
                        onCloseRequest: jasmine.any(Function) as any
                    })
                )
            );
        });

        it("as an empty string when the height or width units is set to auto", () => {
            imageViewerProps.widthUnit = "auto";
            imageViewerProps.heightUnit = "auto";
            style = { height: "", width: "" };

            imageViewer = renderImageViewer(imageViewerProps);

            expect(imageViewer).toBeElement(
                DOM.div({ className: "widget-image-viewer", style },
                    DOM.img({
                        onClick: jasmine.any(Function) as any,
                        src: imageUrl,
                        style
                    }),
                    createElement(Lightbox, {
                        mainSrc: imageUrl,
                        onCloseRequest: jasmine.any(Function) as any
                    })
                )
            );
        });
    });
});
