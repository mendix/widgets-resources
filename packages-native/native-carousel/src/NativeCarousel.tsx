import { createElement, ReactNode, useCallback, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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

    const customStyles = props.style ? props.style.filter(o => o != null) : [];
    const styles =
        customStyles.length > 0
            ? deepmerge.all<NativeCarouselStyle>([
                  defaultNativeCarouselStyle,
                  ...customStyles,
                  props.layout === "fullScreen" ? defaultNativeCarouselFullWidthStyle : {}
              ])
            : defaultNativeCarouselStyle;

    const onPress = useCallback(() => {
        executeAction(props.onPress);
    }, [props.onPress]);

    const [activeSlide, setActiveSlide] = useState(0);

    const onSnap = useCallback(
        (index: number) => {
            setActiveSlide(index);
            setAttributeValue(props.currentIndex, new Big(index));
        },
        [props.currentIndex]
    );

    const _renderItem = useCallback(
        ({ item, index }: { item: DataSourceItem; index: number }) => {
            return (
                <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    style={styles.slideItem.touchableStyle}
                    onPress={onPress}
                >
                    {props.content(item)}
                </TouchableOpacity>
            );
        },
        [props.content]
    );

    const normalizeLayoutProp = (layout: LayoutEnum): any => {
        return layout === undefined || layout === "fullScreen" || layout === "fullWidth" || layout === "default"
            ? "default"
            : layout;
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
                <View style={styles.pagination.container}>
                    <Text style={styles.pagination.textStyle}>
                        {activeSlide + 1}/{contentLength}
                    </Text>
                </View>
            );
        }
        return (
            <Pagination
                dotsLength={contentLength}
                activeDotIndex={activeSlide}
                containerStyle={styles.pagination.container}
                dotColor={styles.pagination.dotColor}
                dotStyle={styles.pagination.dotStyle}
                inactiveDotColor={styles.pagination.inactiveDotColor}
                inactiveDotOpacity={styles.pagination.inactiveDotOpacity}
                inactiveDotScale={styles.pagination.inactiveDotScale}
                carouselRef={carousel.current}
                tappableDots={!!carousel}
            />
        );
    }, [activeSlide, carousel, props.contentSource, props.showPagination]);

    if (!(props.contentSource && props.contentSource.status === ValueStatus.Available)) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Carousel
                inverted={props.inverted}
                vertical={props.vertical === "vertical"}
                loop={props.loop}
                loopClonesPerSide={props.loopClonesPerSide}
                autoplay={props.autoplay}
                autoplayDelay={props.autoplayDelay !== 0 ? props.autoplayDelay : undefined}
                autoplayInterval={props.autoplayInterval !== 0 ? props.autoplayInterval : undefined}
                enableMomentum={props.enableMomentum}
                lockScrollWhileSnapping={props.lockScrollWhileSnapping}
                enableSnap={props.enableSnap}
                swipeThreshold={props.swipeThreshold !== 0 ? props.swipeThreshold : undefined}
                activeSlideAlignment={props.activeSlideAlignment}
                layout={normalizeLayoutProp(props.layout)}
                layoutCardOffset={props.layoutCardOffset !== 0 ? props.layoutCardOffset : undefined}
                firstItem={toNumber(props.firstItem)}
                data={props.contentSource ? (props.contentSource.value ? props.contentSource.value.items : []) : []}
                renderItem={_renderItem}
                sliderWidth={styles.carousel.sliderWidth}
                sliderHeight={styles.carousel.sliderHeight}
                slideStyle={styles.slideItem.slideStyle}
                itemWidth={styles.slideItem.itemWidth}
                itemHeight={styles.slideItem.itemHeight}
                inactiveSlideScale={styles.carousel.inactiveSlideScale}
                inactiveSlideOpacity={styles.carousel.inactiveSlideOpacity}
                containerCustomStyle={styles.containerCustomStyle}
                contentContainerCustomStyle={styles.sliderContentContainer}
                onSnapToItem={onSnap}
                ref={carousel}
            />
            {renderPagination()}
        </View>
    );
};
