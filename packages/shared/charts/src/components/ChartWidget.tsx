import { createElement, ReactElement, useMemo } from "react";
import { Data, Layout } from "plotly.js";
import classNames from "classnames";
import { Dimensions, getDimensions } from "@mendix/piw-utils-internal";
import { getModelerConfigOptions, getModelerLayoutOptions, getModelerSeriesOptions } from "../utils/configs";
import { Chart, ChartWithPlayground } from "./Chart";

import "../ui/Chart.scss";
interface CustomLayoutProps {
    showLegend: Layout["showlegend"];
    xAxisLabel: Layout["xaxis"]["title"];
    yAxisLabel: Layout["yaxis"]["title"];
    gridLinesMode: "horizontal" | "vertical" | "none" | "both";
}

const getCustomLayoutOptions = ({
    showLegend,
    xAxisLabel,
    gridLinesMode,
    yAxisLabel
}: CustomLayoutProps): Partial<Layout> => ({
    autosize: true,
    showlegend: showLegend,
    xaxis: { title: xAxisLabel, showgrid: gridLinesMode === "both" || gridLinesMode === "vertical" },
    yaxis: { title: yAxisLabel, showgrid: gridLinesMode === "both" || gridLinesMode === "horizontal" }
});

export interface ChartWidgetProps extends CustomLayoutProps, Dimensions {
    className: string;
    data: Array<Partial<Data> & { customSeriesOptions: string | undefined }>;
    showSidebarEditor: boolean;
    customLayout: string;
    customConfig: string;
}

export const ChartWidget = ({
    className,
    data,
    widthUnit,
    width,
    heightUnit,
    height,
    showLegend,
    xAxisLabel,
    yAxisLabel,
    gridLinesMode,
    showSidebarEditor,
    customLayout,
    customConfig
}: ChartWidgetProps): ReactElement => {
    const initialLayoutOptions = useMemo(
        () => getModelerLayoutOptions(getCustomLayoutOptions({ showLegend, xAxisLabel, gridLinesMode, yAxisLabel })),
        [showLegend, xAxisLabel, gridLinesMode, yAxisLabel]
    );

    const initialConfigOptions = useMemo(() => getModelerConfigOptions({}), []);
    const initialSeriesOptions = useMemo(() => getModelerSeriesOptions({}), []);

    const LineChartWrapperComponent = showSidebarEditor ? ChartWithPlayground : Chart;

    return (
        <div
            className={classNames("widget-chart", className)}
            style={getDimensions({ widthUnit, width, heightUnit, height })}
        >
            <LineChartWrapperComponent
                data={data}
                layoutOptions={initialLayoutOptions}
                customLayout={customLayout}
                configOptions={initialConfigOptions}
                customConfig={customConfig}
                seriesOptions={initialSeriesOptions}
            />
        </div>
    );
};
