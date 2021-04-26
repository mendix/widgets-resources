/**
 * This file was generated from Accordion.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue } from "mendix";

export type HeaderRenderModeEnum = "text" | "custom";

export interface GroupsType {
    headerRenderMode: HeaderRenderModeEnum;
    headerText: DynamicValue<string>;
    headerContent?: ReactNode;
}

export interface GroupsPreviewType {
    headerRenderMode: HeaderRenderModeEnum;
    headerText: string;
    headerContent: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
}

export interface AccordionContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    groups: GroupsType[];
}

export interface AccordionPreviewProps {
    class: string;
    style: string;
    groups: GroupsPreviewType[];
}
