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
    dotStyle?: DotStyle;
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
        }
    }
};
