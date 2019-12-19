import { Style } from "@native-mobile-resources/util-widgets";
import { TextStyle, ViewStyle } from "react-native";

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

export interface NativeCarouselStyle extends Style {
    container: ViewStyle;
    carousel: ContainerStyle;
    inactiveSlideItem: {
        opacity?: number;
        scale?: number;
    };
    slideItem: ViewStyle;
    paginationContainer: ViewStyle;
    paginationText: TextStyle;
    dotStyle: DotStyle;
    activeDotStyle: ActiveDotStyle;
}

export const defaultNativeCarouselStyle: NativeCarouselStyle = {
    container: {
        width: "100%"
    },
    carousel: {},
    slideItem: {
        width: "70%"
    },
    inactiveSlideItem: {
        opacity: 0.7,
        scale: 0.7
    },
    paginationContainer: {},
    paginationText: {},
    dotStyle: {
        color: "gray",
        opacity: 0.4,
        scale: 0.5
    },
    activeDotStyle: {
        color: "black",
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
        width: "100%"
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
