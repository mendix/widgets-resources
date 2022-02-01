import { createElement, ReactNode, useCallback } from "react";
import { CarouselPreviewProps } from "../typings/CarouselProps";
import { Carousel } from "./components/Carousel";

export function getPreviewCss(): string {
    return require("./ui/Carousel.scss");
}

export function preview(props: CarouselPreviewProps): ReactNode {
    return (
        <Carousel
            navigation={props.navigation}
            pagination={props.showPagination}
            loop={false}
            items={[]}
            itemRenderer={useCallback(
                renderWrapper => (
                    <props.content.renderer caption="Carousel item: Place widgets here">
                        {renderWrapper(null)}
                    </props.content.renderer>
                ),
                [props]
            )}
            onClick={() => false}
        />
    );
}
