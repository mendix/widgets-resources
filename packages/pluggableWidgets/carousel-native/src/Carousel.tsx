import { createElement, Fragment, ReactElement, useCallback, useEffect, useState } from "react";
import { ActivityIndicator, LayoutChangeEvent, Text, View } from "react-native";
import { CarouselProps } from "../typings/CarouselProps";
import { CarouselStyle, defaultCarouselStyle, LayoutStyle } from "./ui/styles";
import { default as NativeCarousel, Pagination } from "react-native-snap-carousel";
import deepmerge from "deepmerge";
import { ObjectItem, ValueStatus } from "mendix";

export const Carousel = (props: CarouselProps<CarouselStyle>): ReactElement => {
    const [sliderDimensions, setSliderDimensions] = useState({
        slider: { width: 0, height: 0 },
        slide: { width: 0, height: 0 }
    });

    const customStyles = props.style ? props.style.filter(o => o != null) : [];

    const styles = deepmerge.all<CarouselStyle>([defaultCarouselStyle, ...customStyles]);

    const layoutSpecificStyle: LayoutStyle =
        props.layout === "fullWidth" ? styles.fullWidthLayout! : styles.cardLayout!;

    const [carouselRef, setCarouselRef] = useState(undefined);

    const [activeSlide, setActiveSlide] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (props.contentSource?.status === ValueStatus.Available) {
            setLoading(false);
        }
    }, [props.contentSource]);

    const onSnap = useCallback((index: number) => {
        setActiveSlide(index);
    }, []);

    const renderItem = useCallback(({ item, index }: { item: ObjectItem; index: number }) => {
        const viewStyle = layoutSpecificStyle.slideItem;
        if (viewStyle) {
            // We don't want to pass the already processed height to the item container
            delete viewStyle.width;
        }

        return (
            <View key={index} style={{ ...viewStyle }} testID={`${props.name}$content$${index}`} accessible>
                {props.content.get(item)}
            </View>
        );
    }, []);

    const renderPagination = useCallback(() => {
        if (!props.showPagination || carouselRef === undefined) {
            return null;
        }

        const contentLength = props.contentSource.items!.length;
        const paginationOverflow = contentLength > 5;
        const { pagination } = layoutSpecificStyle;

        const a11yProps = { accessibilityLabel: `${props.name}$pagination` };

        if (paginationOverflow) {
            return (
                <View style={pagination.container} testID={`${props.name}$pagination`}>
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
                carouselRef={carouselRef}
                tappableDots
                {...a11yProps}
            />
        );
    }, [activeSlide, carouselRef, props.contentSource, props.showPagination]);

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
        <View style={styles.container} onLayout={onLayout} testID={props.name}>
            {loading ? (
                <ActivityIndicator color={layoutSpecificStyle.indicator!.color} size="large" />
            ) : (
                /* library ignores width/height if its vertical/horizontal */
                sliderDimensions.slide.width > 0 &&
                sliderDimensions.slider.width > 0 &&
                props.contentSource &&
                props.contentSource.items &&
                props.contentSource.items?.length > 0 && (
                    <Fragment>
                        <NativeCarousel
                            testID={`${props.name}$carousel`}
                            activeSlideAlignment={props.activeSlideAlignment}
                            layout="default"
                            firstItem={0}
                            useScrollView
                            enableSnap
                            data={props.contentSource.items}
                            renderItem={renderItem}
                            sliderWidth={sliderDimensions.slider.width}
                            sliderHeight={sliderDimensions.slider.height}
                            itemWidth={sliderDimensions.slide.width}
                            itemHeight={sliderDimensions.slide.height}
                            inactiveSlideScale={layoutSpecificStyle.inactiveSlideItem?.scale}
                            inactiveSlideOpacity={layoutSpecificStyle.inactiveSlideItem?.opacity}
                            onSnapToItem={onSnap}
                            ref={(r: any) => setCarouselRef(r)}
                        />
                        {renderPagination()}
                    </Fragment>
                )
            )}
        </View>
    );
};
