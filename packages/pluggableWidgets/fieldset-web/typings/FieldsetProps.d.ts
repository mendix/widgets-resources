/**
 * This file was generated from Fieldset.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue } from "mendix";

export interface FieldsetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    legend?: DynamicValue<string>;
    content: ReactNode;
}

export interface FieldsetPreviewProps {
    class: string;
    style: string;
    legend: string;
    content: { widgetCount: number; renderer: ComponentType };
}
