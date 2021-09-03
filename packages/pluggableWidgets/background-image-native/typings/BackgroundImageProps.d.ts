/**
 * This file was generated from BackgroundImage.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { DynamicValue, NativeImage } from "mendix";
import { Big } from "big.js";

export type ResizeModeEnum = "cover" | "contain" | "stretch" | "center";

export interface BackgroundImageProps<Style> {
    name: string;
    style: Style[];
    image: DynamicValue<NativeImage>;
    resizeMode: ResizeModeEnum;
    opacity: Big;
    content?: ReactNode;
}

export interface BackgroundImagePreviewProps {
    class: string;
    style: string;
    image: { type: "static"; imageUrl: string; } | { type: "dynamic"; entity: string; } | null;
    resizeMode: ResizeModeEnum;
    opacity: number | null;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}
