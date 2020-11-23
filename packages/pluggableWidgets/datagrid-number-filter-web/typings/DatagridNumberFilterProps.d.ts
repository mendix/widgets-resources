/**
 * This file was generated from DatagridNumberFilter.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue } from "mendix";

export type DefaultFilterEnum = "greater" | "greaterEqual" | "equal" | "notEqual" | "smaller" | "smallerEqual";

export interface DatagridNumberFilterContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    defaultValue?: DynamicValue<BigJs.Big>;
    defaultFilter: DefaultFilterEnum;
    placeholder?: DynamicValue<string>;
    delay: number;
    ariaLabel?: DynamicValue<string>;
}

export interface DatagridNumberFilterPreviewProps {
    class: string;
    style: string;
    defaultValue: string;
    defaultFilter: DefaultFilterEnum;
    placeholder: string;
    delay: number | null;
    ariaLabel: string;
}
