/**
 * This file was generated from BottomSheet.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, EditableValue } from "mendix";
import { ReactNode } from "react";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export type TypeEnum = "modal" | "expanding";

export type ModalRenderingEnum = "basic" | "custom";

export interface ItemsBasicType {
    caption: string;
    color?: string;
    action?: ActionValue;
}

export interface BottomSheetProps<Style> extends CommonProps<Style> {
    type: TypeEnum;
    triggerAttribute?: EditableValue<boolean>;
    modalRendering: ModalRenderingEnum;
    nativeImplementation: boolean;
    itemsBasic: ItemsBasicType[];
    smallContent?: ReactNode;
    largeContent?: ReactNode;
    showFullscreenContent: boolean;
    fullscreenContent?: ReactNode;
    onOpen?: ActionValue;
    onClose?: ActionValue;
}
