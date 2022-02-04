import { createElement, ReactNode, ReactElement, useEffect } from "react";
import { ObjectItem } from "mendix";
import classNames from "classnames";
import Swiper, { SwiperOptions, Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";

export interface CarouselProps {
    pagination: boolean;
    loop: boolean;
    animation?: boolean;
    autoplay?: boolean;
    delay?: number;
    navigation: boolean;
    className: string;
    tabIndex?: number | undefined;
    onClick: () => void;
    items: ObjectItem[];
    itemRenderer: (renderWrapper: (children: ReactNode) => ReactElement, item: ObjectItem) => ReactNode;
}

export function Carousel(props: CarouselProps): ReactElement {
    const {
        items,
        pagination,
        loop,
        animation,
        autoplay,
        delay,
        navigation,
        className,
        tabIndex,
        itemRenderer,
        onClick
    } = props;
    useEffect(() => Swiper.use([Navigation, Pagination, EffectFade, Autoplay]), []);
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
        <div className={classNames(className, "widget-carousel")} tabIndex={tabIndex}>
            <SwiperReact {...options} onClick={onClick}>
                {itemRenderer &&
                    items?.map((item: ObjectItem) =>
                        itemRenderer((children: ReactNode) => <SwiperSlide key={item.id}>{children}</SwiperSlide>, item)
                    )}
            </SwiperReact>
        </div>
    );
}
