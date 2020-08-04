/**
 * This file was generated from Timeline.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { DynamicValue, ListValue, ListAttributeValue, ListWidgetValue, WebIcon } from "mendix";

export type RenderModeEnum = "basic" | "custom";

export interface TimelineContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    renderMode: RenderModeEnum;
    data: ListValue;
    eventTime: ListAttributeValue<Date>;
    showDayDivider: boolean;
    title?: ListAttributeValue<string>;
    description?: ListAttributeValue<string>;
    icon?: DynamicValue<WebIcon>;
    customIcon?: ListWidgetValue;
    customDayDivider?: ListWidgetValue;
    customTitle?: ListWidgetValue;
    customEventDateTime?: ListWidgetValue;
    customDescription?: ListWidgetValue;
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
    icon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    customIcon: { widgetCount: number; renderer: ComponentType };
    customDayDivider: { widgetCount: number; renderer: ComponentType };
    customTitle: { widgetCount: number; renderer: ComponentType };
    customEventDateTime: { widgetCount: number; renderer: ComponentType };
    customDescription: { widgetCount: number; renderer: ComponentType };
}
