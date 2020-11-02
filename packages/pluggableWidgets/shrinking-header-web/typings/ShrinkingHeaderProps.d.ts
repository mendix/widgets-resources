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
    headerContent: ReactNode;
    scrollableContent: ReactNode;
    shrinkThreshold: number;
    shrinkClass: string;
    shrinkAtThreshold: boolean;
    minHeight: number;
    maxHeight: number;
}

export interface ShrinkingHeaderPreviewProps {
    class: string;
    style: string;
    headerContent: { widgetCount: number; renderer: ComponentType };
    scrollableContent: { widgetCount: number; renderer: ComponentType };
    shrinkThreshold: number | null;
    shrinkClass: string;
    shrinkAtThreshold: boolean;
    minHeight: number | null;
    maxHeight: number | null;
}
