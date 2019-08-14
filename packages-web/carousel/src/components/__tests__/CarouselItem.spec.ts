import { ShallowWrapper, shallow } from "enzyme";
import { createElement } from "react";
import { image } from "faker";

import { CarouselItem, CarouselItemProps } from "../CarouselItem";

describe("CarouselItem", () => {
    const url = image.imageUrl();
    let carouselItem: ShallowWrapper<CarouselItemProps, any>;
    let carouselImage: ShallowWrapper<CarouselItemProps, any>;

    beforeEach(() => {
        carouselItem = shallow(
            createElement(CarouselItem, {
                getItemNode: jest.fn(),
                position: 100,
                status: "active",
                url
            })
        );
        carouselImage = carouselItem.children().first();
    });

    it("renders the structure correctly", () => {
        expect(carouselItem).toMatchSnapshot();
    });

    it("renders one image", () => {
        expect(carouselItem.children()).toHaveLength(1);
        expect(carouselImage.type()).toBe("img");
        expect(carouselImage.prop("src")).toBe(url);
    });

    it("renders the widget-carousel-item css class", () => {
        expect(carouselItem.hasClass("widget-carousel-item")).toBe(true);
    });

    it("should add the active css class when active", () => {
        // SFC class doesnt have scope for props expect(carouselItem.props().status).toBe("active");
        expect(carouselItem.hasClass("active")).toBe(true);
    });

    it("should have an image with the specified url", () => {
        expect(carouselImage.prop("src")).toBe(url);
    });

    it("should not add the active css class when not active", () => {
        carouselItem.setProps({ position: 100, status: "prev", url });
        // SFC class doesnt have scope for props expect(carouselItem.props().status).not.toBe("active");
        expect(carouselItem.hasClass("active")).toBe(false);
    });

    describe("image", () => {
        const onClickSpy = jest.fn();
        it("should respond to a single click", () => {
            carouselItem = shallow(
                createElement(CarouselItem, {
                    onClick: onClickSpy,
                    position: 100,
                    status: "active",
                    url
                })
            );

            carouselItem.simulate("click");

            expect(onClickSpy).toHaveBeenCalled();
        });
    });
});
