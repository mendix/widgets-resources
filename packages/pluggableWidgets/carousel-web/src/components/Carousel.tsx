import { createElement, ReactNode, ReactElement } from "react";
import { ObjectItem } from "mendix";
import Swiper, { SwiperOptions, Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";

export interface CarouselProps<T extends ObjectItem> {
    pagination: boolean;
    loop: boolean;
    tabIndex?: number | undefined;
    animation?: boolean;
    autoplay?: boolean;
    delay?: number;
    navigation: boolean;
    onClick: () => void;
    items: T[];
    itemRenderer: (renderWrapper: (children: ReactNode) => ReactElement, item: T) => ReactNode;
}

export function Carousel<T extends ObjectItem>(props: CarouselProps<T>): ReactElement {
    const { items, pagination, loop, tabIndex, animation, autoplay, delay, navigation, itemRenderer, onClick } = props;
    Swiper.use([Navigation, Pagination, EffectFade, Autoplay]);
    const options: SwiperOptions = {
        slidesPerView: 1,
        centeredSlides: true,
        loop,
        navigation,
        autoplay: autoplay ? { delay, stopOnLastSlide: true } : false,
        pagination: pagination ? { type: "bullets", clickable: true } : false,
        ...(animation && {
            effect: "fade",
            fadeEffect: { crossFade: true }
        })
    };
    return (
        <div className={"widget-carousel"} tabIndex={tabIndex}>
            <SwiperReact {...options} onClick={onClick}>
                {items.length > 0 &&
                    itemRenderer &&
                    items?.map((item: T, key: number) =>
                        itemRenderer((children: ReactNode) => <SwiperSlide key={key}>{children}</SwiperSlide>, item)
                    )}
            </SwiperReact>
        </div>
    );
}
