import { createElement } from "react";
import { Carousel, CarouselProps } from "../Carousel";
import { ObjectItem } from "mendix";
import renderer from "react-test-renderer";

const itemWrapperFunction = (): CarouselProps<ObjectItem>["itemRenderer"] => (wrapper, item) => wrapper(item.id);

describe("Carousel", () => {
    const defaultCarouselProps: CarouselProps<ObjectItem> = {
        items: [],
        pagination: true,
        animation: true,
        autoplay: true,
        delay: 3000,
        loop: true,
        navigation: true,
        tabIndex: undefined,
        onClick: () => jest.fn(),
        itemRenderer: itemWrapperFunction
    };

    it("renders correctly", () => {
        const carousel = renderer.create(<Carousel {...defaultCarouselProps} />);

        expect(carousel).toMatchSnapshot();
    });
    it("renders correctly without pagination", () => {
        const carousel = renderer.create(<Carousel {...defaultCarouselProps} pagination={false} />);

        expect(carousel).toMatchSnapshot();
    });
    it("renders correctly without navigation", () => {
        const carousel = renderer.create(<Carousel {...defaultCarouselProps} navigation={false} />);

        expect(carousel).toMatchSnapshot();
    });
});
