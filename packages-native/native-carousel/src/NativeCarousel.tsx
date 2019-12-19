import { ComponentClass, createElement, ReactNode, useCallback, useRef, useState } from "react";
import { Platform, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { DataSourceItem, LayoutEnum, NativeCarouselProps } from "../typings/NativeCarouselProps";
import { defaultNativeCarouselFullWidthStyle, defaultNativeCarouselStyle, NativeCarouselStyle } from "./styles/styles";
import { toNumber } from "@native-mobile-resources/util-widgets";
import { executeAction, setAttributeValue } from "@widgets-resources/piw-utils";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Big } from "big.js";
import deepmerge from "deepmerge";
import { ValueStatus } from "mendix";

export const NativeCarousel = (props: NativeCarouselProps<NativeCarouselStyle>): ReactNode => {
    const carousel = useRef<any>(null);
    const [slideItemContainerDimensions, setSlideItemContainerDimensions] = useState({ width: 0, height: 0 });
    const customStyles = props.style ? props.style.filter(o => o != null) : [];

    const styles = deepmerge.all<NativeCarouselStyle>([
        defaultNativeCarouselStyle,
        ...customStyles,
        props.layout === "fullWidth" ? defaultNativeCarouselFullWidthStyle : {}
    ]);

    const onPress = useCallback(() => {
        executeAction(props.onPress);
    }, [props.onPress]);

    const [activeSlide, setActiveSlide] = useState(0);

    const onSnap = useCallback(
        (index: number) => {
            setActiveSlide(index);
            setAttributeValue(props.currentIndex, new Big(index));
            executeAction(props.onSnap);
        },
        [props.currentIndex, props.onSnap]
    );

    const _renderItem = useCallback(
        ({ item, index }: { item: DataSourceItem; index: number }) => {
            const Touchable: ComponentClass<any> = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;
            // Touchable styles are ignored if android
            const innerContent =
                Platform.OS === "ios" ? (
                    props.content(item)
                ) : (
                    <View style={styles.slideItem}>{props.content(item)}</View>
                );
            return (
                <Touchable key={index} activeOpacity={1} style={styles.slideItem} onPress={onPress}>
                    {innerContent}
                </Touchable>
            );
        },
        [props.content]
    );

    const normalizeLayoutProp = (layout: LayoutEnum): any => {
        return layout === undefined || layout === "fullWidth" || layout === "card" ? "default" : layout;
    };

    const renderPagination = useCallback(() => {
        const contentLength =
            props.contentSource && props.contentSource.value ? props.contentSource.value.items.length : 0;
        const paginationOverflow = contentLength > 5;

        if (!props.showPagination) {
            return undefined;
        }
        if (paginationOverflow) {
            return (
                <View style={styles.paginationContainer}>
                    <Text style={styles.paginationText}>
                        {activeSlide + 1}/{contentLength}
                    </Text>
                </View>
            );
        }
        return (
            <Pagination
                dotsLength={contentLength}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotColor={styles.activeDotStyle.color}
                dotStyle={styles.activeDotStyle}
                inactiveDotColor={styles.dotStyle.color}
                inactiveDotOpacity={styles.dotStyle.opacity}
                inactiveDotScale={styles.dotStyle.scale}
                carouselRef={carousel.current}
                tappableDots={!!carousel}
            />
        );
    }, [activeSlide, carousel, props.contentSource, props.showPagination]);

    if (!(props.contentSource && props.contentSource.status === ValueStatus.Available)) {
        return null;
    }

    const onLayout = (event: any) => {
        let realWidth = event.nativeEvent.layout.width as number;
        let realHeight = event.nativeEvent.layout.height as number;
        if (typeof styles.slideItemContainer?.width === "string" && styles.slideItemContainer.width.includes("%")) {
            const percentage = +styles.slideItemContainer.width.split("%")[0];
            realWidth = Math.round((realWidth * percentage) / 100);
        }
        if (typeof styles.slideItemContainer?.height === "string" && styles.slideItemContainer.height.includes("%")) {
            const percentage = +styles.slideItemContainer.height.split("%")[0];
            realHeight = Math.round((realHeight * percentage) / 100);
        }
        setSlideItemContainerDimensions({ width: realWidth, height: realHeight });
    };

    console.warn(slideItemContainerDimensions);

    return (
        <View style={styles.container} onLayout={onLayout}>
            <Carousel
                loop={props.loop}
                autoplay={props.autoplay}
                autoplayDelay={props.autoplayDelay !== 0 ? props.autoplayDelay : undefined}
                autoplayInterval={props.autoplayInterval !== 0 ? props.autoplayInterval : undefined}
                activeSlideAlignment={props.activeSlideAlignment}
                layout={normalizeLayoutProp(props.layout)}
                firstItem={toNumber(props.firstItem)}
                data={props.contentSource ? (props.contentSource.value ? props.contentSource.value.items : []) : []}
                renderItem={_renderItem}
                sliderWidth={styles.carousel.width}
                sliderHeight={styles.carousel.height}
                itemWidth={slideItemContainerDimensions.width}
                inactiveSlideScale={styles.inactiveSlideItem.scale}
                inactiveSlideOpacity={styles.inactiveSlideItem.opacity}
                onSnapToItem={onSnap}
                ref={carousel}
            />
            {renderPagination()}
        </View>
    );
};
