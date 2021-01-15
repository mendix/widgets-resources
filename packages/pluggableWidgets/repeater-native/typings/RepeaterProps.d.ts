/**
 * This file was generated from Repeater.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType } from "react";
import { ListValue, ListWidgetValue } from "mendix";

export interface RepeaterProps<Style> {
    name: string;
    style: Style[];
    datasource: ListValue;
    content: ListWidgetValue;
}

export interface RepeaterPreviewProps {
    class: string;
    style: string;
    datasource: {} | null;
    content: { widgetCount: number; renderer: ComponentType };
}
