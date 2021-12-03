/**
 * This file was generated from Switch.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, EditableValue } from "mendix";

export interface SwitchContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    booleanAttribute: EditableValue<boolean>;
    action?: ActionValue;
}

export interface SwitchPreviewProps {
    readOnly: boolean;
    booleanAttribute: string;
    action: {} | null;
}
