/**
 * This file was generated from BarChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue, ListValue, ListAttributeValue, ListExpressionValue } from "mendix";

export type DataSetEnum = "static" | "dynamic";

export interface BarSeriesType {
    dataSet: DataSetEnum;
    staticDataSource?: ListValue;
    dynamicDataSource?: ListValue;
    groupByAttribute?: ListAttributeValue<string | boolean | Date | BigJs.Big>;
    staticSeriesName?: DynamicValue<string>;
    dynamicSeriesName?: ListExpressionValue<string>;
    staticXAttribute?: ListAttributeValue<Date | BigJs.Big>;
    dynamicXAttribute?: ListAttributeValue<Date | BigJs.Big>;
    staticYAttribute?: ListAttributeValue<Date | BigJs.Big>;
    dynamicYAttribute?: ListAttributeValue<Date | BigJs.Big>;
}

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
}

export interface BarChartProps<Style> {
    name: string;
    style: Style[];
    barSeries: BarSeriesType[];
    showLegend: boolean;
    xAxisLabel?: DynamicValue<string>;
    yAxisLabel?: DynamicValue<string>;
}

export interface BarChartPreviewProps {
    class: string;
    style: string;
    barSeries: BarSeriesPreviewType[];
    showLegend: boolean;
    xAxisLabel: string;
    yAxisLabel: string;
}
