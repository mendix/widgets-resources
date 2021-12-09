export const attributeLinkedActionOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { EditableValue } from "mendix";

export interface MyWidgetContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    collapsed?: EditableValue<boolean>;
}

export interface MyWidgetPreviewProps {
    readOnly: boolean;
    collapsed: string;
    onToggleCollapsed: {} | null;
}
`;
