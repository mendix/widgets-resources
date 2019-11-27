import { createElement, ReactElement, ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import { NativeCarouselProps } from "../typings/NativeCarouselProps";
import {
    defaultNativeCarouselEntryStyle,
    defaultNativeCarouselStyle,
    itemWidth,
    NativeCarouselStyle,
    slideHeight,
    slideWidth
} from "./styles/styles";
import { flattenStyles, toNumber } from "@native-mobile-resources/util-widgets";
import Carousel from "react-native-snap-carousel";

export const NativeCarousel = (props: NativeCarouselProps<NativeCarouselStyle>): ReactElement => {
    const styles = flattenStyles(defaultNativeCarouselStyle, props.style);
    // TODO: entry styles also should be customizable but how ?
    const entryStyles = flattenStyles(defaultNativeCarouselEntryStyle, props.style);
    // const entries = [
    //     {
    //         title: "Beautiful and dramatic Antelope Canyon",
    //         subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    //         illustration: "https://i.imgur.com/UYiroysl.jpg"
    //     },
    //     {
    //         title: "Earlier this morning, NYC",
    //         subtitle: "Lorem ipsum dolor sit amet",
    //         illustration: "https://i.imgur.com/UPrs1EWl.jpg"
    //     },
    //     {
    //         title: "White Pocket Sunset",
    //         subtitle: "Lorem ipsum dolor sit amet et nuncat ",
    //         illustration: "https://i.imgur.com/MABUbpDl.jpg"
    //     },
    //     {
    //         title: "Acrocorinth, Greece",
    //         subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    //         illustration: "https://i.imgur.com/KZsmUi2l.jpg"
    //     },
    //     {
    //         title: "The lone tree, majestic landscape of New Zealand",
    //         subtitle: "Lorem ipsum dolor sit amet",
    //         illustration: "https://i.imgur.com/2nCt3Sbl.jpg"
    //     },
    //     {
    //         title: "Middle Earth, Germany",
    //         subtitle: "Lorem ipsum dolor sit amet",
    //         illustration: "https://i.imgur.com/lceHsT6l.jpg"
    //     }
    // ];

    // @ts-ignore
    const _renderItem = ({ item, index }): ReactNode => {
        return (
            <TouchableOpacity
                key={index}
                activeOpacity={1}
                style={entryStyles.slideInnerContainer}
                onPress={() => {
                    alert(`You've clicked '${item.title}'`);
                }}
            >
                {props.content(item)}
                {/* <View style={entryStyles.imageContainer}>*/}
                {/*    <Image source={{ uri: item.illustration }} style={entryStyles.image} />*/}
                {/*    <View style={entryStyles.radiusMask} />*/}
                {/* </View>*/}
                {/* <View style={entryStyles.textContainer}>*/}
                {/*    <Text style={entryStyles.subtitle} numberOfLines={2}>*/}
                {/*        {item.title}*/}
                {/*        {item.subtitle}*/}
                {/*    </Text>*/}
                {/* </View>*/}
            </TouchableOpacity>
        );
    };

    console.warn("rerendered");

    return (
        <View style={styles.exampleContainer}>
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
                layout={props.layout}
                layoutCardOffset={props.layoutCardOffset !== 0 ? props.layoutCardOffset : undefined}
                firstItem={toNumber(props.firstItem)}
                // TODO: get this from modeler
                // data={entries}
                data={props.contentSource ? (props.contentSource.value ? props.contentSource.value.items : []) : []}
                // TODO: get this from modeler
                renderItem={_renderItem}
                sliderWidth={slideWidth}
                sliderHeight={slideHeight}
                itemWidth={itemWidth}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
            />
        </View>
    );
};
