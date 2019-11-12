/**
 * This file was generated from Feedback.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { DynamicValue, NativeImage } from "mendix";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export interface FeedbackProps<Style> extends CommonProps<Style> {
    sprintrapp: string;
    allowScreenshot: boolean;
    logo?: DynamicValue<NativeImage>;
}
