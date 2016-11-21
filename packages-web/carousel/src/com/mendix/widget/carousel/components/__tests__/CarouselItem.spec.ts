import { ShallowWrapper, shallow } from "enzyme";
import { DOM, createElement } from "react";

import { CarouselItem, CarouselItemProps } from "../CarouselItem";

describe("CarouselItem", () => {
    const url = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    let carouselItem: ShallowWrapper<CarouselItemProps, any>;
    let carouselImage: ShallowWrapper<CarouselItemProps, any>;

    beforeEach(() => {
        carouselItem = shallow(createElement(CarouselItem, { url, active: true }));
        carouselImage = carouselItem.children().first();
    });

    it("renders the structure correctly", () => {
        expect(carouselItem).toBeElement(
            DOM.div({ className: "widget-carousel-item active" },
                DOM.img({ alt: "Carousel image", src: url })
            ));
    });

    it("renders one image", () => {
        expect(carouselItem.children().length).toBe(1);
        expect(carouselImage.type()).toBe("img");
        expect(carouselImage.prop("src")).toBe(url);
    });

    it("renders the item css class", () => {
        expect(carouselItem.hasClass("widget-carousel-item")).toBe(true);
    });

    it("should add the active css class when active", () => {
        expect(carouselItem.instance().props.active).toBe(true);
        expect(carouselItem.hasClass("active")).toBe(true);
    });

    it("should have an image with the specified url", () => {
        expect(carouselImage.prop("src")).toBe(url);
    });

    it("should not add the active css class when not active", () => {
        carouselItem.setProps({ active: false, url });
        expect(carouselItem.instance().props.active).toBe(false);
        expect(carouselItem.hasClass("active")).toBe(false);
    });
});
