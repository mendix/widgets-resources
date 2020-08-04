/**
 * This file was generated from AccessibilityHelper.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue } from "mendix";

export type ValueSourceTypeEnum = "text" | "expression";

export interface AttributesListType {
    attribute: string;
    valueSourceType: ValueSourceTypeEnum;
    valueExpression?: DynamicValue<string>;
    valueText?: DynamicValue<string>;
    attributeCondition: DynamicValue<boolean>;
}

export interface AttributesListPreviewType {
    attribute: string;
    valueSourceType: ValueSourceTypeEnum;
    valueExpression: string;
    valueText: string;
    attributeCondition: string;
}

export interface AccessibilityHelperContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    targetSelector: string;
    content: ReactNode;
    attributesList: AttributesListType[];
}

export interface AccessibilityHelperPreviewProps {
    class: string;
    style: string;
    targetSelector: string;
    content: { widgetCount: number; renderer: ComponentType };
    attributesList: AttributesListPreviewType[];
}
