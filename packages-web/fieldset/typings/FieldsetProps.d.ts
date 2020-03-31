/**
 * This file was generated from Fieldset.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { DynamicValue } from "mendix";
import { ReactNode } from "react";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export interface FieldsetContainerProps extends CommonProps {
    legend?: DynamicValue<string>;
    content?: ReactNode;
}

export interface FieldsetPreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    legend?: string;
    content?: ReactNode;
}

export interface VisibilityMap {
    legend: boolean;
    content: boolean;
}
