/**
 * This file was generated from LineChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue, ListValue, ListAttributeValue, ListExpressionValue } from "mendix";

export type TypeEnum = "static" | "dynamic";

export type InterpolationEnum = "linear" | "catmullRom";

export type StaticLineStyleEnum = "line" | "lineWithMarkers";

export type DynamicLineStyleEnum = "line" | "lineWithMarkers" | "custom";

export interface SeriesType {
    type: TypeEnum;
    staticDataSource?: ListValue;
    dynamicDataSource?: ListValue;
    groupByAttribute?: ListAttributeValue<string | boolean | Date | BigJs.Big>;
    staticSeriesName?: DynamicValue<string>;
    dynamicSeriesName?: ListExpressionValue<string>;
    staticXAttribute?: ListAttributeValue<Date | BigJs.Big>;
    dynamicXAttribute?: ListAttributeValue<Date | BigJs.Big>;
    staticYAttribute?: ListAttributeValue<Date | BigJs.Big>;
    dynamicYAttribute?: ListAttributeValue<Date | BigJs.Big>;
    interpolation: InterpolationEnum;
    staticLineStyle: StaticLineStyleEnum;
    dynamicLineStyle: DynamicLineStyleEnum;
    staticStylePropertyName: string;
    dynamicStylePropertyName?: ListAttributeValue<string>;
}

export interface SeriesPreviewType {
    type: TypeEnum;
    staticDataSource: {} | null;
    dynamicDataSource: {} | null;
    groupByAttribute: string;
    staticSeriesName: string;
    dynamicSeriesName: string;
    staticXAttribute: string;
    dynamicXAttribute: string;
    staticYAttribute: string;
    dynamicYAttribute: string;
    interpolation: InterpolationEnum;
    staticLineStyle: StaticLineStyleEnum;
    dynamicLineStyle: DynamicLineStyleEnum;
    staticStylePropertyName: string;
    dynamicStylePropertyName: string;
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
