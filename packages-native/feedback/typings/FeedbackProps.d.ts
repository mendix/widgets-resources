/**
 * This file was generated from Feedback.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue, NativeImage } from "mendix";

export interface FeedbackProps<Style> {
    name: string;
    style: Style[];
    sprintrapp: string;
    allowScreenshot: boolean;
    logo?: DynamicValue<NativeImage>;
}

export interface FeedbackPreviewProps {
    class: string;
    style: string;
    sprintrapp: string;
    allowScreenshot: boolean;
    logo: string;
}
