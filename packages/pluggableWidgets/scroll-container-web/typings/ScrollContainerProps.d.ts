/**
 * This file was generated from ScrollContainer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { Big } from "big.js";

export type WidthTypeEnum = "full" | "pixels" | "percentage";

export interface ScrollContainerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    widthType: WidthTypeEnum;
    widthPixels: Big;
    widthPercentage: Big;
    content: ReactNode;
}

export interface ScrollContainerPreviewProps {
    className: string;
    readOnly: boolean;
    style?: string;
    styleObject?: CSSProperties;
    widthType: WidthTypeEnum;
    widthPixels: number | null;
    widthPercentage: number | null;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}
