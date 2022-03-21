/**
 * This file was generated from BubbleChart.xml
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

export interface LinesType {
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
    staticSizeAttribute?: ListAttributeValue<Big>;
    dynamicSizeAttribute?: ListAttributeValue<Big>;
    autosize: boolean;
    sizeref: number;
    staticTooltipHoverText?: ListExpressionValue<string>;
    dynamicTooltipHoverText?: ListExpressionValue<string>;
    markerColor?: DynamicValue<string>;
    onClickAction?: ActionValue;
    customSeriesOptions: string;
}

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export type GridLinesEnum = "none" | "horizontal" | "vertical" | "both";

export interface LinesPreviewType {
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
    staticSizeAttribute: string;
    dynamicSizeAttribute: string;
    autosize: boolean;
    sizeref: number | null;
    staticTooltipHoverText: string;
    dynamicTooltipHoverText: string;
    markerColor: string;
    onClickAction: {} | null;
    customSeriesOptions: string;
}

export interface BubbleChartContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    lines: LinesType[];
    enableAdvancedOptions: boolean;
    enableDeveloperMode: boolean;
    xAxisLabel?: DynamicValue<string>;
    yAxisLabel?: DynamicValue<string>;
    showLegend: boolean;
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
    gridLines: GridLinesEnum;
    enableThemeConfig: boolean;
    customLayout: string;
    customConfigurations: string;
}

export interface BubbleChartPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    lines: LinesPreviewType[];
    enableAdvancedOptions: boolean;
    enableDeveloperMode: boolean;
    xAxisLabel: string;
    yAxisLabel: string;
    showLegend: boolean;
    widthUnit: WidthUnitEnum;
    width: number | null;
    heightUnit: HeightUnitEnum;
    height: number | null;
    gridLines: GridLinesEnum;
    enableThemeConfig: boolean;
    customLayout: string;
    customConfigurations: string;
}
