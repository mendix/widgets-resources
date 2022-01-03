import { createElement } from "react";
import { mount, render, shallow } from "enzyme";
import { Gallery, GalleryProps } from "../Gallery";
import { ObjectItem, GUID } from "mendix";

const itemWrapperFunction =
    ({
        onClick,
        customClass
    }: {
        onClick?: () => void;
        customClass?: string;
    }): GalleryProps<ObjectItem>["itemRenderer"] =>
    (wrapper, item) =>
        wrapper(item.id, customClass, onClick);

const defaultProps: GalleryProps<ObjectItem> = {
    hasMoreItems: false,
    page: 0,
    pageSize: 10,
    paging: false,
    phoneItems: 2,
    tabletItems: 3,
    desktopItems: 4,
    className: "",
    items: [{ id: "11" as GUID }, { id: "22" as GUID }, { id: "33" as GUID }],
    itemRenderer: itemWrapperFunction({})
};

describe("Gallery", () => {
    describe("DOM Structure", () => {
        it("renders correctly", () => {
            const gallery = render(<Gallery {...defaultProps} />);

            expect(gallery).toMatchSnapshot();
        });

        it("renders correctly with onclick event", () => {
            const gallery = render(
                <Gallery {...defaultProps} itemRenderer={itemWrapperFunction({ onClick: jest.fn() })} />
            );

            expect(gallery).toMatchSnapshot();
        });
    });

    describe("with events", () => {
        it("triggers correct events on click", () => {
            const onClick = jest.fn();
            const gallery = mount(<Gallery {...defaultProps} itemRenderer={itemWrapperFunction({ onClick })} />);
            const galleryFirstItem = gallery.find(".widget-gallery-clickable").at(0);

            expect(galleryFirstItem).toBeDefined();

            galleryFirstItem.simulate("click");

            expect(onClick).toBeCalled();
        });

        it("triggers correct events on Enter key down", () => {
            const onClick = jest.fn();
            const gallery = mount(<Gallery {...defaultProps} itemRenderer={itemWrapperFunction({ onClick })} />);
            const galleryFirstItem = gallery.find(".widget-gallery-clickable").at(0);

            expect(galleryFirstItem).toBeDefined();

            galleryFirstItem.simulate("keydown", { key: "Enter" });

            expect(onClick).toBeCalled();
        });

        it("triggers correct events on Space key down", () => {
            const onClick = jest.fn();
            const gallery = mount(<Gallery {...defaultProps} itemRenderer={itemWrapperFunction({ onClick })} />);
            const galleryFirstItem = gallery.find(".widget-gallery-clickable").at(0);

            expect(galleryFirstItem).toBeDefined();

            galleryFirstItem.simulate("keydown", { key: " " });

            expect(onClick).toBeCalled();
        });
    });

    describe("with different configurations per platform", () => {
        it("contains correct classes for desktop", () => {
            const gallery = shallow(<Gallery {...defaultProps} desktopItems={12} />);

            expect(gallery.find(".widget-gallery-items").hasClass("widget-gallery-lg-12")).toBeTruthy();
        });

        it("contains correct classes for tablet", () => {
            const gallery = shallow(<Gallery {...defaultProps} tabletItems={6} />);

            expect(gallery.find(".widget-gallery-items").hasClass("widget-gallery-md-6")).toBeTruthy();
        });

        it("contains correct classes for phone", () => {
            const gallery = shallow(<Gallery {...defaultProps} phoneItems={3} />);

            expect(gallery.find(".widget-gallery-items").hasClass("widget-gallery-sm-3")).toBeTruthy();
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

    describe("with pagination", () => {
        it("renders correctly", () => {
            const gallery = render(
                <Gallery {...defaultProps} paging paginationPosition="above" numberOfItems={20} hasMoreItems />
            );

            expect(gallery).toMatchSnapshot();
        });

        it("triggers correct events on click next button", () => {
            const setPage = jest.fn();
            const gallery = mount(
                <Gallery
                    {...defaultProps}
                    paging
                    paginationPosition="above"
                    numberOfItems={20}
                    hasMoreItems
                    setPage={setPage}
                />
            );
            const galleryFirstItem = gallery.find(".glyphicon-step-forward").at(0);

            expect(galleryFirstItem).toBeDefined();

            galleryFirstItem.simulate("click");

            expect(setPage).toBeCalled();
        });
    });

    describe("with empty option", () => {
        it("renders correctly", () => {
            const gallery = render(
                <Gallery
                    {...defaultProps}
                    items={[]}
                    emptyPlaceholderRenderer={renderWrapper => renderWrapper(<span>No items found</span>)}
                />
            );

            expect(gallery).toMatchSnapshot();
        });
    });

    describe("with accessibility properties", () => {
        it("renders correctly", () => {
            const gallery = render(
                <Gallery
                    {...defaultProps}
                    items={[]}
                    filtersTitle="filter title"
                    emptyMessageTitle="empty message"
                    emptyPlaceholderRenderer={renderWrapper => renderWrapper(<span>No items found</span>)}
                />
            );

            expect(gallery).toMatchSnapshot();
        });
    });
});
