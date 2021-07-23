import { createElement } from "react";
import { mount, shallow } from "enzyme";
import { Gallery, GalleryProps } from "../Gallery";

const itemWrapperFunction = ({
    onClick = false,
    customClass,
    customOnClick
}: {
    onClick?: boolean;
    customClass?: string;
    customOnClick?: () => void;
}): GalleryProps<string>["itemRenderer"] => (wrapper, item) =>
    wrapper(item, customClass, onClick ? (customOnClick ? customOnClick : () => console.log("Clicked")) : undefined);

const defaultProps: GalleryProps<string> = {
    phoneItems: 2,
    tabletItems: 3,
    desktopItems: 4,
    className: "",
    items: ["11", "22", "33"],
    itemRenderer: itemWrapperFunction({})
};

describe("Gallery", () => {
    describe("DOM Structure", () => {
        it("renders correctly", () => {
            const gallery = shallow(<Gallery {...defaultProps} />);

            expect(gallery).toMatchSnapshot();
        });

        it("renders correctly with onclick event", () => {
            const gallery = shallow(
                <Gallery {...defaultProps} itemRenderer={itemWrapperFunction({ onClick: true })} />
            );

            expect(gallery).toMatchSnapshot();
        });
    });

    describe("with events", () => {
        it("triggers correct events on click", () => {
            const onClick = jest.fn();
            const gallery = mount(
                <Gallery
                    {...defaultProps}
                    itemRenderer={itemWrapperFunction({ onClick: true, customOnClick: onClick })}
                />
            );
            const galleryFirstItem = gallery.find(".widget-gallery-clickable").at(0);

            expect(galleryFirstItem).toBeDefined();

            galleryFirstItem.simulate("click");

            expect(onClick).toBeCalled();
        });

        it("triggers correct events on Enter key down", () => {
            const onClick = jest.fn();
            const gallery = mount(
                <Gallery
                    {...defaultProps}
                    itemRenderer={itemWrapperFunction({ onClick: true, customOnClick: onClick })}
                />
            );
            const galleryFirstItem = gallery.find(".widget-gallery-clickable").at(0);

            expect(galleryFirstItem).toBeDefined();

            galleryFirstItem.simulate("keydown", { key: "Enter" });

            expect(onClick).toBeCalled();
        });

        it("triggers correct events on Space key down", () => {
            const onClick = jest.fn();
            const gallery = mount(
                <Gallery
                    {...defaultProps}
                    itemRenderer={itemWrapperFunction({ onClick: true, customOnClick: onClick })}
                />
            );
            const galleryFirstItem = gallery.find(".widget-gallery-clickable").at(0);

            expect(galleryFirstItem).toBeDefined();

            galleryFirstItem.simulate("keydown", { key: " " });

            expect(onClick).toBeCalled();
        });
    });

    describe("with different configurations per platform", () => {
        it("contains correct classes for desktop", () => {
            const gallery = shallow(<Gallery {...defaultProps} desktopItems={12} />);

            expect(gallery.hasClass("widget-gallery-lg-12")).toBeTruthy();
        });

        it("contains correct classes for tablet", () => {
            const gallery = shallow(<Gallery {...defaultProps} tabletItems={6} />);

            expect(gallery.hasClass("widget-gallery-md-6")).toBeTruthy();
        });

        it("contains correct classes for phone", () => {
            const gallery = shallow(<Gallery {...defaultProps} phoneItems={3} />);

            expect(gallery.hasClass("widget-gallery-sm-3")).toBeTruthy();
        });
    });

    describe("with custom classes", () => {
        it("contains correct classes in the wrapper", () => {
            const gallery = shallow(<Gallery {...defaultProps} className="custom-class" />);

            expect(gallery.hasClass("custom-class")).toBeTruthy();
        });

        it("contains correct classes in the items", () => {
            const gallery = shallow(
                <Gallery {...defaultProps} itemRenderer={itemWrapperFunction({ customClass: "custom-class" })} />
            );
            const galleryFirstItem = gallery.find(".widget-gallery-item").at(0);

            expect(galleryFirstItem.hasClass("custom-class")).toBeTruthy();
        });
    });
});
