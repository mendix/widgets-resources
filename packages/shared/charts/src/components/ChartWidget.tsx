import { createElement, ReactElement, useMemo } from "react";
import classNames from "classnames";
import { Dimensions, getDimensions } from "@mendix/piw-utils-internal";
import {
    ChartTypeEnum,
    CustomLayoutProps,
    getCustomLayoutOptions,
    getModelerConfigOptions,
    getModelerLayoutOptions,
    getModelerSeriesOptions,
    useThemeFolderConfigs
} from "../utils/configs";
import { Chart, ChartProps, ChartWithPlayground } from "./Chart";

import "../ui/Chart.scss";

export interface ChartWidgetProps extends CustomLayoutProps, Dimensions, ChartProps {
    className: string;
    showSidebarEditor: boolean;
    type: ChartTypeEnum;
    enableThemeConfig: boolean;
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
    seriesOptions,
    type,
    enableThemeConfig
}: ChartWidgetProps): ReactElement => {
    const themeFolderConfigs = useThemeFolderConfigs(type, enableThemeConfig);

    const initialLayoutOptions = useMemo(
        () =>
            getModelerLayoutOptions(
                getCustomLayoutOptions({ showLegend, xAxisLabel, gridLinesMode, yAxisLabel }),
                layoutOptions,
                themeFolderConfigs.layout
            ),
        [showLegend, xAxisLabel, gridLinesMode, yAxisLabel, layoutOptions, themeFolderConfigs.layout]
    );

    const initialConfigOptions = useMemo(
        () => getModelerConfigOptions(configOptions, themeFolderConfigs.configuration),
        [configOptions, themeFolderConfigs.configuration]
    );
    const initialSeriesOptions = useMemo(
        () => getModelerSeriesOptions(seriesOptions, themeFolderConfigs.series),
        [seriesOptions, themeFolderConfigs.series]
    );

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
