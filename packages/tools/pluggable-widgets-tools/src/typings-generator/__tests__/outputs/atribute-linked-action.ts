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

export const attributeNestedLinkedActionOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, EditableValue } from "mendix";

export interface DatasourcePropertiesType {
    collapsedFirst?: EditableValue<boolean>;
    collapsedSecond?: EditableValue<boolean>;
    onToggleCollapsedSecond?: ActionValue;
    collapsedSecondGroup?: EditableValue<boolean>;
}

export interface DatasourcePropertiesPreviewType {
    collapsedFirst: string;
    onToggleCollapsed: {} | null;
    onToggleCollapsedFirstGroup: {} | null;
    collapsedSecond: string;
    onToggleCollapsedSecond: {} | null;
    collapsedSecondGroup: string;
}

export interface MyWidgetContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    datasourceProperties: DatasourcePropertiesType[];
}

export interface MyWidgetPreviewProps {
    readOnly: boolean;
    onToggleCollapsed: {} | null;
    datasourceProperties: DatasourcePropertiesPreviewType[];
}
`;
