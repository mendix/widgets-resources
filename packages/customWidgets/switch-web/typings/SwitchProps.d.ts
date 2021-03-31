/**
 * This file was generated from Switch.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "mendix";

export type DeviceStyleEnum = "auto" | "android" | "iOS";

export type ColorStyleEnum = "default" | "primary" | "inverse" | "success" | "info" | "warning" | "danger";

export interface SwitchContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    id: string;
    booleanAttribute: EditableValue<boolean>;
    deviceStyle: DeviceStyleEnum;
    colorStyle: ColorStyleEnum;
}

export interface SwitchPreviewProps {
    class: string;
    style: string;
    booleanAttribute: string;
    deviceStyle: DeviceStyleEnum;
    colorStyle: ColorStyleEnum;
}
