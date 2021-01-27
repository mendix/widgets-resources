/**
 * This file was generated from IntroScreen.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, NativeIcon } from "mendix";

export interface SlidesType {
    name: string;
    content: ReactNode;
}

export type ShowModeEnum = "fullscreen" | "popup";

export type ButtonPatternEnum = "all" | "nextDone" | "none";

export type SlideIndicatorsEnum = "between" | "above" | "never";

export interface SlidesPreviewType {
    name: string;
    content: { widgetCount: number; renderer: ComponentType };
}

export interface IntroScreenProps<Style> {
    name: string;
    style: Style[];
    slides: SlidesType[];
    showMode: ShowModeEnum;
    buttonPattern: ButtonPatternEnum;
    slideIndicators: SlideIndicatorsEnum;
    hideIndicatorLastSlide: boolean;
    identifier: string;
    skipCaption?: DynamicValue<string>;
    skipIcon?: DynamicValue<NativeIcon>;
    previousCaption?: DynamicValue<string>;
    previousIcon?: DynamicValue<NativeIcon>;
    nextCaption?: DynamicValue<string>;
    nextIcon?: DynamicValue<NativeIcon>;
    doneCaption?: DynamicValue<string>;
    doneIcon?: DynamicValue<NativeIcon>;
    activeSlideAttribute?: EditableValue<BigJs.Big>;
    onSlideChange?: ActionValue;
    onDone?: ActionValue;
    onSkip?: ActionValue;
}

export interface IntroScreenPreviewProps {
    class: string;
    style: string;
    slides: SlidesPreviewType[];
    showMode: ShowModeEnum;
    buttonPattern: ButtonPatternEnum;
    slideIndicators: SlideIndicatorsEnum;
    hideIndicatorLastSlide: boolean;
    identifier: string;
    skipCaption: string;
    skipIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    previousCaption: string;
    previousIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    nextCaption: string;
    nextIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    doneCaption: string;
    doneIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    activeSlideAttribute: string;
    onSlideChange: {} | null;
    onDone: {} | null;
    onSkip: {} | null;
}
