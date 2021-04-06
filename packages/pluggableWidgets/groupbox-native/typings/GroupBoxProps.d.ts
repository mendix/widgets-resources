/**
 * This file was generated from GroupBox.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { DynamicValue, NativeIcon } from "mendix";

export type CollapsibleEnum = "collapsibleNo" | "collapsibleYesExpanded" | "collapsibleYesCollapsed";

export interface GroupBoxProps<Style> {
    name: string;
    style: Style[];
    headerContent?: ReactNode;
    content: ReactNode;
    showHeader: boolean;
    collapsible: CollapsibleEnum;
    iconCollapsed?: DynamicValue<NativeIcon>;
    iconExpanded?: DynamicValue<NativeIcon>;
}

export interface GroupBoxPreviewProps {
    class: string;
    style: string;
    headerContent: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    content: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    showHeader: boolean;
    collapsible: CollapsibleEnum;
    iconCollapsed: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    iconExpanded: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
}
