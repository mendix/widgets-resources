/**
 * This file was generated from Signature.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export interface SignatureProps<Style> {
    name: string;
    style: Style[];
    imageAttribute: EditableValue<string>;
    buttonCaptionClear?: DynamicValue<string>;
    buttonCaptionSave?: DynamicValue<string>;
    onClear?: ActionValue;
    onSave?: ActionValue;
    onEnd?: ActionValue;
    onEmpty?: ActionValue;
}

export interface SignaturePreviewProps {
    class: string;
    style: string;
    imageAttribute: string;
    buttonCaptionClear: string;
    buttonCaptionSave: string;
    onClear: {} | null;
    onSave: {} | null;
    onEnd: {} | null;
    onEmpty: {} | null;
}
