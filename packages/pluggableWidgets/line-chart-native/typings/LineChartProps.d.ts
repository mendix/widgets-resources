/**
 * This file was generated from LineChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue, ListValue, ListAttributeValue } from "mendix";

export type TypeEnum = "static" | "dynamic";

export type ShowMarkersEnum = "false" | "underneath" | "onTop";

export interface SeriesType {
    type: TypeEnum;
    dataSource: ListValue;
    name: DynamicValue<string>;
    xValue: ListAttributeValue<BigJs.Big>;
    yValue: ListAttributeValue<BigJs.Big>;
    showMarkers: ShowMarkersEnum;
}

export interface SeriesPreviewType {
    type: TypeEnum;
    dataSource: {} | null;
    name: string;
    xValue: string;
    yValue: string;
    showMarkers: ShowMarkersEnum;
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
