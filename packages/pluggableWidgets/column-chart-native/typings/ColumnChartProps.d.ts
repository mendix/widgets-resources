/**
 * This file was generated from ColumnChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue, ListValue, ListAttributeValue, ListExpressionValue } from "mendix";
import { Big } from "big.js";

export type PresentationEnum = "grouped" | "stacked";

export type DataSetEnum = "static" | "dynamic";

export interface ColumnSeriesType {
    dataSet: DataSetEnum;
    staticDataSource?: ListValue;
    dynamicDataSource?: ListValue;
    groupByAttribute?: ListAttributeValue<string | boolean | Date | Big>;
    staticSeriesName?: DynamicValue<string>;
    dynamicSeriesName?: ListExpressionValue<string>;
    staticXAttribute?: ListAttributeValue<Date | Big | string>;
    dynamicXAttribute?: ListAttributeValue<Date | Big | string>;
    staticYAttribute?: ListAttributeValue<Date | Big | string>;
    dynamicYAttribute?: ListAttributeValue<Date | Big | string>;
    staticCustomColumnStyle: string;
    dynamicCustomColumnStyle?: ListAttributeValue<string>;
}

export type SortOrderEnum = "ascending" | "descending";

export interface ColumnSeriesPreviewType {
    dataSet: DataSetEnum;
    staticDataSource: {} | { type: string } | null;
    dynamicDataSource: {} | { type: string } | null;
    groupByAttribute: string;
    staticSeriesName: string;
    dynamicSeriesName: string;
    staticXAttribute: string;
    dynamicXAttribute: string;
    staticYAttribute: string;
    dynamicYAttribute: string;
    staticCustomColumnStyle: string;
    dynamicCustomColumnStyle: string;
}

export interface ColumnChartProps<Style> {
    name: string;
    style: Style[];
    presentation: PresentationEnum;
    columnSeries: ColumnSeriesType[];
    sortOrder: SortOrderEnum;
    showLabels: boolean;
    showLegend: boolean;
    xAxisLabel?: DynamicValue<string>;
    yAxisLabel?: DynamicValue<string>;
}

export interface ColumnChartPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    presentation: PresentationEnum;
    columnSeries: ColumnSeriesPreviewType[];
    sortOrder: SortOrderEnum;
    showLabels: boolean;
    showLegend: boolean;
    xAxisLabel: string;
    yAxisLabel: string;
}
