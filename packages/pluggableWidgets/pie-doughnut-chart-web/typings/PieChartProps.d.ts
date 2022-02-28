/**
 * This file was generated from PieChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, ListValue, ListAttributeValue, ListExpressionValue } from "mendix";
import { Big } from "big.js";

export type SeriesSortOrderEnum = "asc" | "desc";

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export interface PieChartContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    seriesDataSource: ListValue;
    seriesName: ListExpressionValue<string>;
    seriesValueAttribute: ListAttributeValue<Big>;
    seriesSortAttribute?: ListAttributeValue<string | boolean | Date | Big>;
    seriesSortOrder: SeriesSortOrderEnum;
    seriesColorAttribute?: ListExpressionValue<string>;
    enableAdvancedOptions: boolean;
    enableDeveloperMode: boolean;
    showLegend: boolean;
    holeRadius: number;
    tooltipHoverText?: ListExpressionValue<string>;
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
    onClickAction?: ActionValue;
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
    seriesDataSource: {} | { type: string } | null;
    seriesName: string;
    seriesValueAttribute: string;
    seriesSortAttribute: string;
    seriesSortOrder: SeriesSortOrderEnum;
    seriesColorAttribute: string;
    enableAdvancedOptions: boolean;
    enableDeveloperMode: boolean;
    showLegend: boolean;
    holeRadius: number | null;
    tooltipHoverText: string;
    widthUnit: WidthUnitEnum;
    width: number | null;
    heightUnit: HeightUnitEnum;
    height: number | null;
    onClickAction: {} | null;
    enableThemeConfig: boolean;
    customLayout: string;
    customConfigurations: string;
    customSeriesOptions: string;
}
