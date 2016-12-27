import { ShallowWrapper, shallow } from "enzyme";
import { DOM, createElement } from "react";

import { Carousel, CarouselProps, Image } from "../Carousel";
import { CarouselControl } from "../CarouselControl";
import { CarouselItem } from "../CarouselItem";

describe("Carousel", () => {
    let images: Image[];
    let carousel: ShallowWrapper<CarouselProps, any>;
    let carouselWrapper: ShallowWrapper<CarouselProps, any>;

    it("renders the structure correctly", () => {
        carousel = shallow(createElement(Carousel));

        expect(carousel).toBeElement(
            DOM.div({ className: "widget-carousel" },
                DOM.div({ className: "widget-carousel-item-wrapper" })
            )
        );
    });

    describe("with no images", () => {
        beforeEach(() => carousel = shallow(createElement(Carousel)) );

        it("renders no carousel items", () => {
            const carouselItems = carousel.find(CarouselItem);

            expect(carouselItems.length).toBe(0);
        });

        it("renders no navigation controls", () => {
            expect(carousel.find(CarouselControl).length).toBe(0);
        });
    });

    describe("with one image", () => {
        beforeEach(() => {
            images = [ { url: "https://www.google.com/images/nav_logo242.png" } ];
            carousel = shallow(createElement(Carousel, { images }));
        });

        it("renders one carousel item", () => {
            const carouselItem = carousel.find(CarouselItem);

            expect(carouselItem.length).toBe(1);

            expect(carouselItem.props().active).toBe(true);
            expect(carouselItem.props().url).toBe(images[0].url);
        });

        it("renders navigation controls", () => {
            const carouselControls = carousel.find(CarouselControl);

            expect(carouselControls.length).toBe(2);
            expect(carouselControls.at(0).props().direction).toBe("left");
            expect(carouselControls.at(1).props().direction).toBe("right");
        });
    });

    describe("with multiple images", () => {
        beforeEach(() => {
            images = [
                { url: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" },
                { url: "https://www.google.com/images/nav_logo242.png" }
            ];
            carousel = shallow(createElement(Carousel, { images }));
            carouselWrapper = carousel.find(".widget-carousel-item-wrapper");
        });

        it("renders all carousel items", () => {
            const carouselItems = carouselWrapper.find(CarouselItem);

            expect(carouselItems.length).toBe(2);

            expect(carouselItems.at(0).props().active).toBe(true);
            expect(carouselItems.at(0).props().url).toBe(images[0].url);

            expect(carouselItems.at(1).props().active).toBe(false);
            expect(carouselItems.at(1).props().url).toBe(images[1].url);
        });

        it("renders the first carousel item active", () => {
            const firstCarouselItem = carouselWrapper.find(CarouselItem).first();

            expect(firstCarouselItem.prop("active")).toBe(true);
        });

        it("renders only one active carousel item", () => {
            const activeItems = carouselWrapper.find(CarouselItem).filterWhere((c) => c.prop("active"));

            expect(activeItems.length).toBe(1);
        });

        it("renders navigation controls", () => {
            const carouselControls = carousel.find(CarouselControl);

            expect(carouselControls.length).toBe(2);
            expect(carouselControls.at(0).props().direction).toBe("left");
            expect(carouselControls.at(1).props().direction).toBe("right");
        });
    });

    describe("with navigation controls", () => {
        it("moves to the next image when the right control is clicked", () => {
            const carouselControls = carousel.find(CarouselControl);
            const rightControl = carouselControls.at(1);

            rightControl.simulate("click");

            const carouselItems = carousel.find(CarouselItem);
            expect(carousel.state().activeIndex).toBe(1);
            expect(carouselItems.at(0).props().active).toBe(false);
            expect(carouselItems.at(1).props().active).toBe(true);
        });

        it("moves to the first image when the right control of last image is clicked", () => {
            carousel.setState({ activeIndex: 1 });
            const carouselControls = carousel.find(CarouselControl);
            const rightControl = carouselControls.at(1);

            rightControl.simulate("click");

            const carouselItems = carousel.find(CarouselItem);
            expect(carousel.state().activeIndex).toBe(0);
            expect(carouselItems.at(0).props().active).toBe(true);
            expect(carouselItems.at(1).props().active).toBe(false);
        });

        it("moves to the previous image when the left control is clicked", () => {
            carousel.setState({ activeIndex: 1 });
            const carouselControls = carousel.find(CarouselControl);
            const leftControl = carouselControls.at(0);

            leftControl.simulate("click");

            const carouselItems = carousel.find(CarouselItem);
            expect(carousel.state().activeIndex).toBe(0);
            expect(carouselItems.at(0).props().active).toBe(true);
            expect(carouselItems.at(1).props().active).toBe(false);
        });

        it("moves to the last image when the left control on first image is clicked", () => {
            const carouselControls = carousel.find(CarouselControl);
            const leftControl = carouselControls.at(0);

            leftControl.simulate("click");

            const carouselItems = carousel.find(CarouselItem);
            expect(carousel.state().activeIndex).toBe(1);
            expect(carouselItems.at(0).props().active).toBe(false);
            expect(carouselItems.at(1).props().active).toBe(true);
        });
    });
});
