import { ComponentClass, createElement, ReactNode, useCallback, useRef, useState } from "react";
import { LayoutChangeEvent, Platform, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { DataSourceItem, LayoutEnum, NativeCarouselProps } from "../typings/NativeCarouselProps";
import { defaultCarouselStyle, CarouselStyle } from "./styles/styles";
import { toNumber } from "@native-mobile-resources/util-widgets";
import { executeAction, setAttributeValue } from "@widgets-resources/piw-utils";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Big } from "big.js";
import deepmerge from "deepmerge";
import { ValueStatus } from "mendix";

export const NativeCarousel = (props: NativeCarouselProps<CarouselStyle>): ReactNode => {
    const carousel = useRef<any>(null);
    const [sliderDimensions, setSliderDimensions] = useState({
        slider: { width: 0, height: 0 },
        slide: { width: 0, height: 0 }
    });
    const customStyles = props.style ? props.style.filter(o => o != null) : [];

    let styles = deepmerge.all<CarouselStyle>([defaultCarouselStyle, ...customStyles]);

    const layoutSpecificStyle = props.layout === "fullWidth" ? styles.fullWidthLayout : styles.cardLayout;

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
            delete layoutSpecificStyle.activeSlideItem?.width;
            delete layoutSpecificStyle.activeSlideItem?.height;

            const innerContent =
                Platform.OS === "ios" ? (
                    props.content(item)
                ) : (
                    <View style={layoutSpecificStyle.activeSlideItem}>{props.content(item)}</View>
                );

            return (
                <Touchable key={index} activeOpacity={1} style={layoutSpecificStyle.activeSlideItem} onPress={onPress}>
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
                <View style={layoutSpecificStyle.paginationContainer}>
                    <Text style={layoutSpecificStyle.paginationText}>
                        {activeSlide + 1}/{contentLength}
                    </Text>
                </View>
            );
        }
        return (
            <Pagination
                dotsLength={contentLength}
                activeDotIndex={activeSlide}
                containerStyle={layoutSpecificStyle.paginationContainer}
                dotColor={layoutSpecificStyle.activeDotStyle?.color}
                dotStyle={layoutSpecificStyle.activeDotStyle}
                inactiveDotColor={layoutSpecificStyle.dotStyle?.color}
                inactiveDotOpacity={layoutSpecificStyle.dotStyle?.opacity}
                inactiveDotScale={layoutSpecificStyle.dotStyle?.scale}
                carouselRef={carousel.current}
                tappableDots={!!carousel}
            />
        );
    }, [activeSlide, carousel, props.contentSource, props.showPagination]);

    if (!(props.contentSource?.status === ValueStatus.Available)) {
        return null;
    }

    const getPaddingCalculatedValue = (sizeToCalculate: number): number => {
        if (layoutSpecificStyle.activeSlideItem?.padding !== undefined) {
            return sizeToCalculate - Number(layoutSpecificStyle.activeSlideItem.padding) * 2;
        } else if (layoutSpecificStyle.activeSlideItem?.paddingHorizontal !== undefined) {
            return sizeToCalculate - Number(layoutSpecificStyle.activeSlideItem.paddingHorizontal) * 2;
        } else if (layoutSpecificStyle.activeSlideItem?.paddingLeft !== undefined) {
            return sizeToCalculate - Number(layoutSpecificStyle.activeSlideItem.paddingLeft);
        } else if (layoutSpecificStyle.activeSlideItem?.paddingRight !== undefined) {
            return sizeToCalculate - Number(layoutSpecificStyle.activeSlideItem.paddingRight);
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
        if (
            typeof layoutSpecificStyle.activeSlideItem?.width === "string" &&
            layoutSpecificStyle.activeSlideItem.width.includes("%")
        ) {
            const percentage = +layoutSpecificStyle.activeSlideItem.width.split("%")[0];
            itemWidth = Math.round((realWidth * percentage) / 100);
        }
        if (
            typeof layoutSpecificStyle.activeSlideItem?.height === "string" &&
            layoutSpecificStyle.activeSlideItem.height.includes("%")
        ) {
            const percentage = +layoutSpecificStyle.activeSlideItem.height.split("%")[0];
            itemHeight = Math.round((realHeight * percentage) / 100);
        }
        setSliderDimensions({
            slider: { width: realWidth, height: realHeight },
            slide: { width: itemWidth, height: itemHeight }
        });
    };

    return (
        <View style={layoutSpecificStyle.container} onLayout={onLayout}>
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
                    itemWidth={sliderDimensions.slide.width > 0 ? sliderDimensions.slide.width : 1}
                    inactiveSlideScale={layoutSpecificStyle.slideItem?.scale}
                    inactiveSlideOpacity={layoutSpecificStyle.slideItem?.opacity}
                    onSnapToItem={onSnap}
                    ref={carousel}
                />
            )}
            {renderPagination()}
        </View>
    );
};
