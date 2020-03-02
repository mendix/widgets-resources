/**
 * This file was generated from BottomDrawer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, DynamicValue, EditableValue } from "mendix";
import { ReactNode } from "react";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export type TypeEnum = "modal" | "expanding";

export type ModalRenderingEnum = "basic" | "custom";

export interface ItemsBasicType {
    caption?: DynamicValue<string>;
    action?: ActionValue;
    nativeImplementation: boolean;
}

export interface BottomDrawerProps<Style> extends CommonProps<Style> {
    type: TypeEnum;
    triggerAttribute?: EditableValue<boolean>;
    modalRendering: ModalRenderingEnum;
    itemsBasic: ItemsBasicType[];
    smallContent?: ReactNode;
    largeContent?: ReactNode;
    showFullscreenContent: boolean;
    fullscreenContent?: ReactNode;
    onOpen?: ActionValue;
    onClose?: ActionValue;
}
