/**
 * This file was generated from Badge.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, DynamicValue } from "mendix";

export interface BadgeProps<Style> {
    name: string;
    style: Style[];
    caption: DynamicValue<string>;
    onClick?: ActionValue;
}

export interface BadgePreviewProps {
    class: string;
    style: string;
    caption: string;
    onClick: {} | null;
}
