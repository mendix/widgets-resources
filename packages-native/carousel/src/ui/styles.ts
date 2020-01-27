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

interface LoadingIndicatorStyle extends ViewStyle {
    indicatorColor?: string;
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
    dot?: ActiveDotStyle;
    activeDot?: ActiveDotStyle;
    indicator?: LoadingIndicatorStyle;
}

export interface CarouselStyle {
    cardLayout: LayoutStyle;
    fullWidthLayout: LayoutStyle;
}

const sharedStyles: LayoutStyle = {
    container: {
        width: "100%"
    },
    paginationContainer: {
        paddingHorizontal: 0,
        paddingVertical: 0
    },
    activeDot: {
        marginHorizontal: 0
    },
    dot: {
        container: {
            marginHorizontal: 0
        },
        marginHorizontal: 0
    },
    indicator: {
        width: "100%",
        indicatorColor: "blue"
    }
};

export const defaultCarouselStyle: CarouselStyle = {
    cardLayout: {
        ...sharedStyles,
        activeSlideItem: {
            width: "50%"
        }
    },
    fullWidthLayout: {
        ...sharedStyles,
        activeSlideItem: {
            width: "100%"
        },
        slideItem: {
            opacity: 1,
            scale: 1
        }
    }
};
