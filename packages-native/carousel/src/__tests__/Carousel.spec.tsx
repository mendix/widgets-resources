import { CarouselProps } from "../../typings/CarouselProps";
import { CarouselStyle } from "../ui/styles";
import { render } from "react-native-testing-library";
import { createElement } from "react";
import { Text, View } from "react-native";
import { ListValueBuilder } from "@widgets-resources/piw-utils";
import { Carousel } from "../Carousel";

describe("Carousel", () => {
    let defaultProps: CarouselProps<CarouselStyle>;
    const listValueBuilder = ListValueBuilder();
    beforeEach(() => {
        defaultProps = {
            name: "carousel",
            contentSource: listValueBuilder.simple(),
            content: jest.fn(() => (
                <View>
                    <Text>MyContent</Text>
                </View>
            )),
            layout: "card",
            showPagination: true,
            activeSlideAlignment: "center",
            style: []
        };
    });

    /* TODO: enzyme or react-native-testing-lib still not allowing mocking states with hooks
        Thus we can't snapshot test the actual carousel
     */

    it("renders loading", () => {
        expect(render(<Carousel {...defaultProps} />).toJSON()).toMatchSnapshot();
    });

    // it("renders without pagination", () => {
    //     expect(render(<Carousel {...defaultProps} showPagination={false} />).toJSON()).toMatchSnapshot();
    // });
    //
    // it("renders full width", () => {
    //     expect(render(<Carousel {...defaultProps} layout={"fullWidth"} />).toJSON()).toMatchSnapshot();
    // });
    //
    // it("renders numbered pagination if item size is more than 5", () => {
    //     const props = {
    //         ...defaultProps,
    //         contentSource: listValueBuilder.withAmountOfItems(6)
    //     };
    //     expect(render(<Carousel {...props} />).toJSON()).toMatchSnapshot();
    // });
});
