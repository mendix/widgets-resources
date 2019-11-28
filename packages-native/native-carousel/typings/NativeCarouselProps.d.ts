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

export type VerticalEnum = "vertical" | "horizontal";

export type ActiveSlideAlignmentEnum = "start" | "center" | "end";

export type LayoutEnum = "default" | "fullWidth" | "fullScreen" | "stack" | "tinder";

export interface NativeCarouselProps<Style> extends CommonProps<Style> {
    contentSource: DataSource;
    content: (item: DataSourceItem) => ReactNode;
    inverted: boolean;
    vertical: VerticalEnum;
    currentIndex?: EditableValue<BigJs.Big>;
    firstItem: DynamicValue<BigJs.Big>;
    enableMomentum: boolean;
    lockScrollWhileSnapping: boolean;
    enableSnap: boolean;
    swipeThreshold: number;
    activeSlideAlignment: ActiveSlideAlignmentEnum;
    layout: LayoutEnum;
    layoutCardOffset: number;
    loop: boolean;
    loopClonesPerSide: number;
    autoplay: boolean;
    autoplayDelay: number;
    autoplayInterval: number;
    onPress?: ActionValue;
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
