import { createElement, ReactNode, ReactElement } from "react";
import { Carousel, CarouselProps } from "../Carousel";
import { ObjectItem } from "mendix";
import renderer from "react-test-renderer";

const itemWrapperFunction = () => (wrapper: (children: ReactNode) => ReactElement, item: ObjectItem) =>
    wrapper(item.id);

describe("Carousel", () => {
    const defaultCarouselProps: CarouselProps = {
        className: "",
        items: [],
        pagination: true,
        animation: true,
        autoplay: true,
        delay: 3000,
        loop: true,
        navigation: true,
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
