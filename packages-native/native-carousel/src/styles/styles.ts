import { Style } from "@native-mobile-resources/util-widgets";
import { Dimensions, TextStyle, ViewStyle } from "react-native";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

interface DotStyle {
    opacity?: number;
    scale?: number;
    color?: string;
}

interface ActiveDotStyle extends ViewStyle, DotStyle {}

interface ContainerStyle extends ViewStyle {
    width?: number;
    height?: number;
}

interface SlideStyle extends ViewStyle {
    width?: number | string;
    height?: number | string;
}

export interface NativeCarouselStyle extends Style {
    container: ViewStyle;
    carousel: ContainerStyle;
    inactiveSlideItem: {
        opacity?: number;
        scale?: number;
    };
    slideItemContainer: SlideStyle;
    slideItem: ViewStyle;
    paginationContainer: ViewStyle;
    paginationText: TextStyle;
    dotStyle: DotStyle;
    activeDotStyle: ActiveDotStyle;
}

export const defaultNativeCarouselStyle: NativeCarouselStyle = {
    container: {},
    carousel: {
        width: viewportWidth,
        height: viewportHeight
    },
    slideItemContainer: {
        width: viewportWidth * 0.8,
        // Should accept a percentage and get the coraousels' actual height /width and do the calculation
        height: viewportWidth * 0.8
    },
    slideItem: {
        width: "100%"
    },
    inactiveSlideItem: {
        opacity: 0.7,
        scale: 0.7
    },
    paginationContainer: {},
    paginationText: {},
    dotStyle: {
        opacity: 0.4,
        scale: 0.5
    },
    activeDotStyle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
};

export const defaultNativeCarouselFullWidthStyle: NativeCarouselStyle = {
    container: {},
    carousel: {},
    slideItemContainer: {
        width: viewportWidth
    },
    slideItem: {
        width: viewportWidth
    },
    pagination: {},
    inactiveSlideItem: {
        opacity: 1,
        scale: 1
    },
    paginationContainer: {},
    paginationText: {},
    dotStyle: {},
    activeDotStyle: {}
};
