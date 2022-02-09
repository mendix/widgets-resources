import { createElement } from "react";
import { Carousel, CarouselProps } from "../Carousel";
import renderer from "react-test-renderer";
import { GUID } from "mendix";

describe("Carousel", () => {
    const defaultCarouselProps: CarouselProps = {
        className: "",
        items: [{ id: "1" as GUID, content: <div /> }],
        pagination: true,
        animation: true,
        autoplay: true,
        delay: 3000,
        loop: true,
        navigation: true,
        onClick: () => jest.fn()
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
