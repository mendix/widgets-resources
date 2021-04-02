/**
 * This file was generated from LineChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue, ListValue, ListAttributeValue, ListExpressionValue } from "mendix";
import { Big } from "big.js";

export type DataSetEnum = "static" | "dynamic";

export type InterpolationEnum = "linear" | "catmullRom";

export type StaticLineStyleEnum = "line" | "lineWithMarkers" | "custom";

export type DynamicLineStyleEnum = "line" | "lineWithMarkers" | "custom";

export interface LinesType {
    dataSet: DataSetEnum;
    staticDataSource?: ListValue;
    dynamicDataSource?: ListValue;
    groupByAttribute?: ListAttributeValue<string | boolean | Date | Big>;
    staticName?: DynamicValue<string>;
    dynamicName?: ListExpressionValue<string>;
    staticXAttribute?: ListAttributeValue<Date | Big>;
    dynamicXAttribute?: ListAttributeValue<Date | Big>;
    staticYAttribute?: ListAttributeValue<Date | Big>;
    dynamicYAttribute?: ListAttributeValue<Date | Big>;
    interpolation: InterpolationEnum;
    staticLineStyle: StaticLineStyleEnum;
    dynamicLineStyle: DynamicLineStyleEnum;
    staticCustomLineStyle: string;
    dynamicCustomLineStyle?: ListAttributeValue<string>;
}

export interface LinesPreviewType {
    dataSet: DataSetEnum;
    staticDataSource: {} | null;
    dynamicDataSource: {} | null;
    groupByAttribute: string;
    staticName: string;
    dynamicName: string;
    staticXAttribute: string;
    dynamicXAttribute: string;
    staticYAttribute: string;
    dynamicYAttribute: string;
    interpolation: InterpolationEnum;
    staticLineStyle: StaticLineStyleEnum;
    dynamicLineStyle: DynamicLineStyleEnum;
    staticCustomLineStyle: string;
    dynamicCustomLineStyle: string;
}

export interface LineChartProps<Style> {
    name: string;
    style: Style[];
    lines: LinesType[];
    showLegend: boolean;
    xAxisLabel?: DynamicValue<string>;
    yAxisLabel?: DynamicValue<string>;
}

export interface LineChartPreviewProps {
    class: string;
    style: string;
    lines: LinesPreviewType[];
    showLegend: boolean;
    xAxisLabel: string;
    yAxisLabel: string;
}
