/**
 * This file was generated from BarChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, ListValue, ListAttributeValue, ListExpressionValue } from "mendix";
import { Big } from "big.js";

export type BarmodeEnum = "group" | "stack";

export type DataSetEnum = "static" | "dynamic";

export type AggregationTypeEnum =
    | "none"
    | "count"
    | "sum"
    | "avg"
    | "min"
    | "max"
    | "median"
    | "mode"
    | "first"
    | "last";

export interface SeriesType {
    dataSet: DataSetEnum;
    staticDataSource?: ListValue;
    dynamicDataSource?: ListValue;
    groupByAttribute?: ListAttributeValue<string | boolean | Date | Big>;
    staticName?: DynamicValue<string>;
    dynamicName?: ListExpressionValue<string>;
    staticXAttribute?: ListAttributeValue<string | Date | Big>;
    dynamicXAttribute?: ListAttributeValue<string | Date | Big>;
    staticYAttribute?: ListAttributeValue<string | Date | Big>;
    dynamicYAttribute?: ListAttributeValue<string | Date | Big>;
    aggregationType: AggregationTypeEnum;
    customSeriesOptions: string;
    barColor?: DynamicValue<string>;
    onClickAction?: ActionValue;
    onClickTooltip?: ActionValue;
}

export type DeveloperModeEnum = "basic" | "advanced" | "developer";

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export type GridLinesEnum = "none" | "horizontal" | "vertical" | "both";

export interface SeriesPreviewType {
    dataSet: DataSetEnum;
    staticDataSource: {} | { type: string } | null;
    dynamicDataSource: {} | { type: string } | null;
    groupByAttribute: string;
    staticName: string;
    dynamicName: string;
    staticXAttribute: string;
    dynamicXAttribute: string;
    staticYAttribute: string;
    dynamicYAttribute: string;
    aggregationType: AggregationTypeEnum;
    customSeriesOptions: string;
    barColor: string;
    onClickAction: {} | null;
    onClickTooltip: {} | null;
}

export interface BarChartContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    showLegend: boolean;
    xAxisLabel?: DynamicValue<string>;
    yAxisLabel?: DynamicValue<string>;
    barmode: BarmodeEnum;
    series: SeriesType[];
    developerMode: DeveloperModeEnum;
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
    gridLines: GridLinesEnum;
    customLayout: string;
    customConfigurations: string;
}

export interface BarChartPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    showLegend: boolean;
    xAxisLabel: string;
    yAxisLabel: string;
    barmode: BarmodeEnum;
    series: SeriesPreviewType[];
    developerMode: DeveloperModeEnum;
    widthUnit: WidthUnitEnum;
    width: number | null;
    heightUnit: HeightUnitEnum;
    height: number | null;
    gridLines: GridLinesEnum;
    customLayout: string;
    customConfigurations: string;
}
