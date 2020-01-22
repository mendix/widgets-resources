import { TextStyle, ViewStyle } from "react-native";

interface DotStyle {
    container?: ViewStyle;
    opacity?: number;
    scale?: number;
    color?: string;
}

export interface ActiveDotStyle extends ViewStyle, DotStyle {}

interface ContainerStyle extends ViewStyle {
    width?: number;
    height?: number;
}

interface LayoutStyle {
    container?: ViewStyle;
    carousel?: ContainerStyle;
    slideItem?: {
        opacity?: number;
        scale?: number;
    };
    activeSlideItem?: ViewStyle;
    paginationContainer?: ViewStyle;
    paginationText?: TextStyle;
    dotStyle?: ActiveDotStyle;
    activeDotStyle?: ActiveDotStyle;
}

export interface CarouselStyle {
    cardLayout: LayoutStyle;
    fullWidthLayout: LayoutStyle;
}

export const defaultCarouselStyle: CarouselStyle = {
    cardLayout: {
        container: {
            width: "100%"
        },
        activeSlideItem: {
            width: "70%"
        },
        paginationContainer: {
            marginHorizontal: 0
        },
        activeDotStyle: {
            marginHorizontal: 0
        },
        dotStyle: {
            container: {
                marginHorizontal: 0
            },
            marginHorizontal: 0
        }
    },
    fullWidthLayout: {
        container: {
            width: "100%"
        },
        activeSlideItem: {
            width: "100%"
        },
        slideItem: {
            opacity: 1,
            scale: 1
        },
        paginationContainer: {
            marginHorizontal: 0
        },
        activeDotStyle: {
            marginHorizontal: 0
        },
        dotStyle: {
            container: {
                marginHorizontal: 0
            },
            marginHorizontal: 0
        }
    }
};
