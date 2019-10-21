/**
 * This file was generated from IntroScreen.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, DynamicValue, EditableValue, NativeIcon } from "mendix";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export interface SlidesType {
    name: string;
    content: ReactNode;
}

export type ShowModeEnum = "fullscreen" | "popup";

export type ButtonPatternEnum = "all" | "nextDone" | "none";

export type SlideIndicatorsEnum = "between" | "above" | "never";

export interface IntroScreenProps<Style> extends CommonProps<Style> {
    slides: SlidesType[];
    showMode: ShowModeEnum;
    buttonPattern: ButtonPatternEnum;
    slideIndicators: SlideIndicatorsEnum;
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
