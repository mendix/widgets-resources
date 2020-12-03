/**
 * This file was generated from BarChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue, ListValue, ListAttributeValue, ListExpressionValue } from "mendix";

export type PresentationEnum = "grouped" | "stacked";

export type DataSetEnum = "static" | "dynamic";

export interface BarSeriesType {
    dataSet: DataSetEnum;
    staticDataSource?: ListValue;
    dynamicDataSource?: ListValue;
    groupByAttribute?: ListAttributeValue<string | boolean | Date | BigJs.Big>;
    staticSeriesName?: DynamicValue<string>;
    dynamicSeriesName?: ListExpressionValue<string>;
    staticXAttribute?: ListAttributeValue<Date | BigJs.Big | string>;
    dynamicXAttribute?: ListAttributeValue<Date | BigJs.Big | string>;
    staticYAttribute?: ListAttributeValue<Date | BigJs.Big | string>;
    dynamicYAttribute?: ListAttributeValue<Date | BigJs.Big | string>;
    staticCustomBarStyle: string;
    dynamicCustomBarStyle?: ListAttributeValue<string>;
}

export type SortOrderEnum = "ascending" | "descending";

export interface BarSeriesPreviewType {
    dataSet: DataSetEnum;
    staticDataSource: {} | null;
    dynamicDataSource: {} | null;
    groupByAttribute: string;
    staticSeriesName: string;
    dynamicSeriesName: string;
    staticXAttribute: string;
    dynamicXAttribute: string;
    staticYAttribute: string;
    dynamicYAttribute: string;
    staticCustomBarStyle: string;
    dynamicCustomBarStyle: string;
}

export interface BarChartProps<Style> {
    name: string;
    style: Style[];
    presentation: PresentationEnum;
    barSeries: BarSeriesType[];
    sortOrder: SortOrderEnum;
    showLabels: boolean;
    showLegend: boolean;
    xAxisLabel?: DynamicValue<string>;
    yAxisLabel?: DynamicValue<string>;
}

export interface BarChartPreviewProps {
    class: string;
    style: string;
    presentation: PresentationEnum;
    barSeries: BarSeriesPreviewType[];
    sortOrder: SortOrderEnum;
    showLabels: boolean;
    showLegend: boolean;
    xAxisLabel: string;
    yAxisLabel: string;
}
