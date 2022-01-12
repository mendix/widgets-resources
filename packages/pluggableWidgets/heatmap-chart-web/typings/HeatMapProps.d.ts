/**
 * This file was generated from HeatMap.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, ListValue, ListAttributeValue, ListExpressionValue } from "mendix";
import { Big } from "big.js";

export type DeveloperModeEnum = "basic" | "advanced" | "developer";

export type HorizontalSortOrderEnum = "asc" | "desc";

export type VerticalSortOrderEnum = "asc" | "desc";

export interface ScaleColorsType {
    valuePercentage: number;
    colour: string;
}

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export interface ScaleColorsPreviewType {
    valuePercentage: number | null;
    colour: string;
}

export interface HeatMapContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    xAxisLabel?: DynamicValue<string>;
    yAxisLabel?: DynamicValue<string>;
    showLegend: boolean;
    developerMode: DeveloperModeEnum;
    seriesDataSource: ListValue;
    seriesName: ListExpressionValue<string>;
    horizontalAxisAttribute?: ListAttributeValue<string>;
    horizontalSortAttribute?: ListAttributeValue<Big | string | Date>;
    horizontalSortOrder: HorizontalSortOrderEnum;
    verticalAxisAttribute?: ListAttributeValue<string>;
    verticalSortAttribute?: ListAttributeValue<Big | string | Date>;
    verticalSortOrder: VerticalSortOrderEnum;
    seriesValueAttribute: ListAttributeValue<Big>;
    scaleColors: ScaleColorsType[];
    showScale: boolean;
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

export interface HeatMapPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    xAxisLabel: string;
    yAxisLabel: string;
    showLegend: boolean;
    developerMode: DeveloperModeEnum;
    seriesDataSource: {} | { type: string } | null;
    seriesName: string;
    horizontalAxisAttribute: string;
    horizontalSortAttribute: string;
    horizontalSortOrder: HorizontalSortOrderEnum;
    verticalAxisAttribute: string;
    verticalSortAttribute: string;
    verticalSortOrder: VerticalSortOrderEnum;
    seriesValueAttribute: string;
    scaleColors: ScaleColorsPreviewType[];
    showScale: boolean;
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
