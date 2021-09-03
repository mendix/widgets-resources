/**
 * This file was generated from DatagridNumberFilter.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue } from "mendix";
import { Big } from "big.js";

export type DefaultFilterEnum = "greater" | "greaterEqual" | "equal" | "notEqual" | "smaller" | "smallerEqual";

export interface DatagridNumberFilterContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    defaultValue?: DynamicValue<Big>;
    defaultFilter: DefaultFilterEnum;
    placeholder?: DynamicValue<string>;
    adjustable: boolean;
    delay: number;
    screenReaderButtonCaption?: DynamicValue<string>;
    screenReaderInputCaption?: DynamicValue<string>;
}

export interface DatagridNumberFilterPreviewProps {
    class: string;
    style: string;
    defaultValue: string;
    defaultFilter: DefaultFilterEnum;
    placeholder: string;
    adjustable: boolean;
    delay: number | null;
    screenReaderButtonCaption: string;
    screenReaderInputCaption: string;
}
