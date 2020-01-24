import { render } from "react-native-testing-library";
import { Carousel } from "../Carousel";
import { CarouselProps } from "../../typings/CarouselProps";
import { CarouselStyle } from "../ui/styles";
import { createElement } from "react";
import { ValueStatus } from "mendix";
import { Text, View } from "react-native";

describe("Carousel", () => {
    let defaultProps: CarouselProps<CarouselStyle>;
    beforeEach(() => {
        defaultProps = {
            name: "carousel",
            contentSource: {
                status: ValueStatus.Available,
                items: [{ id: "1" }, { id: "2" }],
                offset: 0,
                totalCount: 1,
                hasMoreItems: false,
                version: 1
            },
            content: jest.fn(() => (
                <View>
                    <Text>MyContent</Text>
                </View>
            )),
            layout: "card",
            showPagination: true,
            activeSlideAlignment: "center",
            loop: false,
            style: []
        };
    });
    it("renders", () => {
        expect(render(<Carousel {...defaultProps} />).toJSON()).toMatchSnapshot();
    });

    it("renders full width", () => {
        expect(render(<Carousel {...defaultProps} layout={"fullWidth"} />).toJSON()).toMatchSnapshot();
    });

    it("renders numbered pagination if item size is more than 5", () => {
        const fiveItems = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }];
        const props = {
            ...defaultProps,
            contentSource: {
                status: ValueStatus.Available,
                items: fiveItems,
                offset: 0,
                totalCount: 1,
                hasMoreItems: false,
                version: 1
            }
        };
        expect(render(<Carousel {...props} />).toJSON()).toMatchSnapshot();
    });
});
