/**
 * This file was generated from BackgroundImage.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { DynamicValue, NativeImage } from "mendix";

export type ResizeModeEnum = "cover" | "contain" | "stretch" | "center";

export interface BackgroundImageProps<Style> {
    name: string;
    style: Style[];
    image: DynamicValue<NativeImage>;
    resizeMode: ResizeModeEnum;
    opacity: BigJs.Big;
    content?: ReactNode;
}

export interface BackgroundImagePreviewProps {
    class: string;
    style: string;
    image: string;
    resizeMode: ResizeModeEnum;
    opacity: number | null;
    content: { widgetCount: number; renderer: ComponentType };
}
