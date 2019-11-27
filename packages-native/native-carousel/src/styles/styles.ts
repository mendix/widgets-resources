import { Style } from "@native-mobile-resources/util-widgets";
import { Dimensions, Platform, ViewStyle, StyleSheet } from "react-native";

const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

function wp(percentage: number) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

export const slideHeight = viewportHeight * 0.36;
export const slideWidth = wp(100);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = wp(80);

const entryBorderRadius = 8;

export interface NativeCarouselStyle extends Style {
    container: ViewStyle;
}

export interface DotStyle extends ViewStyle {
    color: string;
}

export interface Pagination extends Style {
    container: ViewStyle;
    paginationContainer: ViewStyle;
    dotStyle: DotStyle;
    activeDotStyle: DotStyle;
}

export const defaultNativeCarouselEntryStyle: any = {
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    shadow: {
        position: "absolute",
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: "white",
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    imageContainerEven: {
        backgroundColor: "black"
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: "cover",
        borderRadius: IS_IOS ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: "white"
    },
    radiusMaskEven: {
        backgroundColor: "black"
    },
    textContainer: {
        justifyContent: "center",
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: "white",
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
        backgroundColor: "black"
    },
    title: {
        color: "black",
        fontSize: 13,
        fontWeight: "bold",
        letterSpacing: 0.5
    },
    titleEven: {
        color: "white"
    },
    subtitle: {
        marginTop: 6,
        color: "gray",
        fontSize: 12,
        fontStyle: "italic"
    },
    subtitleEven: {
        color: "rgba(255, 255, 255, 0.7)"
    }
};

export const defaultNativeCarouselStyle: any = {
    slider: {
        marginTop: 15,
        backgroundColor: "red",
        overflow: "visible" // for custom animations
    },
    sliderContentContainer: {
        backgroundColor: "green",
        paddingVertical: 10 // for custom animation
    },
    exampleContainer: {
        paddingVertical: 30
    }
};
