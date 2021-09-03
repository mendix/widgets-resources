/**
 * This file was generated from FloatingActionButton.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, DynamicValue, NativeIcon } from "mendix";

export type HorizontalPositionEnum = "left" | "center" | "right";

export type VerticalPositionEnum = "top" | "bottom";

export interface SecondaryButtonsType {
    icon: DynamicValue<NativeIcon>;
    caption?: DynamicValue<string>;
    onClick?: ActionValue;
}

export interface SecondaryButtonsPreviewType {
    icon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    caption: string;
    onClick: {} | null;
}

export interface FloatingActionButtonProps<Style> {
    name: string;
    style: Style[];
    icon?: DynamicValue<NativeIcon>;
    iconActive?: DynamicValue<NativeIcon>;
    horizontalPosition: HorizontalPositionEnum;
    verticalPosition: VerticalPositionEnum;
    onClick?: ActionValue;
    secondaryButtons: SecondaryButtonsType[];
}

export interface FloatingActionButtonPreviewProps {
    class: string;
    style: string;
    icon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    iconActive: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    horizontalPosition: HorizontalPositionEnum;
    verticalPosition: VerticalPositionEnum;
    onClick: {} | null;
    secondaryButtons: SecondaryButtonsPreviewType[];
}
