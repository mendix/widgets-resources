/**
 * This file was generated from LineChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue, ListValue, ListAttributeValue } from "mendix";

export type TypeEnum = "static" | "dynamic";

export type InterpolationEnum = "linear" | "catmullRom";

export interface SeriesType {
    type: TypeEnum;
    dataSource: ListValue;
    groupByAttribute?: ListAttributeValue<string | boolean | Date | BigJs.Big>;
    seriesName?: DynamicValue<string>;
    seriesNameAttribute?: ListAttributeValue<string>;
    xValue: ListAttributeValue<BigJs.Big>;
    yValue: ListAttributeValue<BigJs.Big>;
    interpolation: InterpolationEnum;
    stylePropertyName: string;
    stylePropertyNameAttribute?: ListAttributeValue<string>;
}

export interface SeriesPreviewType {
    type: TypeEnum;
    dataSource: {} | null;
    groupByAttribute: string;
    seriesName: string;
    seriesNameAttribute: string;
    xValue: string;
    yValue: string;
    interpolation: InterpolationEnum;
    stylePropertyName: string;
    stylePropertyNameAttribute: string;
}

export interface LineChartProps<Style> {
    name: string;
    style: Style[];
    series: SeriesType[];
    showLegend: boolean;
    xAxisLabel?: DynamicValue<string>;
    yAxisLabel?: DynamicValue<string>;
}

export interface LineChartPreviewProps {
    class: string;
    style: string;
    series: SeriesPreviewType[];
    showLegend: boolean;
    xAxisLabel: string;
    yAxisLabel: string;
}
