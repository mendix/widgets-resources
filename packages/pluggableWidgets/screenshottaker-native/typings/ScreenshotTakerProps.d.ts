/**
 * This file was generated from ScreenshotTaker.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { ActionValue, EditableValue } from "mendix";

export type WhatToCaptureEnum = "captureFullscreen" | "captureContent";

export interface ScreenshotTakerProps<Style> {
    name: string;
    style: Style[];
    content?: ReactNode;
    pageName: EditableValue<string>;
    base64: EditableValue<string>;
    whatToCapture: WhatToCaptureEnum;
    beforeScreenshot?: ActionValue;
    onScreenshot?: ActionValue;
    onError?: ActionValue;
}

export interface ScreenshotTakerPreviewProps {
    class: string;
    style: string;
    content: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    pageName: string;
    base64: string;
    whatToCapture: WhatToCaptureEnum;
    beforeScreenshot: {} | null;
    onScreenshot: {} | null;
    onError: {} | null;
}
