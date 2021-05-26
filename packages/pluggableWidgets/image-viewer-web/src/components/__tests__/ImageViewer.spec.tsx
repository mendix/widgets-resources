import { createElement } from "react";
import { mount, ReactWrapper, shallow } from "enzyme";
import Lightbox from "react-image-lightbox";

import { ImageViewer, ImageViewerProps } from "../ImageViewer";

describe("ImageViewer", () => {
    const defaultProps: ImageViewerProps = {
        height: 300,
        heightUnit: "pixels",
        width: 300,
        widthUnit: "pixels",
        responsive: true,
        type: "image",
        image: "https://pbs.twimg.com/profile_images/1905729715/llamas_1_.jpg"
    };

    const renderImageViewer = (props: ImageViewerProps): ReactWrapper<ImageViewerProps> =>
        mount(<ImageViewer {...props} />);

    it("renders the structure", () => {
        expect(shallow(<ImageViewer {...defaultProps} />)).toMatchSnapshot();
    });

    it("renders the lightbox when the image is clicked", () => {
        const imageViewer = renderImageViewer(defaultProps);

        const lightboxBefore = imageViewer.find(Lightbox);
        expect(lightboxBefore).toHaveLength(0);

        const image = imageViewer.find("img");
        expect(image).toHaveLength(1);

        image.simulate("click");

        const lightboxAfter = imageViewer.find(Lightbox);
        expect(lightboxAfter).toHaveLength(1);
        expect(lightboxAfter.prop("mainSrc")).toBe(defaultProps.image);
    });
});
