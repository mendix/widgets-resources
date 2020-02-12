import { createElement, Fragment, useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, LayoutChangeEvent, Text, View } from "react-native";
import { CarouselProps } from "../typings/CarouselProps";
import { CarouselStyle, defaultCarouselStyle, LayoutStyle } from "./ui/styles";
import { default as NativeCarousel, Pagination } from "react-native-snap-carousel";
import deepmerge from "deepmerge";
import { ObjectItem, ValueStatus } from "mendix";

export const Carousel = (props: CarouselProps<CarouselStyle>): JSX.Element => {
    const carousel = useRef<any>(null);
    const [sliderDimensions, setSliderDimensions] = useState({
        slider: { width: 0, height: 0 },
        slide: { width: 0, height: 0 }
    });

    const customStyles = props.style ? props.style.filter(o => o != null) : [];

    const styles = deepmerge.all<CarouselStyle>([defaultCarouselStyle, ...customStyles]);

    const layoutSpecificStyle: LayoutStyle =
        props.layout === "fullWidth" ? styles.fullWidthLayout! : styles.cardLayout!;

    const [activeSlide, setActiveSlide] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (
            props.contentSource?.status === ValueStatus.Available &&
            props.contentSource.items?.length &&
            props.contentSource.items.length > 0
        ) {
            setLoading(false);
        }
    }, [props.contentSource]);

    const onSnap = useCallback((index: number) => {
        setActiveSlide(index);
    }, []);

    const renderItem = useCallback(
        ({ item, index }: { item: ObjectItem; index: number }) => {
            if (layoutSpecificStyle.slideItem) {
                delete layoutSpecificStyle.slideItem.width;
                delete layoutSpecificStyle.slideItem.height;
            }
            return (
                <View key={index} style={{ ...layoutSpecificStyle.slideItem }}>
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
        const { pagination } = layoutSpecificStyle;

        if (paginationOverflow) {
            return (
                <View style={pagination.container}>
                    <Text style={pagination.text}>
                        {activeSlide + 1}/{contentLength}
                    </Text>
                </View>
            );
        }

        return (
            <Pagination
                dotsLength={contentLength}
                activeDotIndex={activeSlide}
                containerStyle={pagination.container}
                dotContainerStyle={pagination.dotContainerStyle}
                dotColor={pagination.dotStyle?.color}
                dotStyle={pagination.dotStyle}
                inactiveDotStyle={pagination.inactiveDotStyle}
                inactiveDotColor={pagination.inactiveDotStyle?.color}
                inactiveDotOpacity={pagination.inactiveDotStyle?.opacity}
                inactiveDotScale={pagination.inactiveDotStyle?.scale}
                carouselRef={carousel.current}
                tappableDots
            />
        );
    }, [activeSlide, carousel.current, props.contentSource, props.showPagination]);

    const getCalculatedWidth = (sizeToCalculate: number): number => {
        if (layoutSpecificStyle.slideItem) {
            const { padding, paddingHorizontal, paddingLeft, paddingRight } = layoutSpecificStyle.slideItem;
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

        if (layoutSpecificStyle.slideItem) {
            const { width: layoutWidth, height: layoutHeight } = layoutSpecificStyle.slideItem;
            // Allow users to set width and height as percentage since lib only accepts numbers
            if (typeof layoutWidth === "string" && layoutWidth.includes("%")) {
                const percentage = +layoutWidth.replace("%", "");
                itemWidth = (realWidth * percentage) / 100;
            } else {
                itemWidth = Number(layoutWidth);
            }
            if (typeof layoutHeight === "string" && layoutHeight.includes("%")) {
                const percentage = +layoutHeight.replace("%", "");
                itemHeight = (realHeight * percentage) / 100;
            } else {
                itemHeight = Number(layoutHeight);
            }
        }

        setSliderDimensions({
            slider: { width: realWidth, height: realHeight },
            slide: { width: itemWidth, height: itemHeight }
        });
    };

    return (
        <View style={styles.container} onLayout={onLayout}>
            {loading ? (
                <ActivityIndicator color={layoutSpecificStyle.indicator!.color} size="large" />
            ) : (
                sliderDimensions.slide.width > 0 &&
                sliderDimensions.slider.width > 0 && (
                    <Fragment>
                        <NativeCarousel
                            loop={props.loop}
                            activeSlideAlignment={props.activeSlideAlignment}
                            layout="default"
                            firstItem={0}
                            initialNumToRender={props.contentSource.items?.length}
                            data={props.contentSource.items ?? []}
                            renderItem={renderItem}
                            sliderWidth={sliderDimensions.slider.width}
                            itemWidth={sliderDimensions.slide.width}
                            inactiveSlideScale={layoutSpecificStyle.inactiveSlideItem?.scale}
                            inactiveSlideOpacity={layoutSpecificStyle.inactiveSlideItem?.opacity}
                            onSnapToItem={onSnap}
                            ref={carousel}
                        />
                        {renderPagination()}
                    </Fragment>
                )
            )}
        </View>
    );
};
