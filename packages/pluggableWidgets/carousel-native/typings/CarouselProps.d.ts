/**
 * This file was generated from Carousel.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType } from "react";
import { ListValue, ListWidgetValue } from "mendix";

export type LayoutEnum = "card" | "fullWidth";

export type ActiveSlideAlignmentEnum = "center" | "start";

export interface CarouselProps<Style> {
    name: string;
    style: Style[];
    contentSource: ListValue;
    content: ListWidgetValue;
    layout: LayoutEnum;
    showPagination: boolean;
    activeSlideAlignment: ActiveSlideAlignmentEnum;
}

export interface CarouselPreviewProps {
    class: string;
    style: string;
    contentSource: {} | null;
    content: { widgetCount: number; renderer: ComponentType };
    layout: LayoutEnum;
    showPagination: boolean;
    activeSlideAlignment: ActiveSlideAlignmentEnum;
}
