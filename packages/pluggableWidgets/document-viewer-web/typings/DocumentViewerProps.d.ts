/**
 * This file was generated from DocumentViewer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue, FileValue } from "mendix";

export type DataSourceTypeEnum = "file" | "url";

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "pixels" | "percentage";

export interface DocumentViewerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    dataSourceType: DataSourceTypeEnum;
    file?: DynamicValue<FileValue>;
    url?: DynamicValue<string>;
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
}

export interface DocumentViewerPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    dataSourceType: DataSourceTypeEnum;
    file: string;
    url: string;
    widthUnit: WidthUnitEnum;
    width: number | null;
    heightUnit: HeightUnitEnum;
    height: number | null;
}
