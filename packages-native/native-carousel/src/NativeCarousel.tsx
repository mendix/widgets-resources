import { createElement, ReactNode, useCallback, useRef, useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";
import { DataSourceItem, LayoutEnum, NativeCarouselProps } from "../typings/NativeCarouselProps";
import { ActiveDotStyle, CarouselStyle, defaultCarouselStyle } from "./styles/styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import deepmerge from "deepmerge";
import { ValueStatus } from "mendix";
import { exclude, only } from "@native-mobile-resources/util-widgets";

export const NativeCarousel = (props: NativeCarouselProps<CarouselStyle>): ReactNode => {
    const carousel = useRef<any>(null);
    const [sliderDimensions, setSliderDimensions] = useState({
        slider: { width: 0, height: 0 },
        slide: { width: 0, height: 0 }
    });
    const customStyles = props.style ? props.style.filter(o => o != null) : [];

    const styles = deepmerge.all<CarouselStyle>([defaultCarouselStyle, ...customStyles]);

    const layoutSpecificStyle = props.layout === "fullWidth" ? styles.fullWidthLayout : styles.cardLayout;

    const [activeSlide, setActiveSlide] = useState(0);

    const onSnap = useCallback((index: number) => {
        setActiveSlide(index);
    }, []);

    const _renderItem = useCallback(
        ({ item, index }: { item: DataSourceItem; index: number }) => {
            if (layoutSpecificStyle.activeSlideItem) {
                delete layoutSpecificStyle.activeSlideItem.width;
                delete layoutSpecificStyle.activeSlideItem.height;
            }
            return (
                <View key={index} style={{ ...layoutSpecificStyle.activeSlideItem }}>
                    {props.content(item)}
                </View>
            );
        },
        [props.content]
    );

    const normalizeLayoutProp = (layout: LayoutEnum): any => {
        return layout === undefined || layout === "fullWidth" || layout === "card" ? "default" : layout;
    };

    const renderPagination = useCallback(() => {
        const contentLength = props.contentSource.items.length;
        const paginationOverflow = contentLength > 5;

        const dotContainerStyle = only<ActiveDotStyle, any>(layoutSpecificStyle.dotStyle!, ["container"]);
        const dotStyle = exclude<ActiveDotStyle, any>(layoutSpecificStyle.dotStyle!, ["container"]);

        if (!props.showPagination) {
            return null;
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
                dotContainerStyle={dotContainerStyle?.container}
                dotColor={layoutSpecificStyle.activeDotStyle?.color}
                dotStyle={layoutSpecificStyle.activeDotStyle}
                inactiveDotStyle={dotStyle}
                inactiveDotColor={dotStyle?.color}
                inactiveDotOpacity={dotStyle?.opacity}
                inactiveDotScale={dotStyle?.scale}
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
                    activeSlideAlignment={props.activeSlideAlignment}
                    layout={normalizeLayoutProp(props.layout)}
                    firstItem={0}
                    data={props.contentSource.items}
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
