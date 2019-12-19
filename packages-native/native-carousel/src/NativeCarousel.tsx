import { ComponentClass, createElement, ReactNode, useCallback, useRef, useState } from "react";
import { LayoutChangeEvent, Platform, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
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
    const [sliderDimensions, setSliderDimensions] = useState({
        slider: { width: 0, height: 0 },
        slideItem: { width: 0, height: 0 }
    });
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
            // We dont want to pass already processed item width and height to the touchable
            delete styles.slideItem.width;
            delete styles.slideItem.height;

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

    if (!(props.contentSource?.status === ValueStatus.Available)) {
        return null;
    }

    const getPaddingCalculatedValue = (sizeToCalculate: number): number => {
        if (styles.slideItem?.padding !== undefined) {
            return sizeToCalculate - Number(styles.slideItem.padding) * 2;
        } else if (styles.slideItem?.paddingHorizontal !== undefined) {
            return sizeToCalculate - Number(styles.slideItem.paddingHorizontal) * 2;
        } else if (styles.slideItem?.paddingLeft !== undefined) {
            return sizeToCalculate - Number(styles.slideItem.paddingLeft);
        } else if (styles.slideItem?.paddingRight !== undefined) {
            return sizeToCalculate - Number(styles.slideItem.paddingRight);
        }
        return sizeToCalculate;
    };

    const onLayout = (event: LayoutChangeEvent) => {
        // Slider dimensions will be always as big as the view around it
        // Item dimensions will be calculated from values slideItem.width + height
        const realWidth = getPaddingCalculatedValue(event.nativeEvent.layout.width as number);
        const realHeight = event.nativeEvent.layout.height as number;

        let itemWidth = 0;
        let itemHeight = 0;
        if (typeof styles.slideItem?.width === "string" && styles.slideItem.width.includes("%")) {
            const percentage = +styles.slideItem.width.split("%")[0];
            itemWidth = Math.round((realWidth * percentage) / 100);
        }
        if (typeof styles.slideItem?.height === "string" && styles.slideItem.height.includes("%")) {
            const percentage = +styles.slideItem.height.split("%")[0];
            itemHeight = Math.round((realHeight * percentage) / 100);
        }
        setSliderDimensions({
            slider: { width: realWidth, height: realHeight },
            slideItem: { width: itemWidth, height: itemHeight }
        });
    };

    return (
        <View style={styles.container} onLayout={onLayout}>
            {sliderDimensions.slider.width > 0 && (
                <Carousel
                    loop={props.loop}
                    autoplay={props.autoplay}
                    autoplayDelay={props.autoplayDelay !== 0 ? props.autoplayDelay : undefined}
                    autoplayInterval={props.autoplayInterval !== 0 ? props.autoplayInterval : undefined}
                    activeSlideAlignment={props.activeSlideAlignment}
                    layout={normalizeLayoutProp(props.layout)}
                    firstItem={toNumber(props.firstItem)}
                    data={props.contentSource.value.items}
                    renderItem={_renderItem}
                    sliderWidth={sliderDimensions.slider.width > 0 ? sliderDimensions.slider.width : 1}
                    itemWidth={sliderDimensions.slideItem.width > 0 ? sliderDimensions.slideItem.width : 1}
                    inactiveSlideScale={styles.inactiveSlideItem.scale}
                    inactiveSlideOpacity={styles.inactiveSlideItem.opacity}
                    onSnapToItem={onSnap}
                    ref={carousel}
                />
            )}
            {renderPagination()}
        </View>
    );
};
