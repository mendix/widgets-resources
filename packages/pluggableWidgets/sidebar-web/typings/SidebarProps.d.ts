/**
 * This file was generated from Sidebar.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";

export type ToggleModeEnum = "none" | "push" | "slideOver" | "startExpandedShrink" | "startCollapsedShrink";

export type ExpandedWidthUnitEnum = "pixels" | "percentage";

export interface SidebarContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    contents?: ReactNode;
    toggleMode: ToggleModeEnum;
    expandedWidthUnit: ExpandedWidthUnitEnum;
    expandedWidthValue: number;
}

export interface SidebarPreviewProps {
    class: string;
    style: string;
    contents: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    toggleMode: ToggleModeEnum;
    expandedWidthUnit: ExpandedWidthUnitEnum;
    expandedWidthValue: number | null;
}
