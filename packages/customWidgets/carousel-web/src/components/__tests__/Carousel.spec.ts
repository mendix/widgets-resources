import { ShallowWrapper, shallow } from "enzyme";
import { createElement } from "react";

import { Carousel, CarouselProps, Image } from "../Carousel";
import { CarouselControl } from "../CarouselControl";
import { CarouselItem } from "../CarouselItem";

import { image } from "faker";

describe("Carousel", () => {
    let images: Image[];
    let carousel: ShallowWrapper<CarouselProps, any>;
    let carouselWrapper: ShallowWrapper<CarouselProps, any>;

    it("renders the structure correctly", () => {
        carousel = shallow(createElement(Carousel));

        expect(carousel).toMatchSnapshot();
    });

    describe("with no images", () => {
        beforeEach(() => (carousel = shallow(createElement(Carousel))));

        it("renders no carousel items", () => {
            const carouselItems = carousel.find(CarouselItem);

            expect(carouselItems).toHaveLength(0);
        });

        it("renders no navigation controls", () => {
            expect(carousel.find(CarouselControl)).toHaveLength(0);
        });
    });

    describe("with one image", () => {
        beforeEach(() => {
            images = [{ url: image.imageUrl(), openPageAs: "content" }];
            carousel = shallow(createElement(Carousel, { images }));
        });

        it("renders one carousel item", () => {
            const carouselItem = carousel.find(CarouselItem);

            expect(carouselItem).toHaveLength(1);
            expect(carouselItem.props().status).toContain("active");
            expect(carouselItem.props().url).toBe(images[0].url);
        });

        it("renders no navigation controls", () => {
            const carouselControls = carousel.find(CarouselControl);

            expect(carouselControls).toHaveLength(0);
        });
    });

    describe("with multiple images", () => {
        beforeEach(() => {
            images = [
                { url: image.imageUrl(), openPageAs: "content" },
                { url: image.imageUrl(800, 600), openPageAs: "content" },
                { url: image.imageUrl(600, 600), openPageAs: "content" }
            ];
            carousel = shallow(createElement(Carousel, { images }));
            carouselWrapper = carousel.find(".widget-carousel-item-wrapper") as ShallowWrapper<CarouselProps, any>;
        });

        it("renders all carousel items", () => {
            const carouselItems = carouselWrapper.find(CarouselItem);

            expect(carouselItems).toHaveLength(3);

            expect(carouselItems.at(0).props().status).toContain("active");
            expect(carouselItems.at(0).props().url).toBe(images[0].url);

            expect(carouselItems.at(1).props().status).toContain("next");
            expect(carouselItems.at(1).props().url).toBe(images[1].url);

            expect(carouselItems.at(2).props().status).toContain("next");
            expect(carouselItems.at(2).props().url).toBe(images[2].url);
        });

        it("renders the first carousel item active", () => {
            const firstCarouselItem = carouselWrapper.find(CarouselItem).first();

            expect(firstCarouselItem.prop("status")).toContain("active");
        });

        it("renders only one active carousel item", () => {
            const activeItems = carouselWrapper.find(CarouselItem).filterWhere(c => {
                return c.props().status.indexOf("active") !== -1;
            });

            expect(activeItems).toHaveLength(1);
        });

        it("moves to the next image when the right control is clicked", () => {
            const carouselControls = carousel.find(CarouselControl);
            const rightControl = carouselControls.at(0);

            rightControl.simulate("click");

            const carouselItems = carousel.find(CarouselItem);
            expect(carousel.state().activeIndex).toBe(1);
            expect(carouselItems.at(0).props().status).toBe("prev");
            expect(carouselItems.at(1).props().status).toBe("active");
        });

        it("moves to the previous image when the left control is clicked", () => {
            carousel.setState({ activeIndex: 1 });
            const carouselControls = carousel.find(CarouselControl);
            const leftControl = carouselControls.at(1);

            leftControl.simulate("click");

            const carouselItems = carousel.find(CarouselItem);
            expect(carousel.state().activeIndex).toBe(0);
            expect(carouselItems.at(0).props().status).toBe("active");
            expect(carouselItems.at(1).props().status).toBe("next");
        });

        it("but no image to the right renders only the left carousel control", () => {
            carousel.setState({ activeIndex: 2 });
            const carouselControls = carousel.find(CarouselControl);

            expect(carouselControls).toHaveLength(1);
            expect(carouselControls.at(0).props().direction).toBe("left");
        });

        it("but no image to the left renders only the right carousel control", () => {
            const carouselControls = carousel.find(CarouselControl);

            expect(carouselControls).toHaveLength(1);
            expect(carouselControls.at(0).props().direction).toBe("right");
        });
    });

    describe("on a mobile device", () => {
        const swipeEventMock = (swipeEvent: "right" | "left" | "rightend" | "leftend", pageX = 100): CustomEvent =>
            new CustomEvent(`swipe${swipeEvent}`, {
                detail: {
                    originPageX: swipeEvent.indexOf("right") > -1 ? 12 : 180,
                    pageX
                }
            });

        const carouselItemWrapper = document.createElement("div");
        const carouselItem1Mock = document.createElement("div");
        const carouselItem2Mock = document.createElement("div");
        carouselItemWrapper.appendChild(carouselItem1Mock);
        carouselItemWrapper.appendChild(carouselItem2Mock);

        const addCarouselItems = (carouselInstance: any): any => {
            carouselInstance.addCarouselItem(carouselItem1Mock);
            carouselInstance.addCarouselItem(carouselItem2Mock);
            carouselInstance.carouselWidth = 500;
        };

        beforeEach(() => {
            images = [
                { url: image.imageUrl(), openPageAs: "content" },
                { url: image.imageUrl(800, 600), openPageAs: "content" },
                { url: image.imageUrl(600, 600), openPageAs: "content" }
            ];
            carousel = shallow(createElement(Carousel, { images }));
        });

        it("registers touch events on carousel items", () => {
            const carouselInstance = carousel.instance() as any;
            spyOn(carouselItem1Mock, "addEventListener").and.callThrough();
            spyOn(carouselInstance, "registerEvents").and.callThrough();

            carouselInstance.addCarouselItem(carouselItem1Mock);

            expect(carouselInstance.registerEvents).toHaveBeenCalled();
            expect(carouselItem1Mock.addEventListener).toHaveBeenCalledTimes(5);
        });

        it("removes registered events on carousel items when updated", () => {
            const carouselInstance = carousel.instance() as any;
            carouselInstance.UNSAFE_componentWillReceiveProps({ alertMessage: "", images: [] });
            spyOn(carouselItem1Mock, "removeEventListener").and.callThrough();
            spyOn(carouselInstance, "removeEvents").and.callThrough();

            carouselInstance.addCarouselItem(carouselItem1Mock);
            carouselInstance.UNSAFE_componentWillReceiveProps({ alertMessage: "", images: [] });

            expect(carouselInstance.removeEvents).toHaveBeenCalled();
            expect(carouselItem1Mock.removeEventListener).toHaveBeenCalledTimes(5);
        });

        it("does not show controls while swiping", () => {
            const carouselInstance = carousel.instance() as any;
            addCarouselItems(carouselInstance);

            carouselItem1Mock.dispatchEvent(swipeEventMock("left"));

            expect(carousel.state("showControls")).toBe(false);
        });

        it("does not animate while swiping", () => {
            const carouselInstance = carousel.instance() as any;
            addCarouselItems(carouselInstance);

            carouselItem1Mock.dispatchEvent(swipeEventMock("left"));

            expect(carousel.state("animate")).toBe(false);
        });

        it("does not swipe out until swipe threshold is passed", () => {
            const carouselInstance = carousel.instance() as any;
            addCarouselItems(carouselInstance);
            const currentPosition = 100;
            carouselInstance.swipeStartPosition = 180;

            carouselItem1Mock.dispatchEvent(swipeEventMock("left", currentPosition));

            expect(carousel.state("position")).toBeLessThan(0);

            carouselItem1Mock.dispatchEvent(swipeEventMock("leftend", currentPosition));

            expect(carousel.state("activeIndex")).toBe(0);
        });

        it("moves to the next carousel item when swiped to the left", () => {
            const carouselInstance = carousel.instance() as any;
            addCarouselItems(carouselInstance);
            const currentPosition = 70;
            carouselInstance.swipeStartPosition = 180;

            carouselItem1Mock.dispatchEvent(swipeEventMock("left", currentPosition));
            carouselItem1Mock.dispatchEvent(swipeEventMock("leftend", currentPosition));

            expect(carousel.state("activeIndex")).toBe(1);
        });

        it("moves to the previous image when swiped to the right", () => {
            carousel.setState({ activeIndex: 1 });
            const carouselInstance = carousel.instance() as any;
            addCarouselItems(carouselInstance);
            const currentPosition = 120;
            carouselInstance.swipeStartPosition = 12;

            carouselItem1Mock.dispatchEvent(swipeEventMock("right", currentPosition));
            carouselItem1Mock.dispatchEvent(swipeEventMock("rightend", currentPosition));

            expect(carousel.state("activeIndex")).toBe(0);
        });

        it("animates when swiping out", () => {
            carousel.setState({ activeIndex: 1 });
            const carouselInstance = carousel.instance() as any;
            addCarouselItems(carouselInstance);
            const currentPosition = 120;

            carouselItem1Mock.dispatchEvent(swipeEventMock("rightend", currentPosition));

            expect(carousel.state("animate")).toBe(true);
        });

        it("shows carousel controls when swiping is done", () => {
            carousel.setState({ activeIndex: 1 });
            const carouselInstance = carousel.instance() as any;
            addCarouselItems(carouselInstance);
            const currentPosition = 120;

            carouselItem1Mock.dispatchEvent(swipeEventMock("right", currentPosition));
            carouselItem1Mock.dispatchEvent(swipeEventMock("rightend", currentPosition));

            expect(carousel.state("showControls")).toBe(true);
        });

        it("does not swipe to the right when on the first image", () => {
            const carouselInstance = carousel.instance() as any;
            addCarouselItems(carouselInstance);
            const currentPosition = 120;

            carouselItem1Mock.dispatchEvent(swipeEventMock("right", currentPosition));
            carouselItem1Mock.dispatchEvent(swipeEventMock("rightend", currentPosition));

            expect(carousel.state("activeIndex")).toBe(0);
        });

        it("does not swipe to the left when on the last image", () => {
            carousel.setState({ activeIndex: 2 });
            const carouselInstance = carousel.instance() as any;
            addCarouselItems(carouselInstance);
            const currentPosition = 70;

            carouselItem1Mock.dispatchEvent(swipeEventMock("left", currentPosition));
            carouselItem1Mock.dispatchEvent(swipeEventMock("leftend", currentPosition));

            expect(carousel.state("activeIndex")).toBe(2);
        });

        it("removes registered events on carousel items when unmounting", () => {
            const carouselInstance = carousel.instance() as any;
            spyOn(carouselItem1Mock, "removeEventListener").and.callThrough();
            spyOn(carouselInstance, "removeEvents").and.callThrough();

            carouselInstance.addCarouselItem(carouselItem1Mock);
            carouselInstance.componentWillUnmount();

            expect(carouselInstance.removeEvents).toHaveBeenCalled();
            expect(carouselItem1Mock.removeEventListener).toHaveBeenCalledTimes(5);
        });
    });
});
