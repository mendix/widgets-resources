/**
 * This file was generated from WelcomeScreen.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, DynamicValue, NativeIcon } from "mendix";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export interface SlidesType {
    content: ReactNode;
    name: string;
}

export type ModeEnum = "fullscreen" | "card";

export type NumberOfButtonsEnum = "one" | "two";

export interface WelcomeScreenProps<Style> extends CommonProps<Style> {
    slides: SlidesType[];
    mode: ModeEnum;
    showPagination: boolean;
    showBottomButtons: boolean;
    numberOfButtons: NumberOfButtonsEnum;
    showSkipButton: boolean;
    skipCaption?: DynamicValue<string>;
    skipIcon?: DynamicValue<NativeIcon>;
    showPrevButton: boolean;
    prevCaption?: DynamicValue<string>;
    prevIcon?: DynamicValue<NativeIcon>;
    showNextButton: boolean;
    nextCaption?: DynamicValue<string>;
    nextIcon?: DynamicValue<NativeIcon>;
    showDoneButton: boolean;
    doneCaption?: DynamicValue<string>;
    doneIcon?: DynamicValue<NativeIcon>;
    onSwipe?: ActionValue;
    onEnds?: ActionValue;
    onSkip?: ActionValue;
}
