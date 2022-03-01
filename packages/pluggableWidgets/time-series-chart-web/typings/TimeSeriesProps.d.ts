/**
 * This file was generated from TimeSeries.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, ListValue, ListAttributeValue, ListExpressionValue } from "mendix";
import { Big } from "big.js";

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

export type InterpolationEnum = "linear" | "spline";

export type LineStyleEnum = "line" | "lineWithMarkers" | "custom";

export interface LinesType {
    dataSet: DataSetEnum;
    staticDataSource?: ListValue;
    dynamicDataSource?: ListValue;
    staticName?: DynamicValue<string>;
    dynamicName?: ListExpressionValue<string>;
    groupByAttribute?: ListAttributeValue<string | boolean | Date | Big>;
    staticXAttribute?: ListAttributeValue<Date>;
    dynamicXAttribute?: ListAttributeValue<Date>;
    staticYAttribute?: ListAttributeValue<string | Date | Big>;
    dynamicYAttribute?: ListAttributeValue<string | Date | Big>;
    aggregationType: AggregationTypeEnum;
    customSeriesOptions: string;
    interpolation: InterpolationEnum;
    lineStyle: LineStyleEnum;
    lineColor?: DynamicValue<string>;
    markerColor?: DynamicValue<string>;
    enableFillArea: boolean;
    fillColor?: DynamicValue<string>;
    onClickAction?: ActionValue;
    staticTooltipHoverText?: ListExpressionValue<string>;
    dynamicTooltipHoverText?: ListExpressionValue<string>;
}

export type GridLinesEnum = "none" | "horizontal" | "vertical" | "both";

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export type YAxisRangeModeEnum = "normal" | "tozero" | "nonnegative";

export interface LinesPreviewType {
    dataSet: DataSetEnum;
    staticDataSource: {} | { type: string } | null;
    dynamicDataSource: {} | { type: string } | null;
    staticName: string;
    dynamicName: string;
    groupByAttribute: string;
    staticXAttribute: string;
    dynamicXAttribute: string;
    staticYAttribute: string;
    dynamicYAttribute: string;
    aggregationType: AggregationTypeEnum;
    customSeriesOptions: string;
    interpolation: InterpolationEnum;
    lineStyle: LineStyleEnum;
    lineColor: string;
    markerColor: string;
    enableFillArea: boolean;
    fillColor: string;
    onClickAction: {} | null;
    staticTooltipHoverText: string;
    dynamicTooltipHoverText: string;
}

export interface TimeSeriesContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    lines: LinesType[];
    xAxisLabel?: DynamicValue<string>;
    yAxisLabel?: DynamicValue<string>;
    enableAdvancedOptions: boolean;
    enableDeveloperMode: boolean;
    showLegend: boolean;
    showRangeSlider: boolean;
    gridLines: GridLinesEnum;
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
    enableThemeConfig: boolean;
    customLayout: string;
    customConfigurations: string;
    yAxisRangeMode: YAxisRangeModeEnum;
}

export interface TimeSeriesPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    lines: LinesPreviewType[];
    xAxisLabel: string;
    yAxisLabel: string;
    enableAdvancedOptions: boolean;
    enableDeveloperMode: boolean;
    showLegend: boolean;
    showRangeSlider: boolean;
    gridLines: GridLinesEnum;
    widthUnit: WidthUnitEnum;
    width: number | null;
    heightUnit: HeightUnitEnum;
    height: number | null;
    enableThemeConfig: boolean;
    customLayout: string;
    customConfigurations: string;
    yAxisRangeMode: YAxisRangeModeEnum;
}
