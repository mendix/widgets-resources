/**
 * This file was generated from PieChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, ListValue, ListAttributeValue, ListExpressionValue } from "mendix";
import { Big } from "big.js";

export type ChartFormatEnum = "pie" | "doughnut";

export type DeveloperModeEnum = "basic" | "advanced" | "developer";

export type SeriesSortOrderEnum = "asc" | "desc";

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export interface PieChartContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    chartFormat: ChartFormatEnum;
    xAxisLabel?: DynamicValue<string>;
    yAxisLabel?: DynamicValue<string>;
    showLegend: boolean;
    developerMode: DeveloperModeEnum;
    seriesDataSource: ListValue;
    seriesName: ListExpressionValue<string>;
    seriesValueAttribute: ListAttributeValue<Big>;
    seriesSortAttribute?: ListAttributeValue<string | boolean | Date | Big>;
    seriesSortOrder: SeriesSortOrderEnum;
    seriesColorAttribute?: ListAttributeValue<string>;
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
    onClickAction?: ActionValue;
    tooltipHoverText?: ListExpressionValue<string>;
    enableThemeConfig: boolean;
    customLayout: string;
    customConfigurations: string;
    customSeriesOptions: string;
}

export interface PieChartPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    chartFormat: ChartFormatEnum;
    xAxisLabel: string;
    yAxisLabel: string;
    showLegend: boolean;
    developerMode: DeveloperModeEnum;
    seriesDataSource: {} | { type: string } | null;
    seriesName: string;
    seriesValueAttribute: string;
    seriesSortAttribute: string;
    seriesSortOrder: SeriesSortOrderEnum;
    seriesColorAttribute: string;
    widthUnit: WidthUnitEnum;
    width: number | null;
    heightUnit: HeightUnitEnum;
    height: number | null;
    onClickAction: {} | null;
    tooltipHoverText: string;
    enableThemeConfig: boolean;
    customLayout: string;
    customConfigurations: string;
    customSeriesOptions: string;
}
