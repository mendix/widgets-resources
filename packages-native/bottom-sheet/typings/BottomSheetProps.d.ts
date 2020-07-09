/**
 * This file was generated from BottomSheet.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { ActionValue, EditableValue } from "mendix";

export type TypeEnum = "modal" | "expanding";

export type ModalRenderingEnum = "basic" | "custom";

export type StyleClassEnum = "defaultStyle" | "primaryStyle" | "dangerStyle" | "customStyle";

export interface ItemsBasicType {
    caption: string;
    action?: ActionValue;
    styleClass: StyleClassEnum;
}

export interface ItemsBasicPreviewType {
    caption: string;
    action: {} | null;
    styleClass: StyleClassEnum;
}

export interface BottomSheetProps<Style> {
    name: string;
    style: Style[];
    type: TypeEnum;
    triggerAttribute?: EditableValue<boolean>;
    modalRendering: ModalRenderingEnum;
    itemsBasic: ItemsBasicType[];
    nativeImplementation: boolean;
    smallContent?: ReactNode;
    largeContent?: ReactNode;
    showFullscreenContent: boolean;
    fullscreenContent?: ReactNode;
    onOpen?: ActionValue;
    onClose?: ActionValue;
}

export interface BottomSheetPreviewProps {
    class: string;
    style: string;
    type: TypeEnum;
    triggerAttribute: string;
    modalRendering: ModalRenderingEnum;
    itemsBasic: ItemsBasicPreviewType[];
    nativeImplementation: boolean;
    smallContent: { widgetCount: number; renderer: ComponentType };
    largeContent: { widgetCount: number; renderer: ComponentType };
    showFullscreenContent: boolean;
    fullscreenContent: { widgetCount: number; renderer: ComponentType };
    onOpen: {} | null;
    onClose: {} | null;
}
