import { createElement, Fragment, useCallback, useRef, useState } from "react";
import { ActivityIndicator, LayoutChangeEvent, Text, View } from "react-native";
import { CarouselProps } from "../typings/CarouselProps";
import { ActiveDotStyle, CarouselStyle, defaultCarouselStyle } from "./ui/styles";
import { default as NativeCarousel, Pagination } from "react-native-snap-carousel";
import deepmerge from "deepmerge";
import { ObjectItem, ValueStatus } from "mendix";
import { exclude, only } from "@native-mobile-resources/util-widgets";

export const Carousel = (props: CarouselProps<CarouselStyle>): JSX.Element => {
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

    const renderItem = useCallback(
        ({ item, index }: { item: ObjectItem; index: number }) => {
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

    const renderPagination = useCallback(() => {
        if (!props.showPagination) {
            return null;
        }

        const contentLength = props.contentSource.items!.length;
        const paginationOverflow = contentLength > 5;

        const dotContainerStyle = only<ActiveDotStyle, any>(layoutSpecificStyle.dot!, ["container"]);
        const dotStyle = exclude<ActiveDotStyle, any>(layoutSpecificStyle.dot!, ["container"]);

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
                dotColor={layoutSpecificStyle.activeDot?.color}
                dotStyle={layoutSpecificStyle.activeDot}
                inactiveDotStyle={dotStyle}
                inactiveDotColor={dotStyle?.color}
                inactiveDotOpacity={dotStyle?.opacity}
                inactiveDotScale={dotStyle?.scale}
                carouselRef={carousel.current}
                tappableDots
            />
        );
    }, [activeSlide, carousel.current, props.contentSource, props.showPagination]);

    const getCalculatedWidth = (sizeToCalculate: number): number => {
        if (layoutSpecificStyle.activeSlideItem) {
            const { padding, paddingHorizontal, paddingLeft, paddingRight } = layoutSpecificStyle.activeSlideItem;
            if (padding) {
                return sizeToCalculate - Number(padding) * 2;
            }
            if (paddingHorizontal) {
                return sizeToCalculate - Number(paddingHorizontal) * 2;
            }
            if (paddingLeft) {
                return sizeToCalculate - Number(paddingLeft);
            }
            if (paddingRight) {
                return sizeToCalculate - Number(paddingRight);
            }
        }

        return sizeToCalculate;
    };

    const onLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;

        const realWidth = getCalculatedWidth(width as number);
        const realHeight = height as number;

        let itemWidth = 0;
        let itemHeight = 0;

        if (layoutSpecificStyle.activeSlideItem) {
            const { width: layoutWidth, height: layoutHeight } = layoutSpecificStyle.activeSlideItem;
            // Allow users to set width and height as percentage since lib only accepts numbers
            if (typeof layoutWidth === "string" && layoutWidth.includes("%")) {
                const percentage = +layoutWidth.replace("%", "");
                itemWidth = (realWidth * percentage) / 100;
            }
            if (typeof layoutHeight === "string" && layoutHeight.includes("%")) {
                const percentage = +layoutHeight.replace("%", "");
                itemHeight = (realHeight * percentage) / 100;
            }
        }

        setSliderDimensions({
            slider: { width: realWidth, height: realHeight },
            slide: { width: itemWidth, height: itemHeight }
        });
    };

    return (
        <View style={layoutSpecificStyle.container} onLayout={onLayout}>
            {props.contentSource?.status !== ValueStatus.Available || !props.contentSource.items ? (
                <View style={layoutSpecificStyle.indicator}>
                    <ActivityIndicator color={layoutSpecificStyle.indicator!.indicatorColor} size="large" />
                </View>
            ) : (
                <Fragment>
                    <NativeCarousel
                        loop={props.loop}
                        activeSlideAlignment={props.activeSlideAlignment}
                        layout="default"
                        firstItem={0}
                        data={props.contentSource.items}
                        renderItem={renderItem}
                        sliderWidth={sliderDimensions.slider.width > 0 ? sliderDimensions.slider.width : 1}
                        itemWidth={sliderDimensions.slide.width > 0 ? sliderDimensions.slide.width : 1}
                        inactiveSlideScale={layoutSpecificStyle.slideItem?.scale}
                        inactiveSlideOpacity={layoutSpecificStyle.slideItem?.opacity}
                        onSnapToItem={onSnap}
                        ref={carousel}
                    />
                    {renderPagination()}
                </Fragment>
            )}
        </View>
    );
};
