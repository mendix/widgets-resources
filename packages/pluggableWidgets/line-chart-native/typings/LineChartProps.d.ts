/**
 * This file was generated from LineChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue, ListValue, ListAttributeValue, ListExpressionValue } from "mendix";

export type DataSetEnum = "static" | "dynamic";

export type InterpolationEnum = "linear" | "catmullRom";

export type StaticLineStyleEnum = "line" | "lineWithMarkers" | "custom";

export type DynamicLineStyleEnum = "line" | "lineWithMarkers" | "custom";

export interface LinesType {
    dataSet: DataSetEnum;
    staticDataSource?: ListValue;
    dynamicDataSource?: ListValue;
    groupByAttribute?: ListAttributeValue<string | boolean | Date | BigJs.Big>;
    staticName?: DynamicValue<string>;
    dynamicName?: ListExpressionValue<string>;
    staticXAttribute?: ListAttributeValue<Date | BigJs.Big>;
    dynamicXAttribute?: ListAttributeValue<Date | BigJs.Big>;
    staticYAttribute?: ListAttributeValue<Date | BigJs.Big>;
    dynamicYAttribute?: ListAttributeValue<Date | BigJs.Big>;
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
