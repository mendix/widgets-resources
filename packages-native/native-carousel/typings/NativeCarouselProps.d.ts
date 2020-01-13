/**
 * This file was generated from NativeCarousel.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ReactNode } from "react";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export type LayoutEnum = "card" | "fullWidth";

export type ActiveSlideAlignmentEnum = "center" | "start";

export interface NativeCarouselProps<Style> extends CommonProps<Style> {
    contentSource: DataSource;
    content: (item: DataSourceItem) => ReactNode;
    layout: LayoutEnum;
    showPagination: boolean;
    activeSlideAlignment: ActiveSlideAlignmentEnum;
    loop: boolean;
}

export interface DataSourceItem {
    id: string;
}

export interface DataSource {
    status: string;
    value: {
        items: DataSourceItem[];
        offset: number;
        totalCount: number;
        hasMoreItems: boolean;
        version: number;
    };
}
