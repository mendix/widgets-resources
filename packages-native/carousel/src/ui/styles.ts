import { TextStyle, ViewStyle } from "react-native";

export interface DotStyle extends ViewStyle {
    inactiveOpacity?: number;
    inactiveScale?: number;
    inactiveColor?: string;
}

export interface ActiveDotStyle extends ViewStyle {
    color?: string;
}

export interface SlideStyle extends ViewStyle {
    inactiveSlideOpacity?: number;
    inactiveSlideScale?: number;
}

interface LayoutStyle {
    container?: ViewStyle;
    slideItem?: SlideStyle;
    pagination: {
        container?: ViewStyle;
        text?: TextStyle;
        dotStyle?: DotStyle;
        activeDotStyle?: ActiveDotStyle;
        dotContainerStyle?: ViewStyle;
    };
    indicator?: {
        color?: string;
    };
}

export interface CarouselStyle {
    cardLayout: LayoutStyle;
    fullWidthLayout: LayoutStyle;
}

const sharedStyles: LayoutStyle = {
    container: {
        width: "100%"
    },
    pagination: {
        container: {
            paddingHorizontal: 0,
            paddingVertical: 0
        },
        activeDotStyle: {
            marginHorizontal: 0
        },
        dotStyle: {
            marginHorizontal: 0
        },
        dotContainerStyle: {
            marginHorizontal: 0
        }
    },
    indicator: {
        color: "blue"
    }
};

export const defaultCarouselStyle: CarouselStyle = {
    cardLayout: {
        ...sharedStyles,
        slideItem: {
            width: "50%"
        }
    },
    fullWidthLayout: {
        ...sharedStyles,
        slideItem: {
            width: "100%",
            inactiveSlideOpacity: 1,
            inactiveSlideScale: 1
        }
    }
};
