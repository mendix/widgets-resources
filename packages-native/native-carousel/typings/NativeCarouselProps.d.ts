/**
 * This file was generated from NativeCarousel.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { DynamicValue, EditableValue } from "mendix";

interface CommonProps<Style> {
    name: string;
    style: Array<Partial<Style>>;
}

export type VerticalEnum = "vertical" | "horizontal";

export type ActiveSlideAlignmentEnum = "start" | "center" | "end";

export type LayoutEnum = "default" | "stack" | "tinder";

export interface NativeCarouselProps<Style> extends CommonProps<Style> {
    contentSource: any;
    content: any;
    inverted: boolean;
    vertical: VerticalEnum;
    currentIndex?: EditableValue<BigJs.Big>;
    firstItem: DynamicValue<BigJs.Big>;
    loop: boolean;
    loopClonesPerSide: number;
    autoplay: boolean;
    autoplayDelay: number;
    autoplayInterval: number;
    enableMomentum: boolean;
    lockScrollWhileSnapping: boolean;
    enableSnap: boolean;
    swipeThreshold: number;
    activeSlideAlignment: ActiveSlideAlignmentEnum;
    layout: LayoutEnum;
    layoutCardOffset: number;
}
