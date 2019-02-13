/**
 * Auto-generated from Charts.xml
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface ChartsProps extends CommonProps {
    type: "area" | "stackedArea" | "bar" | "stackedBar" | "line" | "pie";
    values?: PluginWidget.EditableValue<string>;
    onClick: PluginWidget.ActionValue;
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
