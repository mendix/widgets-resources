/**
 * This file was generated from PieDoughnutChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export type PresentationEnum = "pie" | "doughnut";

export interface SeriesType {
    dataSource: ListValue;
    XAttribute: ListAttributeValue<Date | string>;
    YAttribute: ListAttributeValue<Big>;
    sliceStylingKey?: ListAttributeValue<string>;
}

export type SortOrderEnum = "ascending" | "descending";

export interface SeriesPreviewType {
    dataSource: {} | { type: string } | null;
    XAttribute: string;
    YAttribute: string;
    sliceStylingKey: string;
}

export interface PieDoughnutChartProps<Style> {
    name: string;
    style: Style[];
    presentation: PresentationEnum;
    series: SeriesType[];
    sortOrder: SortOrderEnum;
    showLabels: boolean;
}

export interface PieDoughnutChartPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    presentation: PresentationEnum;
    series: SeriesPreviewType[];
    sortOrder: SortOrderEnum;
    showLabels: boolean;
}
