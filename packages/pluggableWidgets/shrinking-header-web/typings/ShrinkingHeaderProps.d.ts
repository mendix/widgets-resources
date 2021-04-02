/**
 * This file was generated from ShrinkingHeader.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue } from "mendix";
import { Big } from "big.js";

export interface ShrinkingHeaderContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    content: ReactNode;
    shrinkThreshold: DynamicValue<Big>;
}

export interface ShrinkingHeaderPreviewProps {
    class: string;
    style: string;
    content: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    shrinkThreshold: string;
}
