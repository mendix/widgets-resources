/**
 * This file was generated from Accordion.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, NativeIcon } from "mendix";

export type HeaderRenderModeEnum = "text" | "custom";

export type HeaderTextRenderModeEnum = "heading1" | "heading2" | "heading3" | "heading4" | "heading5" | "heading6";

export type GroupCollapsedEnum = "groupStartExpanded" | "groupStartCollapsed" | "groupStartDynamic";

export interface GroupsType {
    headerRenderMode: HeaderRenderModeEnum;
    headerTextRenderMode: HeaderTextRenderModeEnum;
    headerText: DynamicValue<string>;
    headerContent?: ReactNode;
    content?: ReactNode;
    visible: DynamicValue<boolean>;
    groupCollapsed: GroupCollapsedEnum;
    groupCollapsedDynamic?: DynamicValue<boolean>;
    groupCollapsedAttribute?: EditableValue<boolean>;
    groupOnChange?: ActionValue;
}

export type CollapseBehaviorEnum = "singleExpanded" | "multipleExpanded";

export type IconEnum = "right" | "left" | "no";

export interface GroupsPreviewType {
    headerRenderMode: HeaderRenderModeEnum;
    headerTextRenderMode: HeaderTextRenderModeEnum;
    headerText: string;
    headerContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    visible: string;
    groupCollapsed: GroupCollapsedEnum;
    groupCollapsedDynamic: string;
    groupCollapsedAttribute: string;
    groupOnChange: {} | null;
}

export interface AccordionProps<Style> {
    name: string;
    style: Style[];
    groups: GroupsType[];
    collapsible: boolean;
    collapseBehavior: CollapseBehaviorEnum;
    icon: IconEnum;
    iconCollapsed?: DynamicValue<NativeIcon>;
    iconExpanded?: DynamicValue<NativeIcon>;
}

export interface AccordionPreviewProps {
    class: string;
    style: string;
    groups: GroupsPreviewType[];
    collapsible: boolean;
    collapseBehavior: CollapseBehaviorEnum;
    icon: IconEnum;
    iconCollapsed: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    iconExpanded: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
}
