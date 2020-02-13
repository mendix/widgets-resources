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

    const renderItem = ({ item, index }: { item: ObjectItem; index: number }) => {
        return (
            <View key={index} style={{ ...layoutSpecificStyle.slideItem }}>
                {props.content(item)}
            </View>
        );
    };

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

    const onLayout = (event: LayoutChangeEvent) => {
        let viewHeight = event.nativeEvent.layout.height;
        const viewWidth = event.nativeEvent.layout.width;

        let itemWidth = 0;
        let itemHeight = 0;

        if (layoutSpecificStyle.slideItem) {
            const { width: slideItemWidth, height: slideItemHeight } = layoutSpecificStyle.slideItem;
            // We calculate the actual number value in order to
            // allow users to set width and height as percentage since lib only accepts numbers

            if (typeof slideItemWidth === "string" && slideItemWidth.includes("%")) {
                const percentage = +slideItemWidth.replace("%", "");
                itemWidth = (viewWidth * percentage) / 100;
            } else {
                itemWidth = Number(slideItemWidth);
            }
            if (typeof slideItemHeight === "string" && slideItemHeight.includes("%")) {
                const percentage = +slideItemHeight.replace("%", "");
                itemHeight = (viewWidth * percentage) / 100;
            } else {
                itemHeight = Number(slideItemHeight);
            }

            // We don't want to pass the already processed height to the item container
            delete layoutSpecificStyle.slideItem.height;

            if (styles.container?.height === undefined && itemHeight > 0) {
                viewHeight = itemHeight;
            }
        }

        setSliderDimensions({
            slider: { width: viewWidth, height: viewHeight },
            slide: { width: itemWidth, height: itemHeight }
        });
    };

    return (
        <View style={styles.container} onLayout={onLayout}>
            {loading ? (
                <ActivityIndicator color={layoutSpecificStyle.indicator!.color} size="large" />
            ) : (
                /* library ignores width/height if its vertical/horizontal */
                sliderDimensions.slide.width > 0 &&
                sliderDimensions.slider.width > 0 && (
                    <Fragment>
                        <NativeCarousel
                            loop={props.loop}
                            useScrollView
                            activeSlideAlignment={props.activeSlideAlignment}
                            layout="default"
                            firstItem={0}
                            initialNumToRender={props.contentSource.items?.length}
                            data={props.contentSource.items ?? []}
                            renderItem={renderItem}
                            sliderWidth={sliderDimensions.slider.width}
                            sliderHeight={sliderDimensions.slider.height}
                            itemWidth={sliderDimensions.slide.width}
                            itemHeight={sliderDimensions.slide.height}
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
