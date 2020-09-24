/**
 * This file was generated from Timeline.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import {
    DynamicValue,
    ListValue,
    ListActionValue,
    ListAttributeValue,
    ListExpressionValue,
    ListWidgetValue,
    WebIcon
} from "mendix";

export type RenderModeEnum = "basic" | "custom";

export type GroupByKeyEnum = "day" | "month" | "year";

export type GroupByDayOptionsEnum = "dayName" | "dayMonth" | "fullDate";

export type GroupByMonthOptionsEnum = "month" | "monthYear";

export interface TimelineContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    renderMode: RenderModeEnum;
    data: ListValue;
    eventTime: ListAttributeValue<Date>;
    title?: ListAttributeValue<string>;
    description?: ListAttributeValue<string>;
    time?: ListExpressionValue<string>;
    icon?: DynamicValue<WebIcon>;
    groupByKey: GroupByKeyEnum;
    showGroupHeader: boolean;
    groupByDayOptions: GroupByDayOptionsEnum;
    groupByMonthOptions: GroupByMonthOptionsEnum;
    customIcon?: ListWidgetValue;
    customGroupHeader?: ListWidgetValue;
    customTitle?: ListWidgetValue;
    customEventDateTime?: ListWidgetValue;
    customDescription?: ListWidgetValue;
    onClick?: ListActionValue;
}

export interface TimelinePreviewProps {
    class: string;
    style: string;
    renderMode: RenderModeEnum;
    data: {} | null;
    eventTime: string;
    title: string;
    description: string;
    time: string;
    icon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    groupByKey: GroupByKeyEnum;
    showGroupHeader: boolean;
    groupByDayOptions: GroupByDayOptionsEnum;
    groupByMonthOptions: GroupByMonthOptionsEnum;
    customIcon: { widgetCount: number; renderer: ComponentType };
    customGroupHeader: { widgetCount: number; renderer: ComponentType };
    customTitle: { widgetCount: number; renderer: ComponentType };
    customEventDateTime: { widgetCount: number; renderer: ComponentType };
    customDescription: { widgetCount: number; renderer: ComponentType };
    onClick: {} | null;
}
