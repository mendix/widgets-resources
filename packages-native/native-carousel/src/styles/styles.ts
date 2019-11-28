import { Style } from "@native-mobile-resources/util-widgets";
import { Dimensions, TextStyle, ViewStyle } from "react-native";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

function wp(percentage: number) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

export interface NativeCarouselStyle extends Style {
    container: ViewStyle;
    carousel: {
        /**
         * Width in pixels of your slider
         * Note: Required with horizontal carousel
         */
        sliderWidth?: number;
        /**
         * Height in pixels of the carousel itself
         * Note: Required with vertical carousel
         */
        sliderHeight?: number;
        /**
         * Optional styles for Scrollview's global wrapper
         */
        containerCustomStyle?: ViewStyle;
        /**
         * Optional styles for Scrollview's items container
         */
        contentContainerCustomStyle?: ViewStyle;
        /**
         * Value of the opacity effect applied to inactive slides
         */
        inactiveSlideOpacity?: number;
        /**
         * Value of the 'scale' transform applied to inactive slides
         */
        inactiveSlideScale?: number;
    };
    slideItem: {
        /**
         * Optional style for each item's container (the one whose scale and opacity are animated)
         */
        slideStyle?: ViewStyle;
        /**
         * Width in pixels of your slides, must be the same for all of them
         * Note: Required with horizontal carousel
         */
        itemWidth?: number;
        /**
         * Height in pixels of carousel's items, must be the same for all of them
         * Note: Required with vertical carousel
         */
        itemHeight?: number;

        touchableStyle?: ViewStyle;
    };
    pagination: {
        container?: ViewStyle;
        dotColor?: string;
        dotStyle?: ViewStyle;
        inactiveDotColor?: string;
        inactiveDotOpacity?: number;
        inactiveDotScale?: number;
        textStyle?: TextStyle;
    };
}

export const defaultNativeCarouselStyle: NativeCarouselStyle = {
    container: {},
    carousel: {
        containerCustomStyle: {},
        contentContainerCustomStyle: {},
        sliderWidth: viewportWidth,
        sliderHeight: viewportHeight,
        inactiveSlideOpacity: 0.7,
        inactiveSlideScale: 0.9
    },
    slideItem: {
        slideStyle: {},
        itemWidth: wp(80),
        itemHeight: wp(80),
        touchableStyle: {
            width: wp(80),
            height: viewportHeight * 0.36,
            paddingHorizontal: wp(2),
            paddingBottom: 18
        }
    },
    pagination: {
        container: {},
        dotColor: "black",
        dotStyle: {},
        inactiveDotColor: "gray",
        inactiveDotOpacity: 0.4,
        inactiveDotScale: 0.6
    }
};

export const defaultNativeCarouselFullWidthStyle: NativeCarouselStyle = {
    container: {},
    carousel: {
        inactiveSlideScale: 1.0
    },
    slideItem: {
        itemWidth: wp(100),
        itemHeight: wp(100),
        touchableStyle: {
            width: wp(100)
        }
    },
    pagination: {}
};
