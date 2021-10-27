import { createElement, ReactElement, useMemo } from "react";
import classNames from "classnames";
import { Dimensions, getDimensions } from "@mendix/piw-utils-internal";
import {
    CustomLayoutProps,
    getCustomLayoutOptions,
    getModelerConfigOptions,
    getModelerLayoutOptions,
    getModelerSeriesOptions
} from "../utils/configs";
import { Chart, ChartProps, ChartWithPlayground } from "./Chart";

import "../ui/Chart.scss";

export interface ChartWidgetProps extends CustomLayoutProps, Dimensions, ChartProps {
    className: string;
    showSidebarEditor: boolean;
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
    customConfig,
    layoutOptions,
    configOptions,
    seriesOptions
}: ChartWidgetProps): ReactElement => {
    const initialLayoutOptions = useMemo(
        () =>
            getModelerLayoutOptions(
                getCustomLayoutOptions({ showLegend, xAxisLabel, gridLinesMode, yAxisLabel }),
                layoutOptions
            ),
        [showLegend, xAxisLabel, gridLinesMode, yAxisLabel]
    );

    const initialConfigOptions = useMemo(() => getModelerConfigOptions(configOptions), []);
    const initialSeriesOptions = useMemo(() => getModelerSeriesOptions(seriesOptions), []);

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
