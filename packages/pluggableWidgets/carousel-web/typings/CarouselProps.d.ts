/**
 * This file was generated from Carousel.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { ActionValue, ListValue, ListWidgetValue } from "mendix";

export interface CarouselContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    dataSource?: ListValue;
    content?: ListWidgetValue;
    showPagination: boolean;
    navigation: boolean;
    autoplay: boolean;
    delay: number;
    loop: boolean;
    animation: boolean;
    onClickAction?: ActionValue;
}

export interface CarouselPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    dataSource: {} | { type: string } | null;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    showPagination: boolean;
    navigation: boolean;
    autoplay: boolean;
    delay: number | null;
    loop: boolean;
    animation: boolean;
    onClickAction: {} | null;
}
