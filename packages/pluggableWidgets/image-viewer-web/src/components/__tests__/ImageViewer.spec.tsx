import { createElement } from "react";
import { mount, render } from "enzyme";
import { ImageViewer, ImageViewerProps } from "../ImageViewer/index";
import { Lightbox } from "../Lightbox";
import { ModalProps } from "react-overlays/esm/Modal";

jest.mock("../../assets/ic24-close.svg", () => "close-button-icon-svg");

jest.mock("react-overlays/Modal", () => (props: ModalProps) => {
    const MockName = "react-overlays-modal-mock";
    // The backdrop is rendered somewhere else in a portal, but for testing sake we put it here since we also mock.
    const BackdropMockName = "react-overlays-modal-backdrop-mock";
    return (
        // @ts-expect-error lower case custom name to make clear it's a mock
        <MockName {...props}>
            {props.children}
            {/* @ts-expect-error lower case custom name to make clear it's a mock */}
            <BackdropMockName>{props.renderBackdrop?.({ onClick: jest.fn(), ref: jest.fn() })}</BackdropMockName>
        </MockName>
    );
});

const imageProps: ImageViewerProps = {
    class: "",
    type: "image",
    image: "https://pbs.twimg.com/profile_images/1905729715/llamas_1_.jpg",
    height: 300,
    heightUnit: "pixels",
    width: 300,
    widthUnit: "pixels",
    iconSize: 0,
    responsive: true,
    onClickType: "action",
    displayAs: "fullImage"
};

const glyphiconProps: ImageViewerProps = {
    class: "",
    type: "icon",
    image: "glyphicon-asterisk",
    iconSize: 20,
    height: 0,
    heightUnit: "pixels",
    width: 0,
    widthUnit: "pixels",
    responsive: true,
    onClickType: "action",
    displayAs: "fullImage"
};

describe("ImageViewer", () => {
    it("renders the structure with an image", () => {
        expect(render(<ImageViewer {...imageProps} />)).toMatchSnapshot();
    });

    it("renders the structure with an image and percentage dimensions", () => {
        expect(
            render(<ImageViewer {...imageProps} height={100} width={100} heightUnit="auto" widthUnit="percentage" />)
        ).toMatchSnapshot();
    });

    it("renders the structure with an icon", () => {
        expect(render(<ImageViewer {...glyphiconProps} />)).toMatchSnapshot();
    });

    describe("when the onClickType is action", () => {
        it("calls the onClick when clicking on an image", () => {
            const onClickMock = jest.fn();
            const imageViewer = mount(<ImageViewer {...imageProps} onClick={onClickMock} onClickType="action" />);

            const image = imageViewer.find("img");
            expect(image).toHaveLength(1);

            image.simulate("click");
            expect(onClickMock).toHaveBeenCalled();
        });

        it("calls the onClick when clicking on an icon", () => {
            const onClickMock = jest.fn();
            const imageViewer = mount(<ImageViewer {...glyphiconProps} onClick={onClickMock} onClickType="action" />);

            const glyphicon = imageViewer.find("span");
            expect(glyphicon).toHaveLength(1);

            glyphicon.simulate("click");
            expect(onClickMock).toHaveBeenCalled();
        });
    });

    describe("when the onClickType is enlarge", () => {
        it("shows a lightbox when the user clicks on the image", () => {
            const imageViewer = mount(<ImageViewer {...imageProps} onClickType="enlarge" />);
            expect(imageViewer.find(Lightbox)).toHaveLength(0);

            const image = imageViewer.find("img");
            expect(image).toHaveLength(1);

            image.simulate("click");
            expect(imageViewer.find(Lightbox)).toHaveLength(1);
        });

        it("closes the lightbox when the user clicks on the close button after opening it", () => {
            const imageViewer = mount(<ImageViewer {...imageProps} onClickType="enlarge" />);

            const image = imageViewer.find("img");
            expect(image).toHaveLength(1);

            image.simulate("click");
            expect(imageViewer.find(Lightbox)).toHaveLength(1);

            const closeButton = imageViewer.find("button");
            expect(closeButton).toHaveLength(1);
            closeButton.simulate("click");

            expect(imageViewer.find(Lightbox)).toHaveLength(0);
        });
    });

    it("does not trigger on clicks from containers if clicked on the image", () => {
        const onClickOuterMock = jest.fn();
        const onClickImageMock = jest.fn();
        const imageViewer = mount(
            <div onClick={onClickOuterMock}>
                <ImageViewer {...imageProps} onClickType="action" onClick={onClickImageMock} />
            </div>
        );

        const image = imageViewer.find("img");
        expect(image).toHaveLength(1);

        image.simulate("click");
        expect(onClickImageMock).toHaveBeenCalledTimes(1);
        expect(onClickOuterMock).not.toHaveBeenCalled();
    });

    describe("when there is an accessibility alt text", () => {
        it("is set properly on an image", () => {
            const imageViewer = mount(<ImageViewer {...imageProps} altText="this is an awesome image" />);
            const image = imageViewer.find("img");
            expect(image.prop("alt")).toBe("this is an awesome image");
        });

        it("is set properly on a glyphicon", () => {
            const imageViewer = mount(<ImageViewer {...glyphiconProps} altText="this is an awesome icon" />);
            const image = imageViewer.find("span");
            expect(image.prop("aria-label")).toBe("this is an awesome icon");
            expect(image.prop("role")).toBe("img");
        });
    });

    describe("when there is no accessibility alt text", () => {
        it("nothing is set on an image", () => {
            const imageViewer = mount(<ImageViewer {...imageProps} />);
            const image = imageViewer.find("img");
            expect(image.prop("alt")).toBe(undefined);
        });

        it("nothing is set on a glyphicon", () => {
            const imageViewer = mount(<ImageViewer {...glyphiconProps} />);
            const image = imageViewer.find("span");
            expect(image).not.toHaveProperty("aria-label");
            expect(image).not.toHaveProperty("role");
        });
    });

    describe("when showing an image as a thumbnail", () => {
        it("includes the thumb=true URL param in the image", () => {
            const imageViewer = mount(<ImageViewer {...imageProps} displayAs="thumbnail" />);
            const image = imageViewer.find("img");
            expect(image.prop("src")).toContain("thumb=true");
        });

        it("does not include the thumb=true URL param in the lightbox image", () => {
            const imageViewer = mount(<ImageViewer {...imageProps} displayAs="thumbnail" onClickType="enlarge" />);

            const image = imageViewer.find("img");
            expect(image.prop("src")).toContain("thumb=true");
            expect(image).toHaveLength(1);

            image.simulate("click");

            const allImages = imageViewer.findWhere(
                node => node.type() === "img" && node.prop("src").startsWith(imageProps.image)
            );
            expect(allImages).toHaveLength(2);

            expect(allImages.at(0).prop("src")).toContain("thumb=true");
            expect(allImages.at(1).prop("src")).not.toContain("thumb=true");
        });
    });
});
