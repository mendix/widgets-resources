/**
 * This file was generated from NativeCarousel.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, DynamicValue, EditableValue } from "mendix";
import { ReactNode } from "react";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export type ActiveSlideAlignmentEnum = "start" | "center" | "end";

export type LayoutEnum = "card" | "fullWidth";

export interface NativeCarouselProps<Style> extends CommonProps<Style> {
    contentSource: DataSource;
    content: (item: DataSourceItem) => ReactNode;
    currentIndex?: EditableValue<BigJs.Big>;
    firstItem: DynamicValue<BigJs.Big>;
    activeSlideAlignment: ActiveSlideAlignmentEnum;
    layout: LayoutEnum;
    loop: boolean;
    autoplay: boolean;
    autoplayDelay: number;
    autoplayInterval: number;
    onPress?: ActionValue;
    onSnap?: ActionValue;
    showPagination: boolean;
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
