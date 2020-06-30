/**
 * This file was generated from ShrinkingHeader.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";

export interface ShrinkingHeaderContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    content: ReactNode;
    scrollElementXPath: string;
    shrinkThreshold: number;
    shrinkClass: string;
}

export interface ShrinkingHeaderPreviewProps {
    class: string;
    style: string;
    content: { widgetCount: number; renderer: ComponentType };
    scrollElementXPath: string;
    shrinkThreshold: number | null;
    shrinkClass: string;
}
