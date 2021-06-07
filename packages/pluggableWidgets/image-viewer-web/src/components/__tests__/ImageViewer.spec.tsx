import { createElement } from "react";
import { mount, render } from "enzyme";

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

    it("calls the onClick when clicking on an image", () => {
        const onClickMock = jest.fn();
        const imageViewer = mount(
            <ImageViewer.Wrapper responsive hasImage>
                <ImageViewer.Image {...imageProps} onClick={onClickMock} />
            </ImageViewer.Wrapper>
        );

        const image = imageViewer.find("img");
        expect(image).toHaveLength(1);

        image.simulate("click");
        expect(onClickMock).toHaveBeenCalled();
    });

    it("calls the onClick when clicking on an icon", () => {
        const onClickMock = jest.fn();
        const imageViewer = mount(
            <ImageViewer.Wrapper responsive hasImage>
                <ImageViewer.Glyphicon {...glyphiconProps} onClick={onClickMock} />
            </ImageViewer.Wrapper>
        );

        const glyphicon = imageViewer.find("span");
        expect(glyphicon).toHaveLength(1);

        glyphicon.simulate("click");
        expect(onClickMock).toHaveBeenCalled();
    });
});
