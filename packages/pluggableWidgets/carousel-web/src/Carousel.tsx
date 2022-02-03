import { createElement, ReactNode, useEffect, useState, useCallback, ReactElement } from "react";
import { ValueStatus } from "mendix";
import { executeAction } from "@mendix/piw-utils-internal";
import { CarouselContainerProps } from "../typings/CarouselProps";
import { Carousel as CarouselComponent } from "./components/Carousel";
import loadingCircleSvg from "./ui/loading-circle.svg";
import "./ui/Carousel.scss";
import classNames from "classnames";

export function Carousel(props: CarouselContainerProps): ReactNode {
    const { dataSource, content, showPagination, loop, tabIndex, navigation, animation, delay, autoplay } = props;
    const [loading, setLoading] = useState(true);
    const onClick = useCallback(() => executeAction(props.onClickAction), [props.onClickAction]);
    useEffect(() => {
        if (dataSource?.status === ValueStatus.Available) {
            setLoading(false);
        }
    }, [dataSource]);

    const itemRenderer = useCallback((renderWrapper, item) => renderWrapper(content?.get(item)), [content]);
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
                itemRenderer={itemRenderer}
                items={dataSource?.items ?? []}
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
    return loading ? renderLoading() : renderCarousel();
}
