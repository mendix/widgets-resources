import { createElement, ReactNode, ReactElement } from "react";
import { GUID } from "mendix";
import classNames from "classnames";
import { SwiperOptions } from "swiper";
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
    onClick?: () => void;
    items: Array<{ id: GUID; content?: ReactNode }>;
}

export function Carousel(props: CarouselProps): ReactElement {
    const { items, pagination, loop, animation, autoplay, delay, navigation, className, tabIndex, onClick } = props;

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
                {items?.map(item => (
                    <SwiperSlide key={item.id}>{item.content}</SwiperSlide>
                ))}
            </SwiperReact>
        </div>
    );
}
