import { TextStyle, ViewStyle } from "react-native";

export interface InactiveDotStyle extends DotStyle {
    opacity?: number;
    scale?: number;
}

export interface DotStyle extends ViewStyle {
    color?: string;
}

export interface InactiveSlideStyle {
    opacity?: number;
    scale?: number;
}

export interface LayoutStyle {
    slideItem?: ViewStyle;
    inactiveSlideItem?: InactiveSlideStyle;
    pagination: {
        container?: ViewStyle;
        text?: TextStyle;
        inactiveDotStyle?: InactiveDotStyle;
        dotStyle?: DotStyle;
        dotContainerStyle?: ViewStyle;
    };
    indicator?: {
        color?: string;
    };
}

export interface CarouselStyle {
    container?: ViewStyle;
    cardLayout?: LayoutStyle;
    fullWidthLayout?: LayoutStyle;
}

const sharedStyles: LayoutStyle = {
    pagination: {
        container: {
            paddingHorizontal: 0,
            paddingVertical: 0
        },
        dotStyle: {
            marginHorizontal: 0
        },
        inactiveDotStyle: {
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
    container: {
        width: "100%"
    },
    cardLayout: {
        ...sharedStyles,
        slideItem: {
            width: "70%",
            height: "100%"
        }
    },
    fullWidthLayout: {
        ...sharedStyles,
        slideItem: {
            width: "100%",
            height: "100%"
        },
        inactiveSlideItem: {
            opacity: 1,
            scale: 1
        }
    }
};
