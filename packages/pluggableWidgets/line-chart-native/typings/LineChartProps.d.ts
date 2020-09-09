/**
 * This file was generated from LineChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue, ListValue, ListAttributeValue } from "mendix";

export type TypeEnum = "static" | "dynamic";

export type ShowMarkersEnum = "false" | "underneath" | "onTop";

export type InterpolationEnum =
    | "basis"
    | "basisClosed"
    | "basisOpen"
    | "bundle"
    | "cardinal"
    | "cardinalClosed"
    | "cardinalOpen"
    | "catmullRom"
    | "catmullRomClosed"
    | "catmullRomOpen"
    | "linear"
    | "linearClosed"
    | "monotoneX"
    | "monotoneY"
    | "natural"
    | "radial"
    | "step"
    | "stepAfter"
    | "stepBefore";

export interface SeriesType {
    type: TypeEnum;
    dataSource: ListValue;
    name: DynamicValue<string>;
    xValue: ListAttributeValue<BigJs.Big>;
    yValue: ListAttributeValue<BigJs.Big>;
    showMarkers: ShowMarkersEnum;
    interpolation: InterpolationEnum;
    stylePropertyName: string;
}

export interface SeriesPreviewType {
    type: TypeEnum;
    dataSource: {} | null;
    name: string;
    xValue: string;
    yValue: string;
    showMarkers: ShowMarkersEnum;
    interpolation: InterpolationEnum;
    stylePropertyName: string;
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
