/**
 * This file was generated from LabelSelector.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ListValue, ListAttributeValue } from "mendix";

export interface LabelSelectorContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    tagAssoc: ListValue;
    tafgAssoc: any;
    tagAttrib: ListAttributeValue<string>;
    colorAttrib?: ListAttributeValue<string>;
}

export interface LabelSelectorPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    tagAssoc: {} | { type: string } | null;
    tafgAssoc: any;
    tagAttrib: string;
    colorAttrib: string;
}
