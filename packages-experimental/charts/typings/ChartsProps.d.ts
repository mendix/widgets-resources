/**
 * This file was generated from Charts.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, EditableValue } from "mendix";

interface CommonProps<Style> {
    style: Style[];
}

export type TypeEnum = "area" | "stackedArea" | "bar" | "stackedBar" | "line" | "pie";

export interface ChartsProps<Style> extends CommonProps<Style> {
    type: TypeEnum;
    values?: EditableValue<string>;
    onClick: ActionValue;
    showLabels: boolean;
    height: number;
    showGrid: boolean;
    showXAxis: boolean;
    xLabel?: string;
    showYAxis: boolean;
    yLabel?: string;
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    marginBottom: number;
}
