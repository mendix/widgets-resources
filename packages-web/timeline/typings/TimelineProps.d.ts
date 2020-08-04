/**
 * This file was generated from Timeline.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue, EditableValue, ListValue, ObjectItem, WebImage } from "mendix";

export type RenderModeEnum = "basic" | "custom";

export interface TimelineContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    renderMode: RenderModeEnum;
    data: ListValue;
    eventTime: (item: ObjectItem) => EditableValue<Date>;
    showDayDivider: boolean;
    title?: (item: ObjectItem) => EditableValue<string>;
    description?: (item: ObjectItem) => EditableValue<string>;
    icon?: DynamicValue<WebImage>;
    customIcon?: (item: ObjectItem) => ReactNode;
    customDayDivider?: (item: ObjectItem) => ReactNode;
    customTitle?: (item: ObjectItem) => ReactNode;
    customEventDateTime?: (item: ObjectItem) => ReactNode;
    customDescription?: (item: ObjectItem) => ReactNode;
}

export interface TimelinePreviewProps {
    class: string;
    style: string;
    renderMode: RenderModeEnum;
    data: {} | null;
    eventTime: string;
    showDayDivider: boolean;
    title: string;
    description: string;
    icon: string;
    customIcon: { widgetCount: number; renderer: ComponentType };
    customDayDivider: { widgetCount: number; renderer: ComponentType };
    customTitle: { widgetCount: number; renderer: ComponentType };
    customEventDateTime: { widgetCount: number; renderer: ComponentType };
    customDescription: { widgetCount: number; renderer: ComponentType };
}
