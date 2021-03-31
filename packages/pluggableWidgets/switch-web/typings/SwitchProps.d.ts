/**
 * This file was generated from Switch.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export type DeviceStyleEnum = "auto" | "android" | "iOS";

export interface SwitchContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    id: string;
    booleanAttribute: EditableValue<boolean>;
    action?: ActionValue;
    deviceStyle: DeviceStyleEnum;
}

export interface SwitchPreviewProps {
    class: string;
    style: string;
    booleanAttribute: string;
    action: {} | null;
    deviceStyle: DeviceStyleEnum;
}
