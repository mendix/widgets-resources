/**
 * This file was generated from Carousel.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ListValue, ObjectItem } from "mendix";
import { ReactNode } from "react";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export type LayoutEnum = "card" | "fullWidth";

export type ActiveSlideAlignmentEnum = "center" | "start";

export interface CarouselProps<Style> extends CommonProps<Style> {
    contentSource: ListValue;
    content: (item: ObjectItem) => ReactNode;
    layout: LayoutEnum;
    showPagination: boolean;
    activeSlideAlignment: ActiveSlideAlignmentEnum;
    loop: boolean;
}
