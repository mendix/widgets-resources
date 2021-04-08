/**
 * This file was generated from Timeline.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { DynamicValue, ListValue, ListActionValue, ListAttributeValue, ListExpressionValue, ListWidgetValue, WebIcon } from "mendix";

export type GroupByKeyEnum = "day" | "month" | "year";

export type GroupByDayOptionsEnum = "dayName" | "dayMonth" | "fullDate";

export type GroupByMonthOptionsEnum = "month" | "monthYear";

export type UngroupedEventsPositionEnum = "beginning" | "end";

export interface TimelineContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    data: ListValue;
    title?: ListExpressionValue<string>;
    description?: ListExpressionValue<string>;
    timeIndication?: ListExpressionValue<string>;
    customVisualization: boolean;
    icon?: DynamicValue<WebIcon>;
    groupEvents: boolean;
    groupAttribute?: ListAttributeValue<Date>;
    groupByKey: GroupByKeyEnum;
    groupByDayOptions: GroupByDayOptionsEnum;
    groupByMonthOptions: GroupByMonthOptionsEnum;
    ungroupedEventsPosition: UngroupedEventsPositionEnum;
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
    data: {} | null;
    title: string;
    description: string;
    timeIndication: string;
    customVisualization: boolean;
    icon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    groupEvents: boolean;
    groupAttribute: string;
    groupByKey: GroupByKeyEnum;
    groupByDayOptions: GroupByDayOptionsEnum;
    groupByMonthOptions: GroupByMonthOptionsEnum;
    ungroupedEventsPosition: UngroupedEventsPositionEnum;
    customIcon: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    customGroupHeader: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    customTitle: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    customEventDateTime: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    customDescription: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    onClick: {} | null;
}
