import { createElement, ReactNode, useCallback, ReactElement, useEffect } from "react";
import { ValueStatus, GUID, ObjectItem } from "mendix";
import { executeAction } from "@mendix/piw-utils-internal";
import { CarouselContainerProps } from "../typings/CarouselProps";
import { Carousel as CarouselComponent } from "./components/Carousel";
import loadingCircleSvg from "./ui/loading-circle.svg";
import classNames from "classnames";
import "./ui/Carousel.scss";
import Swiper, { Navigation, Pagination, EffectFade, Autoplay } from "swiper";

export function Carousel(props: CarouselContainerProps): ReactNode {
    const { showPagination, loop, tabIndex, navigation, animation, delay, autoplay } = props;
    const onClick = useCallback(() => executeAction(props.onClickAction), [props.onClickAction]);

    useEffect(() => Swiper.use([Navigation, Pagination, EffectFade, Autoplay]), []);

    const renderCarousel = (): ReactElement => {
        return (
            <CarouselComponent
                className={props.class}
                tabIndex={tabIndex}
                pagination={showPagination}
                loop={loop}
                animation={animation}
                autoplay={autoplay}
                delay={delay}
                navigation={navigation}
                items={
                    props.dataSource?.items?.map((item: ObjectItem) => ({
                        id: item.id as GUID,
                        content: props.content?.get(item)
                    })) ?? []
                }
                onClick={onClick}
            />
        );
    };
    const renderLoading = (): ReactNode => {
        return (
            <div className={classNames(props.class, "widget-carousel")} tabIndex={tabIndex}>
                <img src={loadingCircleSvg} className="widget-carousel-loading-spinner" alt="" aria-hidden />
            </div>
        );
    };

    return props.dataSource?.status !== ValueStatus.Available ? renderLoading() : renderCarousel();
}
