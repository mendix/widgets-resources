/**
 * This file was generated from Sidebar.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";

export interface SidebarContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    contents?: ReactNode;
}

export interface SidebarPreviewProps {
    class: string;
    style: string;
    contents: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
}
