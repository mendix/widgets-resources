export const datasourceWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { ActionValue, EditableValue } from "mendix";
import { ReactNode } from "react";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export interface MyWidgetContainerProps extends CommonProps {
    contentSource: DataSource;
    content: (item: DataSourceItem) => ReactNode;
    description: EditableValue<string>;
    action?: ActionValue;
}

export interface MyWidgetPreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    contentSource: DataSource;
    content: (item: DataSourceItem) => ReactNode;
    description: string;
    action: ActionPreview;
}

export interface VisibilityMap {
    contentSource: boolean;
    content: boolean;
    description: boolean;
    action: boolean;
}

export interface DataSourceItem {
    id: string;
}

export interface DataSource {
    status: string;
    value: {
        items: DataSourceItem[];
        offset: number;
        totalCount: number;
        hasMoreItems: boolean;
        version: number;
    }
}
`;
export const datasourceNativeOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, EditableValue } from "mendix";
import { ReactNode } from "react";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export interface MyWidgetProps<Style> extends CommonProps<Style> {
    contentSource: DataSource;
    content: (item: DataSourceItem) => ReactNode;
    description: EditableValue<string>;
    action?: ActionValue;
}

export interface DataSourceItem {
    id: string;
}

export interface DataSource {
    status: string;
    value: {
        items: DataSourceItem[];
        offset: number;
        totalCount: number;
        hasMoreItems: boolean;
        version: number;
    }
}
`;
