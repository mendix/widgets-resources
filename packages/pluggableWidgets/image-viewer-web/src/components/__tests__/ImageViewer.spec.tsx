import { createElement } from "react";
import { render } from "enzyme";

import { ImageViewer, ImageViewerImage, ImageViewerGlyphicon } from "../ImageViewer";

describe("ImageViewer", () => {
    const imageProps: ImageViewerImage = {
        image: "https://pbs.twimg.com/profile_images/1905729715/llamas_1_.jpg",
        height: 300,
        heightUnit: "pixels",
        width: 300,
        widthUnit: "pixels"
    };
    const glyphiconProps: ImageViewerGlyphicon = {
        icon: "glyphicon-asterisk",
        size: 20
    };

    it("renders the structure with an image", () => {
        expect(
            render(
                <ImageViewer.Wrapper responsive hasImage>
                    <ImageViewer.Image {...imageProps} />
                </ImageViewer.Wrapper>
            )
        ).toMatchSnapshot();
    });

    it("renders the structure with an image and percentage dimensions", () => {
        expect(
            render(
                <ImageViewer.Wrapper responsive hasImage>
                    <ImageViewer.Image
                        image={imageProps.image}
                        height={100}
                        width={100}
                        heightUnit="auto"
                        widthUnit="percentage"
                    />
                </ImageViewer.Wrapper>
            )
        ).toMatchSnapshot();
    });

    it("renders the structure with an icon", () => {
        expect(
            render(
                <ImageViewer.Wrapper responsive hasImage>
                    <ImageViewer.Glyphicon {...glyphiconProps} />
                </ImageViewer.Wrapper>
            )
        ).toMatchSnapshot();
    });
});
