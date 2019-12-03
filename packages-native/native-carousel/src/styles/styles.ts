import { Style } from "@native-mobile-resources/util-widgets";
import { Dimensions, TextStyle, ViewStyle } from "react-native";

const { width: viewportWidth, height: viewportHeigth } = Dimensions.get("window");

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
    width?: number;
    height?: number;
}

export interface NativeCarouselStyle extends Style {
    container: ViewStyle;
    carousel: ContainerStyle;
    inactiveSlideItem: {
        opacity?: number;
        scale?: number;
    };
    slideItem: SlideStyle;
    paginationContainer: ViewStyle;
    paginationText: TextStyle;
    dotStyle: DotStyle;
    activeDotStyle: ActiveDotStyle;
}

export const defaultNativeCarouselStyle: NativeCarouselStyle = {
    container: {},
    carousel: {
        width: viewportWidth,
        height: viewportHeigth
    },
    slideItem: {
        width: viewportHeigth * 0.8,
        height: viewportHeigth * 0.8
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
    slideItem: {
        width: viewportHeigth
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
