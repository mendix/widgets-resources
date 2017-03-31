import { ShallowWrapper, shallow } from "enzyme";
import { DOM, createElement } from "react";
import { image } from "faker";

import { CarouselItem, CarouselItemProps } from "../CarouselItem";

describe("CarouselItem", () => {
    const url = image.imageUrl();
    let carouselItem: ShallowWrapper<CarouselItemProps, any>;
    let carouselImage: ShallowWrapper<CarouselItemProps, any>;

    beforeEach(() => {
        carouselItem = shallow(createElement(CarouselItem, {
            url,
            getItemNode: jasmine.createSpy("ref"),
            position: 100,
            status: "active"
        }));
        carouselImage = carouselItem.children().first();
    });

    it("renders the structure correctly", () => {
        expect(carouselItem).toBeElement(
            DOM.div(
                {
                    className: "widget-carousel-item active",
                    style: { transform: "translate3d(100%, 0px, 0px)" }
                },
                DOM.img({ alt: "Carousel image", src: url })
            ));
    });

    it("renders one image", () => {
        expect(carouselItem.children().length).toBe(1);
        expect(carouselImage.type()).toBe("img");
        expect(carouselImage.prop("src")).toBe(url);
    });

    it("renders the widget-carousel-item css class", () => {
        expect(carouselItem.hasClass("widget-carousel-item")).toBe(true);
    });

    it("should add the active css class when active", () => {
        expect(carouselItem.instance().props.status).toBe("active");
        expect(carouselItem.hasClass("active")).toBe(true);
    });

    it("should have an image with the specified url", () => {
        expect(carouselImage.prop("src")).toBe(url);
    });

    it("should not add the active css class when not active", () => {
        carouselItem.setProps({ position: 100, status: "prev", url });
        expect(carouselItem.instance().props.status).not.toBe("active");
        expect(carouselItem.hasClass("active")).toBe(false);
    });

    describe("image", () => {
        const onClickSpy = jasmine.createSpy("onClick");
        it("should respond to a single click", () => {
            carouselItem = shallow(createElement(CarouselItem, {
                onClick: onClickSpy,
                position: 100,
                status: "active",
                url
            }));

            carouselItem.simulate("click");

            expect(onClickSpy).toHaveBeenCalled();
        });
    });
});
