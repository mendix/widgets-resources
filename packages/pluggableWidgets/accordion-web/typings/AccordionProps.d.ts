/**
 * This file was generated from Accordion.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, WebIcon } from "mendix";

export type HeaderRenderModeEnum = "text" | "custom";

export type HeaderHeadingEnum =
    | "headingOne"
    | "headingTwo"
    | "headingThree"
    | "headingFour"
    | "headingFive"
    | "headingSix";

export type InitialCollapsedStateEnum = "expanded" | "collapsed" | "dynamic";

export interface GroupsType {
    headerRenderMode: HeaderRenderModeEnum;
    headerText: DynamicValue<string>;
    headerHeading: HeaderHeadingEnum;
    headerContent?: ReactNode;
    content?: ReactNode;
    visible: DynamicValue<boolean>;
    dynamicClass?: DynamicValue<string>;
    initialCollapsedState: InitialCollapsedStateEnum;
    initiallyCollapsed: DynamicValue<boolean>;
    collapsed?: EditableValue<boolean>;
    onToggleCollapsed?: ActionValue;
}

export type ExpandBehaviorEnum = "singleExpanded" | "multipleExpanded";

export type ShowIconEnum = "right" | "left" | "no";

export interface GroupsPreviewType {
    headerRenderMode: HeaderRenderModeEnum;
    headerText: string;
    headerHeading: HeaderHeadingEnum;
    headerContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    visible: string;
    dynamicClass: string;
    initialCollapsedState: InitialCollapsedStateEnum;
    initiallyCollapsed: string;
    collapsed: string;
    onToggleCollapsed: {} | null;
}

export interface AccordionContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    advancedMode: boolean;
    groups: GroupsType[];
    collapsible: boolean;
    expandBehavior: ExpandBehaviorEnum;
    animate: boolean;
    showIcon: ShowIconEnum;
    icon?: DynamicValue<WebIcon>;
    expandIcon?: DynamicValue<WebIcon>;
    collapseIcon?: DynamicValue<WebIcon>;
    animateIcon: boolean;
}

export interface AccordionPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    advancedMode: boolean;
    groups: GroupsPreviewType[];
    collapsible: boolean;
    expandBehavior: ExpandBehaviorEnum;
    animate: boolean;
    showIcon: ShowIconEnum;
    icon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    expandIcon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    collapseIcon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    animateIcon: boolean;
}
