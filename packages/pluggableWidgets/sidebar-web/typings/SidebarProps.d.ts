/**
 * This file was generated from Sidebar.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";

export type ToggleModeEnum = "none" | "push" | "slideOver" | "startExpandedShrink" | "startCollapsedShrink";

export type WidthUnitEnum = "pixels" | "percentage";

export type ExpandedWidthUnitEnum = "pixels" | "percentage";

export type CollapsedWidthUnitEnum = "pixels" | "percentage";

export interface SidebarContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    contents?: ReactNode;
    toggleMode: ToggleModeEnum;
    widthUnit: WidthUnitEnum;
    widthValue: number;
    expandedWidthUnit: ExpandedWidthUnitEnum;
    expandedWidthValue: number;
    collapsedWidthUnit: CollapsedWidthUnitEnum;
    collapsedWidthValue: number;
}

export interface SidebarPreviewProps {
    className: string;
    readOnly: boolean;
    style?: string;
    styleObject?: CSSProperties;
    contents: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    toggleMode: ToggleModeEnum;
    widthUnit: WidthUnitEnum;
    widthValue: number | null;
    expandedWidthUnit: ExpandedWidthUnitEnum;
    expandedWidthValue: number | null;
    collapsedWidthUnit: CollapsedWidthUnitEnum;
    collapsedWidthValue: number | null;
}
