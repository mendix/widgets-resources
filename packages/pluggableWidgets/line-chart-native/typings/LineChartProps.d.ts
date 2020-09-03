/**
 * This file was generated from LineChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
export type SeriesTypeEnum = "static" | "dynamic";

export interface SeriesType {
    seriesType: SeriesTypeEnum;
}

export interface SeriesPreviewType {
    seriesType: SeriesTypeEnum;
}

export interface LineChartProps<Style> {
    name: string;
    style: Style[];
    series: SeriesType[];
}

export interface LineChartPreviewProps {
    class: string;
    style: string;
    series: SeriesPreviewType[];
}
