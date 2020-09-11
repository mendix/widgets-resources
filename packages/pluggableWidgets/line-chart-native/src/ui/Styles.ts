import { VictoryAxisCommonProps, VictoryCommonProps, VictoryLabelProps } from "victory-core";
import { VictoryLineProps } from "victory-line";
import { VictoryScatterProps } from "victory-scatter";

export interface LineChartStyle {
    chart?: { padding?: VictoryCommonProps["padding"] };
    xAxis?: VictoryAxisCommonProps["style"] & { axisLabel?: { verticalOffset?: VictoryLabelProps["dy"] } };
    yAxis?: VictoryAxisCommonProps["style"] & { axisLabel?: { horizontalOffset?: VictoryLabelProps["dy"] } };
    series?: { [key: string]: LineChartSeriesStyle };
}

export interface LineChartSeriesStyle {
    line?: VictoryLineProps["style"];
    markers?: VictoryScatterProps["style"] & {
        display?: "false" | "underneath" | "onTop";
        size?: VictoryScatterProps["size"];
    };
}

export const defaultLineChartStyle: LineChartStyle = {
    chart: {
        padding: { left: 75, top: 25, bottom: 50, right: 25 }
    },
    xAxis: {
        axisLabel: { verticalOffset: 10 }
    },
    yAxis: {
        axisLabel: { horizontalOffset: -10 }
    }
};
