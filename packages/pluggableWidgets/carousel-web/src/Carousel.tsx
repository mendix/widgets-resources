import { createElement, ReactNode, useEffect, useState, useCallback, ReactElement } from "react";
import { executeAction } from "@mendix/piw-utils-internal";
import { CarouselContainerProps } from "../typings/CarouselProps";
import { Carousel as CarouselComponent } from "./components/Carousel";
import loadingCircleSvg from "./ui/loading-circle.svg";
import "./ui/Carousel.scss";

export function Carousel(props: CarouselContainerProps): ReactNode {
    const { dataSource, content, showPagination, loop, tabIndex, navigation, animation, delay, autoplay } = props;
    const [loading, setLoading] = useState(true);
    const onClick = useCallback(() => executeAction(props.onClickAction), [props.onClickAction]);
    useEffect(() => {
        if (dataSource?.status === "available") {
            setLoading(false);
        }
    }, [dataSource]);

    const itemRenderer = useCallback((renderWrapper, item) => renderWrapper(content?.get(item)), [content]);
    const renderCarousel = (): ReactElement => {
        return (
            <CarouselComponent
                pagination={showPagination}
                loop={loop}
                tabIndex={tabIndex}
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
        return <img src={loadingCircleSvg} className="widget-carousel-loading-spinner" alt="" aria-hidden />;
    };
    return loading ? renderLoading() : renderCarousel();
}
